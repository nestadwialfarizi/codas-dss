'use client';

import { useEffect } from 'react';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { trpc } from 'src/lib/utils';
import { Button } from 'src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';
import { useCriteriaSwitcher } from './use-criteria-switcher';

export function CriteriaSwitcher() {
  const { criteria, setCriteria } = useCriteriaSwitcher();
  const { data: criterias } = trpc.criteria.list.useQuery();

  useEffect(() => {
    if (criteria && criterias?.length) {
      const isIncluded = criterias.includes(criteria, 0);
      if (!isIncluded) setCriteria(criterias[0]);
    } else if (!criteria && criterias?.length) {
      setCriteria(criterias[0]);
    }
  }, [criteria, criterias, setCriteria]);

  return (
    criterias && (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline'>
            {criteria?.name}
            <CaretDownIcon className='ml-2' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          {criterias.map((criteria) => (
            <DropdownMenuItem
              key={criteria.id}
              onClick={() => setCriteria(criteria)}
            >
              {criteria.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}
