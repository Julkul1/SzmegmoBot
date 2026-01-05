# SzmegmoBot

Modern Discord bot built with TypeScript, featuring Supabase integration and optimized for Discloud hosting.

## Features

- ⚡ Built with TypeScript for type safety
- 🔌 Supabase integration for database operations
- 🤖 Modern Discord.js v14
- 📦 Professional project structure
- 🚀 Ready for Discloud deployment
- 🔧 Easy command and event system

## Prerequisites

- Node.js 18 or higher
- Discord Bot Token
- Supabase Project (URL and Anon Key)
- Discloud account (for deployment)

## Setup

### 1. Clone and Install

```bash
yarn install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
DISCORD_TOKEN=your_discord_bot_token_here
DISCORD_CLIENT_ID=your_discord_client_id_here
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
NODE_ENV=production
```

### 3. Build

```bash
yarn build
```

### 4. Run

```bash
yarn start
```

For development with hot reload:

```bash
yarn dev
```

## Project Structure

```
SzmegmoBot/
├── src/
│   ├── commands/          # Slash commands
│   ├── events/            # Discord events
│   ├── client/            # Bot client setup
│   ├── config/            # Configuration
│   ├── database/          # Supabase client
│   ├── types/             # TypeScript types
│   ├── utils/             # Utility functions
│   └── index.ts           # Entry point
├── dist/                  # Compiled JavaScript
├── package.json
├── tsconfig.json
├── discloud.config        # Discloud configuration
└── README.md
```

## Development

### Creating Commands

Create a new file in `src/commands/`:

```typescript
import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { Command } from '../types';

export const myCommand: Command = {
  data: new SlashCommandBuilder().setName('mycommand').setDescription('My command description'),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply('Hello!');
  },
};

export default myCommand;
```

### Creating Events

Create a new file in `src/events/`:

```typescript
import { Event } from '../types';
import { Client } from 'discord.js';

export const myEvent: Event = {
  name: 'messageCreate',
  async execute(message: Message) {
    // Event logic
  },
};

export default myEvent;
```

## Deployment to Discloud

1. Build the project:

   ```bash
   yarn build
   ```

2. Create a ZIP file containing:
   - `dist/` folder
   - `package.json`
   - `yarn.lock`
   - `discloud.config`
   - `.env` (with your environment variables)

3. Upload the ZIP to Discloud dashboard

4. The bot will automatically start using the configuration in `discloud.config`

## Supabase Setup

This bot uses Supabase for database operations. You can:

1. Create tables in your Supabase project
2. Use the `supabase` client from `src/database/supabase.ts`
3. Example usage in commands can be found in `src/commands/info.ts`

## Scripts

- `yarn build` - Build TypeScript to JavaScript
- `yarn start` - Start the bot (production)
- `yarn dev` - Start with hot reload (development)
- `yarn lint` - Run ESLint
- `yarn type-check` - Type check without building
- `yarn extract-schema` - Extract database schema from Supabase (requires project ref)
- `yarn extract-schema:cli --project_ref=YOUR_PROJECT_REF` - Extract schema using Supabase CLI directly

## License

MIT
