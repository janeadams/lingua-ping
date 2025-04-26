# Lingua Ping 🌐🔔

This Mastodon bot monitors posts on our server. It identifies non-English posts and sends direct messages to the post author with a friendly reminder to provide translations for their posts.

## Features

- Connects to the Mastodon API using a specified token.
- Fetches posts from the home timeline -- so the bot has to be following a user for them to be eligible for a ping *and* the user has to be on the same instance as the bot (since this is only to support an agreed-upon server rule, **not** proscribing behavior across the fediverse)
- Detects the language of each post (uses the [franc](https://github.com/wooorm/franc) library with a threshold of the top 20* most spoken languages globally)
- Checks whether we have already messaged the user about this specific post
- Sends a direct message to the user about their non-English post

\* _franc supports many more languages but my shitposts kept getting classified as Scots so..._

## Project Structure

```
lingua-ping
├── src
│   ├── bot.js                # Main entry point for the bot
│   ├── utils
│   │   └── languageDetection.js # Language detection utility
│   └── config
│       └── index.js          # Configuration settings
├── .github
│   └── workflows
│       └── bot.yml           # GitHub Actions workflow
├── package.json               # NPM configuration
├── .env.example               # Environment variable template
└── README.md                  # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone https://github.com/janeadams/lingua-ping
   cd lingua-ping
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and replace the placeholder token with your Mastodon API token.
   ```
   cp .env.example .env
   ```

4. **Run the bot:**
   ```
   node src/bot.js
   ```

## Usage Guidelines

- The bot will automatically fetch posts and check their language based on the schedule defined in the GitHub Actions workflow.

- Ensure that you have the necessary permissions from the server owner to run this bot.

- If installing on your own server, start by only following admins and run some tests before following everyone on your instance.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.