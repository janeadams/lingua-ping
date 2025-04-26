import dotenv from 'dotenv';

dotenv.config();

export const MASTODON_API_TOKEN = process.env.MASTODON_API_TOKEN;
export const MASTODON_INSTANCE = process.env.MASTODON_INSTANCE;
export const MY_NAME = process.env.MY_NAME;
export const CHECK_INTERVAL = 600_000; // Check every 10 minutes