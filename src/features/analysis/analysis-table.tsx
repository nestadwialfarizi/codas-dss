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

  switch (step) {
    case 'Matriks Keputusan':
      return <DecisionMatrixTable />;
    case 'Matriks Normalisasi':
      return <NormalizedMatrixTable />;
    case 'Matriks Normalisasi Terbobot':
      return <WeightedNormalizedMatrixTable />;
    case 'Nilai Ideal-negatif':
      return <IdealNegativeValueTable />;
    case 'Jarak Euclidean dan Taxicab':
      return <EuclideanAndTaxicabDistanceTable />;
    case 'Matriks Relative Assessment':
      return <RelativeAssessmentMatrixTable />;
    case 'Nilai Assessment':
      return <AssessmentScoreTable />;
    case 'Perankingan':
      return <RankingTable />;
    default:
      break;
  }
}
