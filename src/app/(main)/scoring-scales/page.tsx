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
import { Button } from '~/components/ui/button';
import { useIsAdmin } from '~/features/auth/use-is-admin';
import { CriteriaForm } from '~/features/criterias/criteria-form';
import { CriteriaSwitcher } from '~/features/scoring-scales/criteria-switcher';
import { ScoringScaleForm } from '~/features/scoring-scales/scoring-scale-form';
import { ScoringScaleTable } from '~/features/scoring-scales/scoring-scale-table';
import { useCriteriaSwitcher } from '~/features/scoring-scales/use-criteria-switcher';

export default function ScoringScalePage() {
  const isAdmin = useIsAdmin();
  const { criteria } = useCriteriaSwitcher();
  const { isOpen, open, close } = useDisclosure();

  const { data: criterias, isLoading: isLoadingCriterias } =
    trpc.criteria.list.useQuery();
  const { data: scoringScales, isLoading: isLoadingScoringScales } =
    trpc.scoringScale.list.useQuery();

  const filteredScoringScales = scoringScales?.filter(
    ({ criteriaId }) => criteriaId === criteria?.id,
  );

  if (isLoadingCriterias || isLoadingScoringScales) return <LoadingIndicator />;
  if (!criterias?.length) return <NoCriteriasHeader />;

  return (
    <>
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderTitle>
            Skala Penilaian ({filteredScoringScales?.length})
          </PageHeaderTitle>
          <PageHeaderDescription>
            Daftar skala penilaian, tabel disajikan berdasarkan kriteria
            referensinya yang dapat diubah pada menu dropdown di bawah ini.
          </PageHeaderDescription>
        </PageHeaderContent>
      </PageHeader>

      <div className='flex flex-col gap-y-4'>
        <div className='flex flex-wrap items-center justify-between gap-y-4'>
          <CriteriaSwitcher />
          {isAdmin && (
            <Button onClick={open}>
              <PlusIcon className='mr-2' />
              Buat Skala Penilaian
            </Button>
          )}
        </div>
        {filteredScoringScales && (
          <ScoringScaleTable scoringScales={filteredScoringScales} />
        )}
        <ScoringScaleForm open={isOpen} onOpenChange={close} />
      </div>
    </>
  );
}

function NoCriteriasHeader() {
  const isAdmin = useIsAdmin();
  const { isOpen, open, close } = useDisclosure();

  return (
    <>
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderDescription>
            Belum ada data kriteria.
          </PageHeaderDescription>
        </PageHeaderContent>
        {isAdmin && (
          <PageHeaderAction asChild>
            <Button onClick={open}>
              <PlusIcon className='mr-2' />
              Buat Kriteria
            </Button>
          </PageHeaderAction>
        )}
      </PageHeader>
      <CriteriaForm open={isOpen} onOpenChange={close} />
    </>
  );
}
