import fetch from 'node-fetch';
import { detectLanguage } from './utils/languageDetection.js';
import { MASTODON_API_TOKEN, MASTODON_INSTANCE } from './config/index.js';

async function testLanguageClassification() {
  try {
    // Extract the domain from MASTODON_INSTANCE
    const instanceDomain = new URL(MASTODON_INSTANCE).hostname;

    // Fetch recent local timeline posts with a limit of 40
    const response = await fetch(`${MASTODON_INSTANCE}/api/v1/timelines/home?limit=40`, {
      headers: {
        Authorization: `Bearer ${MASTODON_API_TOKEN}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const posts = await response.json();

    console.log('Classifying recent posts by language:');
    
    let englishOrUndefinedPostCount = 0;
    let nonEnglishPostCount = 0;
    let instancePostCount = 0;

    const log = (post, language) => {
      console.log(`Author: @${post.account.acct}`);
      console.log(`Language: ${language}`);
      console.log(`Content: ${post.content}`);
    };

    for (const post of posts) {
      // Filter posts by account.acct containing the instance domain
      if (post.account.url.includes(instanceDomain)) {
        const languageName = post.content ? detectLanguage(post.content) : "undetermined" // Use detectLanguage function
        
        instancePostCount++;

        if (languageName.toLowerCase() === 'english' || languageName.toLowerCase() === 'undetermined') {
          englishOrUndefinedPostCount++;
        } else {
          nonEnglishPostCount++;
          log(post, languageName);
        }
      }
    }

    console.log(`Total posts: ${posts.length}`);
    console.log(`Instance posts: ${instancePostCount}`);
    console.log(`Federated posts: ${posts.length - instancePostCount}`);
    console.log(`English posts: ${englishOrUndefinedPostCount}`);
    console.log(`Non-English posts: ${nonEnglishPostCount}`);

  } catch (error) {
    console.error('Error fetching or classifying posts:', error);
  }
}

testLanguageClassification();