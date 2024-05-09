import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createRouter, protectedProcedure } from "../trpc";

const alternativeInput = z.object({
  name: z.string(),
  evaluations: z.array(
    z.object({
      criteriaId: z.string(),
      scoringScaleId: z.string(),
    })
  ),
});

export const alternativeRouter = createRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.alternative.findMany({
      where: { organizationId: ctx.auth.organizationId },
    });
  }),
  create: protectedProcedure
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
          code: "BAD_REQUEST",
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
});
