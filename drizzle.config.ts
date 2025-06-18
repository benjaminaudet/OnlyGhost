import { defineConfig } from 'drizzle-kit';
import { join } from 'path';

export default defineConfig({
  dialect: 'sqlite',
  schema: './server/database/schema.ts',
  out: './server/database/migrations',
  dbCredentials: {
    url: join(process.cwd(), 'ghost-data.db'),
  },
});
