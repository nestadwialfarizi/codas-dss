'use client';

import { trpc } from 'src/lib/utils';
import { DataTable } from 'src/components/data-table';
import {
  PageHeader,
  PageHeaderAction,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
} from 'src/components/page-header';
import { CreateAlternativeButton } from 'src/features/alternatives/create-alternative-button';
import { useAlternativeTableColumns } from 'src/features/alternatives/use-alternative-table-columns';

export default function AlternativePage() {
  const columns = useAlternativeTableColumns();
  const { data: alternatives } = trpc.alternative.list.useQuery();

  return (
    alternatives &&
    columns && (
      <>
        <AlternativePageHeader length={alternatives.length} />
        <DataTable
          data={alternatives}
          columns={columns}
          filter={{ columnId: 'name', header: 'nama' }}
        />
      </>
    )
  );
}

function AlternativePageHeader({ length }: { length: number }) {
  return (
    <PageHeader>
      <PageHeaderContent>
        <PageHeaderTitle>Alternatif ({length})</PageHeaderTitle>
        <PageHeaderDescription>
          Data alternatif beserta evaluasinya, anda juga dapat menambah
          alternatif baru atau mengubah dan menghapus alternatif yang sudah ada.
        </PageHeaderDescription>
      </PageHeaderContent>
      <PageHeaderAction asChild>
        <CreateAlternativeButton />
      </PageHeaderAction>
    </PageHeader>
  );
}
