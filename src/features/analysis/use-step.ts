import { create } from 'zustand';

export type Step = {
  slug:
    | 'decision-matrix'
    | 'normalized-matrix'
    | 'weighted-normalized-matrix'
    | 'ideal-negative-value'
    | 'euclidean-and-taxicab-distance'
    | 'relative-assessment-matrix'
    | 'assessment-score'
    | 'ranking';
  name:
    | 'Matriks Keputusan'
    | 'Matriks Normalisasi'
    | 'Matriks Normalisasi Terbobot'
    | 'Nilai Ideal-negatif'
    | 'Jarak Euclidean dan Taxicab'
    | 'Matriks Relative Assessment'
    | 'Nilai Assessment'
    | 'Perankingan';
};

export type StepState = {
  step: Step;
  setStep: (step: Step) => void;
};

export const useStep = create<StepState>()((set) => ({
  step: { slug: 'decision-matrix', name: 'Matriks Keputusan' },
  setStep: (step) => set(() => ({ step })),
}));
