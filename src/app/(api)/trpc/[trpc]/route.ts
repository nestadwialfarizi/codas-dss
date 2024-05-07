import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { NextRequest } from 'next/server';
import { createContext } from '~/server/context';
import { router } from '~/server/router';

function handler(request: NextRequest) {
  return fetchRequestHandler({
    endpoint: '/trpc',
    req: request,
    router: router,
    createContext: () => createContext({ req: request }),
  });
}

export { handler as GET, handler as POST };
