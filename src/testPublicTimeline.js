import fetch from 'node-fetch';
import { MASTODON_API_TOKEN, MASTODON_INSTANCE } from './config/index.js';

async function testPublicTimeline() {
  try {
    const response = await fetch(`${MASTODON_INSTANCE}/api/v1/timelines/public`, {
      headers: {
        Authorization: `Bearer ${MASTODON_API_TOKEN}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const posts = await response.json();
    console.log(posts);
  } catch (error) {
    console.error('Error fetching public timeline:', error);
  }
}

testPublicTimeline();