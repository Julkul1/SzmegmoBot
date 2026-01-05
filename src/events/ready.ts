import { Event } from '../types';
import { Client } from 'discord.js';
import { logger } from '../utils/logger';

export const ready: Event = {
  name: 'clientReady',
  once: true,
  async execute(client: Client) {
    if (!client.user) return;

    logger.info(`Bot logged in as ${client.user.tag}`);
    logger.info(`Bot is in ${client.guilds.cache.size} guild(s)`);
    logger.info(`Bot is serving ${client.users.cache.size} user(s)`);
  },
};

export default ready;
