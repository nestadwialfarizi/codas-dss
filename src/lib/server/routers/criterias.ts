import { prisma } from '../prisma';
import { publicProcedure, router } from '../trpc';
import { updateEachCriteriaWeight } from '../utils';

export const criteriaRouter = router({
  get: publicProcedure.query(async () => {
    const criterias = await prisma.criteria.findMany();

    await updateEachCriteriaWeight();
    return criterias;
  }),
});
