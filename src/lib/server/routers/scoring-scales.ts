import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { prisma } from '../prisma';
import { publicProcedure, router } from '../trpc';

const scoringScaleSchema = z.object({
  description: z.string(),
  value: z.number(),
  criteriaId: z.string(),
});

export const scoringScaleRouter = router({
  get: publicProcedure.query(async () => {
    const scoringScales = await prisma.scoringScale.findMany();
    return scoringScales;
  }),
  create: publicProcedure
    .input(scoringScaleSchema)
    .mutation(async ({ input }) => {
      if (
        await prisma.scoringScale.findFirst({
          where: {
            description: input.description,
            criteriaId: input.criteriaId,
          },
        })
      ) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `${input.description} is already exist.`,
        });
      }

      const newScoringScale = await prisma.scoringScale.create({
        data: input,
      });

      return newScoringScale;
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        data: scoringScaleSchema,
      }),
    )
    .mutation(async ({ input }) => {
      const intendedScoringScale = await prisma.scoringScale.findUnique({
        where: {
          id: input.id,
        },
      });

      if (
        (await prisma.scoringScale.findFirst({
          where: {
            description: input.data.description,
            criteriaId: input.data.criteriaId,
          },
        })) &&
        input.data.description !== intendedScoringScale?.description
      ) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `${input.data.description} is already exist.`,
        });
      }

      const updatedScoringScale = await prisma.scoringScale.update({
        where: {
          id: input.id,
        },
        data: input.data,
      });

      return updatedScoringScale;
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const deletedScoringScale = await prisma.scoringScale.delete({
        where: {
          id: input.id,
        },
      });

      return deletedScoringScale;
    }),
});
