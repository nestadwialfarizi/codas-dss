'use client';

import { useEffect } from 'react';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { trpc } from '~/lib/trpc';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Button } from '~/components/ui/button';
import { ErrorDisplay } from '~/components/common/error-display';
import { LoadingIndicator } from '~/components/common/loading-indicator';
import { useCriteriaRef } from './use-criteria-ref';

export const CriteriaSelector = () => {
  const { criteria, setCriteria } = useCriteriaRef();
  const { data: criterias, isFetching, error } = trpc.criteria.get.useQuery();

  useEffect(() => {
    if (Object.keys(criteria).length === 0 && criterias) {
      setCriteria(criterias[0]);
    }
  }, [criteria, criterias, setCriteria]);

  if (isFetching) return <LoadingIndicator />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          {criteria.name}
          <CaretDownIcon className='ml-2 h-4 w-4' />
          <span className='sr-only'>Select criteria</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start'>
        {criterias?.map((criteria) => (
          <DropdownMenuItem
            key={criteria.id}
            onClick={() => setCriteria(criteria)}
          >
            {criteria.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
