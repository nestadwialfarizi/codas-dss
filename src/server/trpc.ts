import { TRPCError, initTRPC } from '@trpc/server';
import type { Context } from './context';

const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: {
      auth: {
        ...ctx.auth,
        ownerId: ctx.auth.orgId ?? ctx.auth.userId,
      },
    },
  });
});

const isAdmin = t.middleware(async ({ ctx, next }) => {
  const { userId, orgId, orgRole } = ctx.auth;

  if (!userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  const isPersonal = userId && !orgId;
  const isOrganizationAdmin = orgId && orgRole === 'org:admin';

  if (!(isPersonal || isOrganizationAdmin)) {
    throw new TRPCError({ code: 'FORBIDDEN' });
  }

  return next({
    ctx: {
      auth: {
        ...ctx.auth,
        ownerId: orgId ?? userId,
      },
    },
  });
});

export const createRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
export const adminProcedure = t.procedure.use(isAdmin);
