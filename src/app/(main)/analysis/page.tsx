'use client';

import { trpc } from 'src/lib/utils';
import {
  PageHeader,
  PageHeaderAction,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
} from 'src/components/page-header';
import { Badge } from 'src/components/ui/badge';
import { StepSwitcher } from 'src/features/analysis/step-switcher';
import { AssessmentScoreTable } from 'src/features/analysis/tables/assessment-score-table';
import { DecisionMatrixTable } from 'src/features/analysis/tables/decision-matrix-table';
import { EuclideanAndTaxicabDistanceTable } from 'src/features/analysis/tables/euclidean-and-taxicab-distance-table';
import { IdealNegativeValueTable } from 'src/features/analysis/tables/ideal-negative-value-table';
import { NormalizedMatrixTable } from 'src/features/analysis/tables/normalized-matrix-table';
import { RankingTable } from 'src/features/analysis/tables/ranking-table';
import { RelativeAssessmentMatrixTable } from 'src/features/analysis/tables/relative-assessment-matrix-table';
import { WeightedNormalizedMatrixTable } from 'src/features/analysis/tables/weighted-normalized-matrix-table';
import { StepState, useStep } from 'src/features/analysis/use-step';
import { CreateAlternativeButton } from 'src/features/alternatives/create-alternative-button';

export default function AnalysisPage() {
  const { step } = useStep();
  const table = tables.find((table) => table.name === step)?.table;

  const { data: alternatives, isLoading } = trpc.alternative.list.useQuery();

  if (isLoading) return <div />;

  if (!alternatives?.length) return <NoAlternativesHeader />;

  return (
    <>
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderTitle>Analisis Perhitungan</PageHeaderTitle>
          <PageHeaderDescription>
            Hasil analisis perhitungan yang terbagi dalam beberapa tahap.
            Tahapan perhitungan dapat dipilih pada menu dropdown di bawah ini.
          </PageHeaderDescription>
        </PageHeaderContent>
      </PageHeader>
      <div className='mb-4 flex flex-wrap items-end justify-between gap-4'>
        <StepSwitcher />
        {step === 'Perankingan' && (
          <Badge>
            3 (tiga) alternatif teratas adalah rekomendasi terbaik yang
            disarankan oleh sistem
          </Badge>
        )}
      </div>
      {alternatives && table}
    </>
  );
}

type Tables = {
  name: StepState['step'];
  table: React.ReactElement;
};

const tables: Tables[] = [
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

function NoAlternativesHeader() {
  return (
    <PageHeader>
      <PageHeaderContent>
        <PageHeaderDescription>
          Belum ada data alternatif.
        </PageHeaderDescription>
      </PageHeaderContent>
      <PageHeaderAction asChild>
        <CreateAlternativeButton />
      </PageHeaderAction>
    </PageHeader>
  );
}
