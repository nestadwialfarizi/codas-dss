import type { NextRequest } from "next/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { router } from "src/server/routers";
import { createContext } from "src/server/context";

function handler(req: NextRequest) {
  return fetchRequestHandler({
    endpoint: "/trpc",
    req,
    router,
    createContext,
  });
}

export { handler as GET, handler as POST };
