'use client';

import { Fragment } from 'react';
import { DataTable } from '~/components/data-table';
import {
  PageHeader,
  PageHeaderAction,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
} from '~/components/page-header';
import { CreateCriteriaButton } from '~/features/criterias/create-criteria-button';
import { CreateScoringScaleButton } from '~/features/scoring-scales/create-scoring-scale-button';
import { CriteriaSwitcher } from '~/features/scoring-scales/criteria-switcher';
import { scoringScaleTableColumns } from '~/features/scoring-scales/scoring-scale-table-columns';
import { useCriteriaSwitcher } from '~/features/scoring-scales/use-criteria-switcher';
import { trpc } from '~/lib/utils';

export default function ScoringScalePage() {
  const { criteria } = useCriteriaSwitcher();

  const { data: criterias, isLoading: isLoadingCriterias } =
    trpc.criteria.list.useQuery();
  const { data: scoringScales, isLoading: isLoadingScoringScales } =
    trpc.scoringScale.list.useQuery();

  const isLoading = isLoadingCriterias || isLoadingScoringScales;

  const filteredScoringScales = scoringScales?.filter(
    ({ criteriaId }) => criteriaId === criteria?.id,
  );

  return (
    <Fragment>
      {isLoading ? (
        <div>Loading...</div>
      ) : !criterias?.length ? (
        <PageHeader>
          <PageHeaderContent>
            <PageHeaderDescription>
              Belum ada data kriteria.
            </PageHeaderDescription>
          </PageHeaderContent>
          <PageHeaderAction asChild>
            <CreateCriteriaButton />
          </PageHeaderAction>
        </PageHeader>
      ) : (
        filteredScoringScales && (
          <Fragment>
            <PageHeader>
              <PageHeaderContent>
                <PageHeaderTitle>
                  Skala Penilaian ({filteredScoringScales.length})
                </PageHeaderTitle>
                <PageHeaderDescription>
                  Daftar skala penilaian, tabel disajikan berdasarkan kriteria
                  referensinya yang dapat diubah pada menu dropdown di bawah
                  ini.
                </PageHeaderDescription>
              </PageHeaderContent>
            </PageHeader>
            <div className='flex flex-col gap-y-4'>
              <div className='flex flex-wrap items-center justify-between gap-y-4'>
                <CriteriaSwitcher />
                <CreateScoringScaleButton />
              </div>
              <DataTable
                data={filteredScoringScales}
                columns={scoringScaleTableColumns}
                filter={{ columnId: 'description', header: 'deskripsi' }}
              />
            </div>
          </Fragment>
        )
      )}
    </Fragment>
  );
}
