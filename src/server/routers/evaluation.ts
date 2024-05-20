import { createRouter, protectedProcedure } from '../trpc';

export const evaluationRouter = createRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.evaluation.findMany({
      where: {
        alternative: {
          ownerId: ctx.auth.ownerId,
        },
      },
      orderBy: {
        id: 'asc',
      },
    });
  }),
});
