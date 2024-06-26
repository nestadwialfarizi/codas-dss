import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter, protectedProcedure, adminProcedure } from '../trpc';

const scoringScaleInput = z.object({
  criteriaId: z.string(),
  description: z.string(),
  value: z.number(),
});

export const scoringScaleRouter = createRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.scoringScale.findMany({
      where: {
        criteria: {
          ownerId: ctx.auth.ownerId,
        },
      },
      orderBy: {
        id: 'asc',
      },
    });
  }),
  create: adminProcedure
    .input(scoringScaleInput)
    .mutation(async ({ ctx, input }) => {
      const duplicated = await ctx.prisma.scoringScale.findFirst({
        where: {
          description: input.description,
          criteriaId: input.criteriaId,
        },
      });

      if (duplicated) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Skala penilaian dengan deskripsi ${input.description} sudah ada.`,
        });
      }

      return await ctx.prisma.scoringScale.create({
        data: input,
      });
    }),
  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        data: scoringScaleInput,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const intended = await ctx.prisma.scoringScale.findUnique({
        where: {
          id: input.id,
        },
      });

      const duplicated = await ctx.prisma.scoringScale.findFirst({
        where: {
          description: input.data.description,
          criteriaId: input.data.criteriaId,
        },
      });

      if (
        (duplicated && input.data.description !== intended?.description) ||
        (duplicated && input.data.criteriaId !== intended?.criteriaId)
      ) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Skala penilaian dengan deskripsi ${input.data.description} sudah ada.`,
        });
      }

      return await ctx.prisma.scoringScale.update({
        where: {
          id: input.id,
        },
        data: input.data,
      });
    }),
  delete: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.scoringScale.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
