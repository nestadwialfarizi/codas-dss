import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import slugify from 'slugify';
import { z } from 'zod';
import { getOrganizationId } from '~/lib/utils';
import { db } from '../drizzle/db';
import { criterias } from '../drizzle/schema';
import { createRouter, protectedProcedure } from '../trpc';

const criteriaInput = z.object({
  name: z.string(),
  type: z.enum(['benefit', 'cost']),
  value: z.number(),
});

export const criteriaRouter = createRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    await updateCriteriaWeight();
    return await db.query.criterias.findMany({
      where: ({ organizationId }, { eq }) =>
        eq(organizationId, ctx.auth.organizationId),
      orderBy: ({ id }, { asc }) => [asc(id)],
    });
  }),
  bySlug: protectedProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.criterias.findFirst({
        where: ({ slug }, { eq }) => eq(slug, input.slug),
      });
    }),
  create: protectedProcedure
    .input(criteriaInput)
    .mutation(async ({ ctx, input }) => {
      const duplicatedCriteria = await db.query.criterias.findFirst({
        where: ({ name, organizationId }, { and, eq }) =>
          and(
            eq(name, input.name),
            eq(organizationId, ctx.auth.organizationId),
          ),
      });

      if (!!duplicatedCriteria) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `${input.name} sudah ada.`,
        });
      }

      const newCriteria = await ctx.db
        .insert(criterias)
        .values({
          ...input,
          slug: slugify(input.name, { lower: true }),
          organizationId: ctx.auth.organizationId,
        })
        .returning();

      await updateCriteriaWeight();
      return newCriteria[0];
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        data: criteriaInput,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const intendedCriteria = await db.query.criterias.findFirst({
        where: ({ id }, { eq }) => eq(id, input.id),
      });

      const duplicatedCriteria = await db.query.criterias.findFirst({
        where: ({ name, organizationId }, { and, eq }) =>
          and(
            eq(name, input.data.name),
            eq(organizationId, ctx.auth.organizationId),
          ),
      });

      if (!!duplicatedCriteria && input.data.name !== intendedCriteria?.name) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `${input.data.name} sudah ada.`,
        });
      }

      const updatedCriteria = await db
        .update(criterias)
        .set({
          ...input.data,
          slug: slugify(input.data.name, { lower: true }),
        })
        .where(eq(criterias.id, input.id))
        .returning();

      await updateCriteriaWeight();
      return updatedCriteria[0];
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const deletedCriteria = await ctx.db
        .delete(criterias)
        .where(eq(criterias.id, input.id))
        .returning();

      await updateCriteriaWeight();
      return deletedCriteria[0];
    }),
});

async function updateCriteriaWeight() {
  const organizationId = getOrganizationId();

  const foundCriterias = await db.query.criterias.findMany({
    where: ({ organizationId }, { eq }) => eq(organizationId, organizationId),
  });

  const totalValue = foundCriterias.reduce(
    (accumulator, criteria) => accumulator + criteria.value,
    0,
  );

  foundCriterias.forEach(async (criteria) => {
    await db
      .update(criterias)
      .set({ weight: criteria.value / totalValue })
      .where(eq(criterias.id, criteria.id));
  });
}
