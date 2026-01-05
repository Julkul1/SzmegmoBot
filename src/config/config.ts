import dotenv from 'dotenv';

dotenv.config();

export const config = {
  discord: {
    token: process.env.DISCORD_TOKEN || '',
    clientId: process.env.DISCORD_CLIENT_ID || '',
  },
  supabase: {
    url: process.env.SUPABASE_URL || '',
    anonKey: process.env.SUPABASE_ANON_KEY || '',
  },
};

if (!config.discord.token) {
  throw new Error('DISCORD_TOKEN is required');
}

if (!config.supabase.url || !config.supabase.anonKey) {
  throw new Error('Supabase credentials are required');
}
