import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { getOrganizationId } from '~/lib/utils';
import { prisma } from '../prisma';
import { createRouter, protectedProcedure } from '../trpc';

const criteriaInput = z.object({
  name: z.string(),
  type: z.enum(['BENEFIT', 'COST']),
  value: z.number(),
});

export const criteriaRouter = createRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    await updateEachCriteriaWeight();
    return await ctx.prisma.criteria.findMany({
      where: { organizationId: ctx.auth.organizationId },
    });
  }),
  create: protectedProcedure
    .input(criteriaInput)
    .mutation(async ({ ctx, input }) => {
      const duplicated = await ctx.prisma.criteria.findFirst({
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

      const created = await ctx.prisma.criteria.create({
        data: {
          ...input,
          organizationId: ctx.auth.organizationId,
        },
      });

      await updateEachCriteriaWeight();
      return created;
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: criteriaInput,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const intended = await ctx.prisma.criteria.findUnique({
        where: { id: input.id },
      });

      const duplicated = await ctx.prisma.criteria.findFirst({
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

      const updated = await ctx.prisma.criteria.update({
        data: input.data,
        where: { id: input.id },
      });

      await updateEachCriteriaWeight();
      return updated;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const deleted = await ctx.prisma.criteria.delete({
        where: { id: input.id },
      });

      await updateEachCriteriaWeight();
      return deleted;
    }),
});

async function updateEachCriteriaWeight() {
  const organizationId = getOrganizationId();

  const criterias = await prisma.criteria.findMany({
    where: { organizationId },
  });

  const totalValue = criterias.reduce(
    (accumulator, criteria) => accumulator + criteria.value,
    0,
  );

  criterias.forEach(
    async (criteria) =>
      await prisma.criteria.update({
        where: { id: criteria.id },
        data: { weight: criteria.value / totalValue },
      }),
  );
}
