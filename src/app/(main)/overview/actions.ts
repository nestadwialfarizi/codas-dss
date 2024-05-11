'use server';

import { api } from 'src/app/(server)/client';

export async function getCriterias() {
  const res = await api.criterias.$get();
  const data = await res.json();
}
