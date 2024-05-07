import { loadEnvConfig } from '@next/env';
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import * as schema from './schema';

loadEnvConfig(process.cwd());

export const db = drizzle(sql, { schema });
