'use client';

import { CaretDownIcon } from '@radix-ui/react-icons';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { useStep } from './use-step';

const steps = [
  'Matriks Keputusan',
  'Matriks Normalisasi',
  'Matriks Normalisasi Terbobot',
  'Nilai Ideal-negatif',
  'Jarak Euclidean dan Taxicab',
  'Matriks Relative Assessment',
  'Nilai Assessment',
  'Perankingan',
] as const;

export function StepSwitcher() {
  const { step, setStep } = useStep();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          {step}
          <CaretDownIcon className='ml-2 h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start'>
        {steps.map((step) => (
          <DropdownMenuItem key={step} onClick={() => setStep(step)}>
            {step}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
