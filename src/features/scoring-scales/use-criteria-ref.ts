import { create } from 'zustand';
import type { Criteria } from '@prisma/client';

type CriteriaRef = {
  criteria: Criteria;
  setCriteria: (criteria: Criteria) => void;
};

export const useCriteriaRef = create<CriteriaRef>()((set) => ({
  criteria: {} as Criteria,
  setCriteria: (criteria) => set(() => ({ criteria })),
}));
