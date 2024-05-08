import { z } from 'zod';
import { createRouter, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { scoringScales } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

const scoringScaleInput = z.object({
  criteriaId: z.number(),
  description: z.string(),
  value: z.number(),
});

export const scoringScaleRouter = createRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.scoringScales.findMany({
      where: ({ organizationId }, { eq }) =>
        eq(organizationId, ctx.auth.organizationId),
      orderBy: ({ id }, { asc }) => [asc(id)],
    });
  }),
  create: protectedProcedure
    .input(scoringScaleInput)
    .mutation(async ({ ctx, input }) => {
      const duplicatedScoringScale = await ctx.db.query.scoringScales.findFirst(
        {
          where: ({ criteriaId, description }, { and, eq }) =>
            and(
              eq(criteriaId, input.criteriaId),
              eq(description, input.description),
            ),
        },
      );

      if (!!duplicatedScoringScale) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `${input.description} sudah ada.`,
        });
      }

      const newScoringScale = await ctx.db
        .insert(scoringScales)
        .values({
          ...input,
          organizationId: ctx.auth.organizationId,
        })
        .returning();

      return newScoringScale[0];
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        data: scoringScaleInput,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const intendedScoringScale = await ctx.db.query.scoringScales.findFirst({
        where: ({ id }, { eq }) => eq(id, input.id),
      });

      const duplicatedScoringScale = await ctx.db.query.scoringScales.findFirst(
        {
          where: ({ criteriaId, description }, { and, eq }) =>
            and(
              eq(criteriaId, input.data.criteriaId),
              eq(description, input.data.description),
            ),
        },
      );

      if (
        (!!duplicatedScoringScale &&
          input.data.description !== intendedScoringScale?.description) ||
        (!!duplicatedScoringScale &&
          input.data.criteriaId !== intendedScoringScale?.criteriaId)
      ) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `${input.data.description} sudah ada.`,
        });
      }

      const updatedScoringScale = await ctx.db
        .update(scoringScales)
        .set(input.data)
        .where(eq(scoringScales.id, input.id))
        .returning();

      return updatedScoringScale[0];
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const deletedScoringScale = await ctx.db
        .delete(scoringScales)
        .where(eq(scoringScales.id, input.id))
        .returning();

      return deletedScoringScale[0];
    }),
});
