import type { Criteria } from '@prisma/client';
import { create } from 'zustand';

type CriteriaSwitcherState = {
  criteria: Criteria | null;
  setCriteria: (criteria: Criteria) => void;
};

export const useCriteriaSwitcher = create<CriteriaSwitcherState>()((set) => ({
  criteria: null,
  setCriteria: (criteria) => set(() => ({ criteria })),
}));
