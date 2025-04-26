import fetch from 'node-fetch';
import chalk from 'chalk'; // Import chalk
import { detectLanguage } from './utils/languageDetection.js';
import { MASTODON_API_TOKEN, MASTODON_INSTANCE, MY_NAME } from './config/index.js';

const API_URL = MASTODON_INSTANCE;

async function hasMessagedUser(postId, userAcct) {
  try {
    const response = await fetch(`${API_URL}/api/v1/conversations`, {
      headers: {
        Authorization: `Bearer ${MASTODON_API_TOKEN}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch conversations: ${response.statusText}`);
    }

    console.log(chalk.gray(`Checking conversations for user @${userAcct}...`));

    const conversations = await response.json();

    console.log(chalk.gray(`Total conversations found: ${conversations.length}`));

    const relevant = conversations.some(convo =>
      convo.last_status.in_reply_to_id.includes(postId)
    );
    console.log(chalk.gray(`Relevant conversations found: ${relevant}`));
    return relevant;

  } catch (error) {
    console.error(chalk.red('Error checking conversations:'), error);
    return false;
  }
}

async function fetchAndProcessPosts() {
  try {
    const instanceDomain = new URL(MASTODON_INSTANCE).hostname;

    const response = await fetch(`${API_URL}/api/v1/timelines/home`, {
      headers: {
        Authorization: `Bearer ${MASTODON_API_TOKEN}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const posts = await response.json();

    for (const post of posts) {
      if (post.account.url.includes(instanceDomain)) {
        const languageName = detectLanguage(post.content);

        if (languageName.toLowerCase() !== 'english' && languageName.toLowerCase() !== 'undetermined') {

          console.log(chalk.gray(`I think I need to respond to post id ${post.id} because it is written in ${languageName}.`));

          const alreadyMessaged = await hasMessagedUser(post.id, post.account.acct);

          if (alreadyMessaged) {
            console.log(chalk.gray(`Already messaged @${post.account.acct} about post ${post.id}. Skipping...`));
            continue;
          } else {
            console.log(chalk.gray(`I haven't messaged @${post.account.acct} about post ${post.id} before.`));
          }

          const message = `@${post.account.acct} Hello! I'm a bot created by the mods of ${instanceDomain}. This is a private message. I think your post is in ${languageName}, but we request that post authors provide translations for any non-English content. If you could add a translation, it would be greatly appreciated! Thank you!
          
Have feedback about this bot? Did we get it wrong? Please file an issue on github: https://github.com/janeadams/lingua-ping/issues/new`;

          const dmResponse = await fetch(`${API_URL}/api/v1/statuses`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${MASTODON_API_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              status: message,
              visibility: 'direct',
              in_reply_to_id: post.id,
            }),
          });

          if (!dmResponse.ok) {
            console.error(chalk.red(`Failed to send message to @${post.account.acct}:`), dmResponse.statusText);
          } else {
            console.log(chalk.green(`Sent message to @${post.account.acct}: ${message}`));
          }
        }
      }
    }
  } catch (error) {
    console.error(chalk.red('Error fetching or processing posts:'), error);
  }
}

fetchAndProcessPosts();