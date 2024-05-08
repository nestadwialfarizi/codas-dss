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
import { criteriaTableColumns } from '~/features/criterias/criteria-table-columns';
import { trpc } from '~/lib/utils';

export default function CriteriaPage() {
  const { data: criterias, isLoading } = trpc.criteria.list.useQuery();

  return (
    <Fragment>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        criterias && (
          <Fragment>
            <PageHeader>
              <PageHeaderContent>
                <PageHeaderTitle>Kriteria ({criterias.length})</PageHeaderTitle>
                <PageHeaderDescription>
                  Daftar data kriteria, anda juga dapat menambah kriteria baru
                  atau mengubah dan menghapus kriteria yang sudah ada.
                </PageHeaderDescription>
              </PageHeaderContent>
              <PageHeaderAction asChild>
                <CreateCriteriaButton />
              </PageHeaderAction>
            </PageHeader>
            <DataTable
              data={criterias}
              columns={criteriaTableColumns}
              filter={{ columnId: 'name', header: 'nama' }}
            />
          </Fragment>
        )
      )}
    </Fragment>
  );
}
