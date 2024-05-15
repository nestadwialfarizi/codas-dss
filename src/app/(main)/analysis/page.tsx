'use client';

import { trpc } from '~/lib/utils';
import { LoadingIndicator } from '~/components/loading-indicator';
import {
  PageHeader,
  PageHeaderAction,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
} from '~/components/page-header';
import { Badge } from '~/components/ui/badge';
import { useIsAdmin } from '~/features/auth/use-is-admin';
import { CreateAlternativeButton } from '~/features/alternatives/create-alternative-button';
import { AnalysisTable } from '~/features/analysis/analysis-table';
import { StepSwitcher } from '~/features/analysis/step-switcher';
import { useStep } from '~/features/analysis/use-step';

export default function AnalysisPage() {
  const { step } = useStep();
  const { data: alternatives, isLoading } = trpc.alternative.list.useQuery();

  if (isLoading) return <LoadingIndicator />;
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
      {alternatives && <AnalysisTable />}
    </>
  );
}

function NoAlternativesHeader() {
  const isAdmin = useIsAdmin();

  return (
    <PageHeader>
      <PageHeaderContent>
        <PageHeaderDescription>
          Belum ada data alternatif.
        </PageHeaderDescription>
      </PageHeaderContent>
      {isAdmin && (
        <PageHeaderAction asChild>
          <CreateAlternativeButton />
        </PageHeaderAction>
      )}
    </PageHeader>
  );
}
