const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    MASTODON_API_TOKEN: process.env.MASTODON_API_TOKEN,
    MASTODON_INSTANCE: process.env.MASTODON_INSTANCE,
    CHECK_INTERVAL: 600_000 // Check every 10 minutes
};