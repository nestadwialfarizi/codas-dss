import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { prisma } from '../prisma';
import { publicProcedure, router } from '../trpc';
import { updateEachCriteriaWeight } from '../utils';

const schema = z.object({
  name: z.string().min(1),
  type: z.enum(['BENEFIT', 'COST']),
  value: z.number().min(1),
});

export const criteriaRouter = router({
  get: publicProcedure.query(async () => {
    const criterias = await prisma.criteria.findMany();

    await updateEachCriteriaWeight();
    return criterias;
  }),
  create: publicProcedure.input(schema).mutation(async ({ input }) => {
    if (
      await prisma.criteria.findUnique({
        where: {
          name: input.name,
        },
      })
    ) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `${input.name} is already exist.`,
      });
    }

    const newCriteria = await prisma.criteria.create({
      data: input,
    });

    await updateEachCriteriaWeight();
    return newCriteria;
  }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const deletedCriteria = await prisma.criteria.delete({
        where: {
          id: input.id,
        },
      });

      await updateEachCriteriaWeight();
      return deletedCriteria;
    }),
});
