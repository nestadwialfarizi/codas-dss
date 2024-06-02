'use client';

import { PlusIcon } from '@radix-ui/react-icons';
import { useDisclosure } from 'react-use-disclosure';
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
import { Button } from '~/components/ui/button';
import { AlternativeForm } from '~/features/alternatives/alternative-form';
import { AnalysisTable } from '~/features/analysis/analysis-table';
import { StepSwitcher } from '~/features/analysis/step-switcher';
import { useStep } from '~/features/analysis/use-step';
import { useIsAdmin } from '~/features/auth/use-is-admin';

export default function AnalysisPage() {
  const { step } = useStep();
  const { data: alternatives, isLoading } = trpc.alternative.list.useQuery();

  if (isLoading) return <LoadingIndicator className='mt-52' />;
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
        {step.slug === 'ranking' && (
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
  const { isOpen, open, close } = useDisclosure();

  return (
    <>
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderDescription>
            Belum ada data alternatif.
          </PageHeaderDescription>
        </PageHeaderContent>
        {isAdmin && (
          <PageHeaderAction asChild>
            <Button onClick={open}>
              <PlusIcon className='mr-2' />
              Buat Alternatif
            </Button>
          </PageHeaderAction>
        )}
      </PageHeader>
      <AlternativeForm open={isOpen} onOpenChange={close} />
    </>
  );
}
