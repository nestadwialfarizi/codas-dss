'use client';

import { AssessmentScoreTable } from './tables/assessment-score-table';
import { DecisionMatrixTable } from './tables/decision-matrix-table';
import { EuclideanAndTaxicabDistanceTable } from './tables/euclidean-and-taxicab-distance-table';
import { IdealNegativeValueTable } from './tables/ideal-negative-value-table';
import { NormalizedMatrixTable } from './tables/normalized-matrix-table';
import { RankingTable } from './tables/ranking-table';
import { RelativeAssessmentMatrixTable } from './tables/relative-assessment-matrix-table';
import { WeightedNormalizedMatrixTable } from './tables/weighted-normalized-matrix-table';
import { useStep } from './use-step';

export function AnalysisTable() {
  const { step } = useStep();

  switch (step.slug) {
    case 'decision-matrix':
      return <DecisionMatrixTable />;
    case 'normalized-matrix':
      return <NormalizedMatrixTable />;
    case 'weighted-normalized-matrix':
      return <WeightedNormalizedMatrixTable />;
    case 'ideal-negative-value':
      return <IdealNegativeValueTable />;
    case 'euclidean-and-taxicab-distance':
      return <EuclideanAndTaxicabDistanceTable />;
    case 'relative-assessment-matrix':
      return <RelativeAssessmentMatrixTable />;
    case 'assessment-score':
      return <AssessmentScoreTable />;
    case 'ranking':
      return <RankingTable />;
    default:
      break;
  }
}
