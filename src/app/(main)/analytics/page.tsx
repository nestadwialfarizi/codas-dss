'use client';

import { trpc } from '~/lib/trpc';
import { PageHeader } from '~/components/common/page-header';
import { StepSelector } from '~/features/analytics/step-selector';
import { StepState, useStep } from '~/features/analytics/use-step';
import { DecisionMatrixTable } from '~/features/analytics/decision-matrix-table';
import { NormalizedMatrixTable } from '~/features/analytics/normalized-matrix-table';
import { WeightedNormalizedMatrixTable } from '~/features/analytics/weighted-normalized-matrix-table';
import { IdealNegativeValueTable } from '~/features/analytics/ideal-negative-value-table';
import { EuclideanAndTaxicabDistanceTable } from '~/features/analytics/euclidean-and-taxicab-distance-table';
import { RelativeAssessmentMatrixTable } from '~/features/analytics/relative-assessment-matrix-table';
import { AssessmentScoreTable } from '~/features/analytics/assessment-score-table';

type Tables = {
  name: StepState['step'];
  table: React.ReactElement;
};

const tables: Tables[] = [
  { name: 'Decision Matrix', table: <DecisionMatrixTable /> },
  { name: 'Normalized Matrix', table: <NormalizedMatrixTable /> },
  {
    name: 'Weighted Normalized Matrix',
    table: <WeightedNormalizedMatrixTable />,
  },
  { name: 'Ideal-Negative Value', table: <IdealNegativeValueTable /> },
  {
    name: 'Euclidean and Taxicab Distance',
    table: <EuclideanAndTaxicabDistanceTable />,
  },
  {
    name: 'Relative Assessment Matrix',
    table: <RelativeAssessmentMatrixTable />,
  },
  { name: 'Assessment Score', table: <AssessmentScoreTable /> },
];

export default function AnalyticsPage() {
  const { step } = useStep();
  const table = tables.find((table) => table.name === step)?.table;

  const { data: alternatives } = trpc.alternative.get.useQuery();

  if (!alternatives?.length) return <div>No alternatives found</div>;

  return (
    <section>
      <PageHeader
        heading='Analytics'
        description='Analysis of CODAS method calculations. Divided into several stages that can be selected in the dropdown menu.'
      />
      <div className='space-y-4'>
        <StepSelector />
        {table}
      </div>
    </section>
  );
}
