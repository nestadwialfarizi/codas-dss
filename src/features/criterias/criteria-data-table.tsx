'use client';

import { DataTable } from 'src/components/data-table';
import { ErrorDisplay } from 'src/components/error-display';
import { LoadingIndicator } from 'src/components/loading-indicator';

import { trpc } from 'src/lib/trpc';

import { criteriaDataTableColumns } from './criteria-data-table-columns';

export function CriteriaDataTable() {
  const { data: criterias, isFetching, error } = trpc.criteria.get.useQuery();

  if (isFetching) return <LoadingIndicator />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <DataTable
      data={criterias!}
      columns={criteriaDataTableColumns}
      filter={{ columnId: 'name' }}
      state={{ columnVisibility: true }}
    />
  );
}
