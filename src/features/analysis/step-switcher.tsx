'use client';

import { CaretDownIcon } from '@radix-ui/react-icons';
import { useMemo } from 'react';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Step, useStep } from './use-step';

export function StepSwitcher() {
  const { step, setStep } = useStep();

  const steps = useMemo<Step[]>(
    () => [
      {
        slug: 'decision-matrix',
        name: 'Matriks Keputusan',
      },
      {
        slug: 'normalized-matrix',
        name: 'Matriks Normalisasi',
      },
      {
        slug: 'weighted-normalized-matrix',
        name: 'Matriks Normalisasi Terbobot',
      },
      {
        slug: 'ideal-negative-value',
        name: 'Nilai Ideal-negatif',
      },
      {
        slug: 'euclidean-and-taxicab-distance',
        name: 'Jarak Euclidean dan Taxicab',
      },
      {
        slug: 'relative-assessment-matrix',
        name: 'Matriks Relative Assessment',
      },
      {
        slug: 'assessment-score',
        name: 'Nilai Assessment',
      },
      {
        slug: 'ranking',
        name: 'Perankingan',
      },
    ],
    [],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          {step.name}
          <CaretDownIcon className='ml-2 h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start'>
        {steps.map((step) => (
          <DropdownMenuItem key={step.slug} onClick={() => setStep(step)}>
            {step.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
