import type { NextRequest } from 'next/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { createContext } from 'src/server/context';
import { router } from 'src/server/routers';

function handler(req: NextRequest) {
  return fetchRequestHandler({
    endpoint: '/trpc',
    req,
    router,
    createContext,
  });
}

export { handler as GET, handler as POST };
