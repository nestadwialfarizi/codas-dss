'use client';

import { trpc } from '~/lib/utils';
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

export default function CriteriaPage() {
  const { data: criterias } = trpc.criteria.list.useQuery();

  return (
    criterias && (
      <>
        <CriteriaPageHeader length={criterias.length} />
        <DataTable
          data={criterias}
          columns={criteriaTableColumns}
          filter={{ columnId: 'name', header: 'nama' }}
        />
      </>
    )
  );
}

function CriteriaPageHeader({ length }: { length: number }) {
  return (
    <PageHeader>
      <PageHeaderContent>
        <PageHeaderTitle>Kriteria ({length})</PageHeaderTitle>
        <PageHeaderDescription>
          Daftar data kriteria, anda juga dapat menambah kriteria baru atau
          mengubah dan menghapus kriteria yang sudah ada.
        </PageHeaderDescription>
      </PageHeaderContent>
      <PageHeaderAction asChild>
        <CreateCriteriaButton />
      </PageHeaderAction>
    </PageHeader>
  );
}
