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

const tables = [
  { name: 'Matriks Keputusan', table: <DecisionMatrixTable /> },
  { name: 'Matriks Normalisasi', table: <NormalizedMatrixTable /> },
  {
    name: 'Matriks Normalisasi Terbobot',
    table: <WeightedNormalizedMatrixTable />,
  },
  { name: 'Nilai Ideal-negatif', table: <IdealNegativeValueTable /> },
  {
    name: 'Jarak Euclidean dan Taxicab',
    table: <EuclideanAndTaxicabDistanceTable />,
  },
  {
    name: 'Matriks Relative Assessment',
    table: <RelativeAssessmentMatrixTable />,
  },
  { name: 'Nilai Assessment', table: <AssessmentScoreTable /> },
  { name: 'Perankingan', table: <RankingTable /> },
];

export function AnalysisTable() {
  const { step } = useStep();
  const table = tables.find((table) => table.name === step)?.table;

  return table;
}
