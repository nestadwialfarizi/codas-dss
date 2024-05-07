import { auth } from '@clerk/nextjs/server';
import { db } from './drizzle/db';

export async function createContext() {
  return {
    db,
    auth: auth(),
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
