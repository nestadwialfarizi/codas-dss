import { create } from 'zustand';

export type StepState = {
  step:
    | 'Matriks Keputusan'
    | 'Matriks Normalisasi'
    | 'Matriks Normalisasi Terbobot'
    | 'Nilai Ideal-negatif'
    | 'Jarak Euclidean dan Taxicab'
    | 'Matriks Relative Assessment'
    | 'Nilai Assessment'
    | 'Perankingan';
  setStep: (step: StepState['step']) => void;
};

export const useStep = create<StepState>()((set) => ({
  step: 'Matriks Keputusan',
  setStep: (step) => set(() => ({ step })),
}));
