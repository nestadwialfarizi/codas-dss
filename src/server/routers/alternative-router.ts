import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { prisma } from '../../lib/prisma';
import { publicProcedure, router } from '../trpc';

const alternativeSchema = z.object({
  name: z.string(),
  evaluations: z.array(
    z.object({
      criteriaId: z.string(),
      scoringScaleId: z.string(),
    }),
  ),
});

export const alternativeRouter = router({
  get: publicProcedure.query(async () => {
    const alternatives = await prisma.alternative.findMany({
      include: {
        evaluations: {
          select: {
            id: true,
            criteriaId: true,
            scoringScaleId: true,
          },
        },
      },
    });
    return alternatives;
  }),
  create: publicProcedure
    .input(alternativeSchema)
    .mutation(async ({ input }) => {
      if (
        await prisma.alternative.findUnique({
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

      const newAlternative = await prisma.alternative.create({
        data: {
          name: input.name,
          evaluations: {
            createMany: {
              data: input.evaluations,
            },
          },
        },
      });

      return newAlternative;
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        data: alternativeSchema,
      }),
    )
    .mutation(async ({ input }) => {
      const intendedAlternative = await prisma.alternative.findUnique({
        where: {
          id: input.id,
        },
      });

      if (
        (await prisma.alternative.findUnique({
          where: {
            name: input.data.name,
          },
        })) &&
        input.data.name !== intendedAlternative?.name
      ) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `${input.data.name} is already exist.`,
        });
      }

      await prisma.evaluation.deleteMany({
        where: {
          alternativeId: input.id,
        },
      });

      const updatedAlternative = await prisma.alternative.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.data.name,
          evaluations: {
            createMany: {
              data: input.data.evaluations,
            },
          },
        },
      });

      return updatedAlternative;
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const deletedAlternative = await prisma.alternative.delete({
        where: {
          id: input.id,
        },
      });

      return deletedAlternative;
    }),
});
