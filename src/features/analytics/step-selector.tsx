'use client';

import { CaretDownIcon } from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Button } from '~/components/ui/button';
import { useStep } from './use-step';

const steps = [
  'Decision Matrix',
  'Normalized Matrix',
  'Weighted Normalized Matrix',
  'Ideal-Negative Value',
  'Euclidean and Taxicab Distance',
  'Relative Assessment Matrix',
  'Assessment Score',
  'Ranking',
] as const;

export function StepSelector() {
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
