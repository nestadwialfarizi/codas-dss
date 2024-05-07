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
import { CreateCriteria } from '~/features/criterias/create-criteria';
import { criteriaTableColumns } from '~/features/criterias/criteria-table-columns';
import { trpc } from '~/lib/utils';

export default function CriteriaPage() {
  const { data: criterias, isLoading } = trpc.criterias.list.useQuery();

  return (
    <Fragment>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        criterias && (
          <Fragment>
            <PageHeader>
              <PageHeaderContent>
                <PageHeaderTitle>Kriteria ({criterias.length})</PageHeaderTitle>
                <PageHeaderDescription>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Voluptates, consequuntur quidem dolore deleniti voluptatem
                  excepturi?
                </PageHeaderDescription>
              </PageHeaderContent>
              <PageHeaderAction asChild>
                <CreateCriteria />
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
