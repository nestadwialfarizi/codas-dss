import { prisma } from '../../lib/prisma';
import { publicProcedure, router } from '../trpc';

export const evaluationRouter = router({
  get: publicProcedure.query(async () => {
    const evaluations = await prisma.evaluation.findMany();
    return evaluations;
  }),
});
