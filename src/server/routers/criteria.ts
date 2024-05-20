import { auth } from '@clerk/nextjs/server';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../prisma';
import { createRouter, protectedProcedure, adminProcedure } from '../trpc';

const criteriaInput = z.object({
  name: z.string(),
  type: z.enum(['BENEFIT', 'COST']),
  value: z.number(),
});

export const criteriaRouter = createRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    await updateEachCriteriaWeight();
    return await ctx.prisma.criteria.findMany({
      where: {
        ownerId: ctx.auth.ownerId,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }),
  create: adminProcedure
    .input(criteriaInput)
    .mutation(async ({ ctx, input }) => {
      const duplicated = await ctx.prisma.criteria.findFirst({
        where: {
          name: input.name,
          ownerId: ctx.auth.ownerId,
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
          ownerId: ctx.auth.ownerId,
        },
      });

      await updateEachCriteriaWeight();
      return created;
    }),
  update: adminProcedure
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
          ownerId: ctx.auth.ownerId,
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
  delete: adminProcedure
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
  const { orgId, userId } = auth();

  const criterias = await prisma.criteria.findMany({
    where: {
      ownerId: (orgId ?? userId) as string,
    },
  });

  const totalValue = criterias.reduce(
    (accumulator, criteria) => accumulator + criteria.value,
    0,
  );

  criterias.forEach(
    async (criteria) =>
      await prisma.criteria.update({
        where: {
          id: criteria.id,
        },
        data: {
          weight: criteria.value / totalValue,
        },
      }),
  );
}
