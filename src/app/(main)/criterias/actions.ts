'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import slugify from 'slugify';
import { db } from '~/lib/drizzle/db';
import { Criteria, criterias } from '~/lib/drizzle/schema';
import { getOrganizationId } from '~/lib/utils';

export type CriteriaInput = Pick<Criteria, 'name' | 'type' | 'value'>;

async function updateCriteriaWeight() {
  const organizationId = getOrganizationId();

  const foundCriterias = await db.query.criterias.findMany({
    where: (criterias, { eq }) => eq(criterias.organizationId, organizationId),
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

export async function getCriterias() {
  const organizationId = getOrganizationId();

  await updateCriteriaWeight();

  return await db.query.criterias.findMany({
    where: (criterias, { eq }) => eq(criterias.organizationId, organizationId),
    orderBy: (criterias, { asc }) => [asc(criterias.id)],
  });
}

export async function getCriteriaBySlug(slug: string) {
  return await db.query.criterias.findFirst({
    where: (criterias, { eq }) => eq(criterias.slug, slug),
  });
}

export async function createCriteria(data: CriteriaInput) {
  const organizationId = getOrganizationId();

  const duplicatedCriteria = await db.query.criterias.findFirst({
    where: (criterias, { and, eq }) =>
      and(
        eq(criterias.name, data.name),
        eq(criterias.organizationId, organizationId),
      ),
  });

  if (!!duplicatedCriteria) {
    return {
      success: false,
      message: `Kriteria dengan nama ${data.name} sudah ada.`,
    };
  }

  await db.insert(criterias).values({
    ...data,
    slug: slugify(data.name, { lower: true }),
    organizationId,
  });

  await updateCriteriaWeight();
  revalidatePath('/criterias');
  revalidatePath(`/criterias/${slugify(data.name, { lower: true })}`);

  return {
    success: true,
    message: `Kriteria dengan nama ${data.name} berhasil dibuat.`,
  };
}

export async function updateCriteria(id: number, data: CriteriaInput) {
  const organizationId = getOrganizationId();

  const intendedCriteria = await db.query.criterias.findFirst({
    where: (criterias, { eq }) => eq(criterias.id, id),
  });

  const duplicatedCriteria = await db.query.criterias.findFirst({
    where: (criterias, { and, eq }) =>
      and(
        eq(criterias.name, data.name),
        eq(criterias.organizationId, organizationId),
      ),
  });

  if (!!duplicatedCriteria && data.name !== intendedCriteria?.name) {
    return {
      success: false,
      message: `Kriteria dengan nama ${data.name} sudah ada.`,
    };
  }

  await db
    .update(criterias)
    .set({ ...data, slug: slugify(data.name, { lower: true }) })
    .where(eq(criterias.id, id))
    .returning();

  await updateCriteriaWeight();
  revalidatePath('/criterias');

  return {
    success: true,
    message: `Kriteria dengan nama ${intendedCriteria?.name} berhasil diperbarui.`,
  };
}

export async function deleteCriteria(id: number) {
  const deletedCriteria = await db
    .delete(criterias)
    .where(eq(criterias.id, id))
    .returning();

  await updateCriteriaWeight();
  revalidatePath('/criterias');

  return {
    success: true,
    message: `Kriteria dengan nama ${deletedCriteria[0].name} berhasil dihapus.`,
  };
}
