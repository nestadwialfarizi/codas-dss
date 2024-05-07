import { create } from 'zustand';
import type { Criteria } from '~/server/drizzle/schema';

type CriteriaSwitcherState = {
  criteria: Criteria | null;
  setCriteria: (criteria: Criteria) => void;
};

export const useCriteriaSwitcher = create<CriteriaSwitcherState>()((set) => ({
  criteria: null,
  setCriteria: (criteria) => set(() => ({ criteria })),
}));
