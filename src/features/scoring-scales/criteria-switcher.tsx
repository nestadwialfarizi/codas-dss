'use client';

import { CaretDownIcon } from '@radix-ui/react-icons';
import { Fragment, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { trpc } from '~/lib/utils';
import { useCriteriaSwitcher } from './use-criteria-switcher';

export function CriteriaSwitcher() {
  const { criteria, setCriteria } = useCriteriaSwitcher();
  const { data: criterias, isLoading } = trpc.criterias.list.useQuery();

  useEffect(() => {
    if (criteria && criterias?.length) {
      const isIncluded = criterias.includes(criteria, 0);
      if (!isIncluded) setCriteria(criterias[0]);
    } else if (!criteria && criterias?.length) {
      setCriteria(criterias[0]);
    }
  }, [criteria, criterias, setCriteria]);

  return (
    <Fragment>
      {isLoading ? (
        <div>loading...</div>
      ) : (
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
      )}
    </Fragment>
  );
}
