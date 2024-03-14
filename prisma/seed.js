import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seeder() {
  await prisma.criteria.deleteMany();
  await prisma.scoringScale.deleteMany();
  await prisma.alternative.deleteMany();
  await prisma.evaluation.deleteMany();

  await prisma.criteria.createMany({
    data: [
      { name: 'Number of Effects', type: 'BENEFIT', value: 3, weight: 0.079 },
      { name: 'Amp Modeling', type: 'BENEFIT', value: 5, weight: 0.032 },
      { name: 'Effect Types', type: 'BENEFIT', value: 4, weight: 0.105 },
      { name: 'Impulse Response', type: 'BENEFIT', value: 4, weight: 0.105 },
      { name: 'Expression Control', type: 'BENEFIT', value: 4, weight: 0.105 },
      { name: 'Dimensions', type: 'BENEFIT', value: 5, weight: 0.132 },
      { name: 'Weight', type: 'COST', value: 4, weight: 0.105 },
      { name: 'Material', type: 'BENEFIT', value: 5, weight: 0.132 },
      { name: 'Price', type: 'COST', value: 4, weight: 0.105 },
    ],
  });
}

seeder();
