import { auth } from '@clerk/nextjs/server';

import { prisma } from './prisma';

export async function createContext() {
  return {
    prisma,
    auth: auth(),
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
