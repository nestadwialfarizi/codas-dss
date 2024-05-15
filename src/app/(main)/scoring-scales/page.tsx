'use client';

import { trpc } from '~/lib/utils';
import { DataTable } from '~/components/data-table';
import { LoadingIndicator } from '~/components/loading-indicator';
import {
  PageHeader,
  PageHeaderAction,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
} from '~/components/page-header';
import { useIsAdmin } from '~/features/auth/use-is-admin';
import { CreateCriteriaButton } from '~/features/criterias/create-criteria-button';
import { CreateScoringScaleButton } from '~/features/scoring-scales/create-scoring-scale-button';
import { CriteriaSwitcher } from '~/features/scoring-scales/criteria-switcher';
import { useCriteriaSwitcher } from '~/features/scoring-scales/use-criteria-switcher';
import { useScoringScaleTableColumns } from '~/features/scoring-scales/use-scoring-scale-table-columns';

export default function ScoringScalePage() {
  const isAdmin = useIsAdmin();
  const { criteria } = useCriteriaSwitcher();
  const columns = useScoringScaleTableColumns();

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
    filteredScoringScales && (
      <>
        <ScoringScalePageHeader length={filteredScoringScales.length} />
        <div className='flex flex-col gap-y-4'>
          <div className='flex flex-wrap items-center justify-between gap-y-4'>
            <CriteriaSwitcher />
            {isAdmin && <CreateScoringScaleButton />}
          </div>
          <DataTable
            data={filteredScoringScales}
            columns={columns}
            filter={{ columnId: 'description', header: 'deskripsi' }}
          />
        </div>
      </>
    )
  );
}

function NoCriteriasHeader() {
  const isAdmin = useIsAdmin();

  return (
    <PageHeader>
      <PageHeaderContent>
        <PageHeaderDescription>Belum ada data kriteria.</PageHeaderDescription>
      </PageHeaderContent>
      {isAdmin && (
        <PageHeaderAction asChild>
          <CreateCriteriaButton />
        </PageHeaderAction>
      )}
    </PageHeader>
  );
}

function ScoringScalePageHeader({ length }: { length: number }) {
  return (
    <PageHeader>
      <PageHeaderContent>
        <PageHeaderTitle>Skala Penilaian ({length})</PageHeaderTitle>
        <PageHeaderDescription>
          Daftar skala penilaian, tabel disajikan berdasarkan kriteria
          referensinya yang dapat diubah pada menu dropdown di bawah ini.
        </PageHeaderDescription>
      </PageHeaderContent>
    </PageHeader>
  );
}
