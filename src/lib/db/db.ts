import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from '$lib/db/schema';

const sqlite = new Database('src/lib/db/sqlite.db');
export default drizzle(sqlite, {schema});