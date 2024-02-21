'use client';

import { Fragment, ReactElement } from 'react';
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
  table: ReactElement;
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

  return (
    <Fragment>
      <PageHeader
        heading='Analytics'
        description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, maxime!'
      />
      <div className='space-y-4'>
        <StepSelector />
        {table}
      </div>
    </Fragment>
  );
}
