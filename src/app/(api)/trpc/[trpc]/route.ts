import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { NextRequest } from 'next/server';
import { createContext } from '~/server/context';
import { router } from '~/server/routers';

function handler(req: NextRequest) {
  return fetchRequestHandler({
    endpoint: '/trpc',
    req,
    router,
    createContext,
  });
}

export { handler as GET, handler as POST };
