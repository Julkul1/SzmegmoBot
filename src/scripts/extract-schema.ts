import { execSync } from 'child_process';
import { join } from 'path';
import { config } from '../config/config';
import { logger } from '../utils/logger';

async function extractSchema(): Promise<void> {
  try {
    const projectRef = extractProjectRef(config.supabase.url);

    if (!projectRef) {
      logger.error('Could not extract project reference from SUPABASE_URL');
      logger.info('Expected format: https://<project-ref>.supabase.co');
      process.exit(1);
    }

    logger.info(`Extracting database schema from Supabase project: ${projectRef}`);

    const outputPath = join(process.cwd(), 'src', 'database', 'types.ts');

    try {
      const command = `npx supabase gen types typescript --project-id "${projectRef}" --schema public > "${outputPath}"`;
      execSync(command, { stdio: 'inherit' });
      logger.info(`Schema types generated successfully at: ${outputPath}`);
    } catch (error) {
      logger.error(
        'Failed to generate types. Make sure you have Supabase CLI installed or use npx.'
      );
      logger.info('You can also run this command manually:');
      logger.info(
        `npx supabase gen types typescript --project-id "${projectRef}" --schema public > "${outputPath}"`
      );
      process.exit(1);
    }
  } catch (error) {
    logger.error('Error extracting schema:', error);
    process.exit(1);
  }
}

function extractProjectRef(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    const match = hostname.match(/^([^.]+)\.supabase\.co$/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

if (require.main === module) {
  extractSchema()
    .then(() => {
      logger.info('Schema extraction completed');
      process.exit(0);
    })
    .catch(error => {
      logger.error('Schema extraction failed:', error);
      process.exit(1);
    });
}
