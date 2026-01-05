import { Bot } from './client/bot';
import { logger } from './utils/logger';

process.on('unhandledRejection', (error: unknown) => {
  logger.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught exception:', error);
  process.exit(1);
});

const bot = new Bot();
bot.start().catch((error: unknown) => {
  logger.error('Failed to start bot:', error);
  process.exit(1);
});
