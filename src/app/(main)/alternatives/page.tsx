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
import { CreateAlternativeButton } from '~/features/alternatives/create-alternative-button';
import { useAlternativeTableColumns } from '~/features/alternatives/use-alternative-table-columns';

export default function AlternativePage() {
  const isAdmin = useIsAdmin();
  const columns = useAlternativeTableColumns();
  const { data: alternatives, isLoading } = trpc.alternative.list.useQuery();

  if (isLoading) return <LoadingIndicator />;

  return (
    alternatives &&
    columns && (
      <>
        <PageHeader>
          <PageHeaderContent>
            <PageHeaderTitle>
              Alternatif ({alternatives.length})
            </PageHeaderTitle>
            <PageHeaderDescription>
              Data alternatif beserta evaluasinya, anda juga dapat menambah
              alternatif baru atau mengubah dan menghapus alternatif yang sudah
              ada.
            </PageHeaderDescription>
          </PageHeaderContent>
          {isAdmin && (
            <PageHeaderAction asChild>
              <CreateAlternativeButton />
            </PageHeaderAction>
          )}
        </PageHeader>

        <DataTable
          data={alternatives}
          columns={columns}
          filter={{ columnId: 'name', header: 'nama' }}
        />
      </>
    )
  );
}
