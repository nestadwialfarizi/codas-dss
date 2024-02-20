import { create } from 'zustand';

export type StepState = {
  step:
    | 'Decision Matrix'
    | 'Normalized Matrix'
    | 'Weighted Normalized Matrix'
    | 'Ideal-Negative Value'
    | 'Euclidean and Taxicab Distance'
    | 'Relative Assessment Matrix'
    | 'Assessment Score'
    | 'Ranking';
  setStep: (step: StepState['step']) => void;
};

export const useStep = create<StepState>()((set) => ({
  step: 'Decision Matrix',
  setStep: (step) => set(() => ({ step })),
}));
