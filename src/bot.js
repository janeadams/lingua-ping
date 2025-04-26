import { createRestAPIClient } from 'masto';
import { detectLanguage } from './utils/languageDetection';
import { MASTODON_API_TOKEN } from './config';

const API_URL = 'https://datavis.social';
const ACCESS_TOKEN = MASTODON_API_TOKEN;

async function fetchAndProcessPosts() {
  try {
    // Initialize the Mastodon client
    const masto = await createRestAPIClient({
      url: API_URL,
      accessToken: ACCESS_TOKEN,
    });

    // Fetch public timeline posts
    const posts = await masto.v1.timelines.listPublic();

    for (const post of posts) {
      const language = detectLanguage(post.content);

      if (language !== 'en') {
        // Send a direct message to the post author
        await masto.v1.statuses.create({
          status: `@${post.account.acct} Hello! I'm a bot created by the mods of datavis.social. I noticed that your post seems to be in ${language}, but we request that post authors provide translations for any non-English content. If you could add a translation, it would be greatly appreciated! Thank you!
          
          Have feedback about this bot? Please reach out to @janeadams@datavis.social`,
          visibility: 'direct',
          inReplyToId: post.id,
        });
      }
    }
  } catch (error) {
    console.error('Error fetching or processing posts:', error);
  }
}

fetchAndProcessPosts();