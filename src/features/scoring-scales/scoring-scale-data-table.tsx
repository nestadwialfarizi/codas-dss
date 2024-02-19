'use client';

import { trpc } from '~/lib/trpc';
import { DataTable } from '~/components/common/data-table';
import { ErrorDisplay } from '~/components/common/error-display';
import { LoadingIndicator } from '~/components/common/loading-indicator';
import { useCriteriaRef } from './use-criteria-ref';
import { scoringScaleDataTableColumns } from './scoring-scale-data-table-columns';

export function ScoringScaleDataTable() {
  const { criteria } = useCriteriaRef();

  const {
    data: scoringScales,
    isFetching,
    error,
  } = trpc.scoringScale.get.useQuery();

  const scoringScalesByCriteriaId = scoringScales?.filter(
    (scoringScale) => scoringScale.criteriaId === criteria.id,
  );

  if (isFetching) return <LoadingIndicator />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <DataTable
      data={scoringScalesByCriteriaId!}
      columns={scoringScaleDataTableColumns}
      filter={{ columnId: 'description' }}
      state={{ columnVisibility: true }}
    />
  );
}
