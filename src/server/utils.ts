import { prisma } from '../lib/prisma';

export const updateEachCriteriaWeight = async () => {
  const criterias = await prisma.criteria.findMany();

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
};
