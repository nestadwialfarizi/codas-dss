import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { createRouter, protectedProcedure, adminProcedure } from '../trpc';

const alternativeInput = z.object({
  name: z.string(),
  evaluations: z.array(
    z.object({
      criteriaId: z.string(),
      scoringScaleId: z.string(),
    }),
  ),
});

export const alternativeRouter = createRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.alternative.findMany({
      where: { organizationId: ctx.auth.organizationId },
    });
  }),
  create: adminProcedure
    .input(alternativeInput)
    .mutation(async ({ ctx, input }) => {
      const duplicated = await ctx.prisma.alternative.findFirst({
        where: {
          name: input.name,
          organizationId: ctx.auth.organizationId,
        },
      });

      if (duplicated) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `${input.name} sudah ada.`,
        });
      }

      return await ctx.prisma.alternative.create({
        data: {
          name: input.name,
          organizationId: ctx.auth.organizationId,
          evaluations: {
            createMany: {
              data: input.evaluations,
            },
          },
        },
      });
    }),
  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        data: alternativeInput,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const intended = await ctx.prisma.alternative.findUnique({
        where: {
          id: input.id,
        },
      });

      const duplicated = await ctx.prisma.alternative.findFirst({
        where: {
          name: input.data.name,
          organizationId: ctx.auth.organizationId,
        },
      });

      if (duplicated && input.data.name !== intended?.name) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `${input.data.name} sudah ada.`,
        });
      }

      await ctx.prisma.evaluation.deleteMany({
        where: {
          alternativeId: input.id,
        },
      });

      return await ctx.prisma.alternative.update({
        where: { id: input.id },
        data: {
          name: input.data.name,
          organizationId: ctx.auth.organizationId,
          evaluations: {
            createMany: {
              data: input.data.evaluations,
            },
          },
        },
      });
    }),
  delete: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.alternative.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
