'use client';

import { trpc } from '~/lib/trpc';
import { DataTable } from '~/components/common/data-table';
import { ErrorDisplay } from '~/components/common/error-display';
import { LoadingIndicator } from '~/components/common/loading-indicator';
import { useAlternativeDataTableColumns } from './use-alternative-data-table-columns';

export function AlternativeDataTable() {
  const {
    data: alternatives,
    isFetching,
    error,
  } = trpc.alternative.get.useQuery();

  const columns = useAlternativeDataTableColumns();

  if (isFetching) return <LoadingIndicator />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <DataTable
      data={alternatives!}
      columns={columns}
      filter={{ columnId: 'name' }}
      state={{ columnVisibility: true }}
      styles={{ bordered: true }}
    />
  );
}
