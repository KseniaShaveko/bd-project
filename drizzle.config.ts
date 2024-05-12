import type { Config } from 'drizzle-kit';

export default {
  dialect: 'sqlite',
  schema: 'src/lib/db/schema.ts',
  out: 'src/lib/db/migrations',
  dbCredentials: { url: 'src/lib/db/sqlite.db' },
} satisfies Config;
