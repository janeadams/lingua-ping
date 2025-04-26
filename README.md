# Lingua Ping 🌐🔔

This Mastodon bot monitors posts on our server. It identifies non-English posts and sends direct messages to the post author with a friendly reminder to provide translations for their posts.

## Features

- Connects to the Mastodon API using a specified token.
- Fetches posts from the specified server.
- Detects the language of each post.
- Sends direct messages to users with non-English posts.

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
   git clone <repository-url>
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

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.