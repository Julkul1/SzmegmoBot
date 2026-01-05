import { Event } from '../types';
import { logger } from '../utils/logger';

export const error: Event = {
  name: 'error',
  async execute(error: Error) {
    logger.error('Discord client error:', error);
  },
};

export default error;
