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
import { useCriteriaTableColumns } from '~/features/criterias/use-criteria-table-columns';

export default function CriteriaPage() {
  const columns = useCriteriaTableColumns();
  const { data: criterias, isLoading } = trpc.criteria.list.useQuery();

  if (isLoading) return <LoadingIndicator />;

  return (
    criterias && (
      <>
        <CriteriaPageHeader length={criterias.length} />
        <DataTable
          data={criterias}
          columns={columns}
          filter={{ columnId: 'name', header: 'nama' }}
        />
      </>
    )
  );
}

function CriteriaPageHeader({ length }: { length: number }) {
  const isAdmin = useIsAdmin();

  return (
    <PageHeader>
      <PageHeaderContent>
        <PageHeaderTitle>Kriteria ({length})</PageHeaderTitle>
        <PageHeaderDescription>
          Daftar data kriteria, anda juga dapat menambah kriteria baru atau
          mengubah dan menghapus kriteria yang sudah ada.
        </PageHeaderDescription>
      </PageHeaderContent>
      {isAdmin && (
        <PageHeaderAction asChild>
          <CreateCriteriaButton />
        </PageHeaderAction>
      )}
    </PageHeader>
  );
}
