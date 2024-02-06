'use client';

import { trpc } from '~/lib/trpc';
import { DataTable } from '~/components/data-table';
import { ErrorDisplay } from '~/components/error-display';
import { LoadingIndicator } from '~/components/loading-indicator';
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
