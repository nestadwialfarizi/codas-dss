'use client';

import { PlusIcon } from '@radix-ui/react-icons';
import { useDisclosure } from 'react-use-disclosure';
import { trpc } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import {
  PageHeader,
  PageHeaderAction,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
} from '~/components/page-header';
import { LoadingIndicator } from '~/components/loading-indicator';
import { AlternativeForm } from '~/features/alternatives/alternative-form';
import { AlternativeTable } from '~/features/alternatives/alternative-table';
import { useIsAdmin } from '~/features/auth/use-is-admin';

export default function AlternativePage() {
  const isAdmin = useIsAdmin();
  const { isOpen, open, close } = useDisclosure();
  const { data: alternatives, isLoading } = trpc.alternative.list.useQuery();

  if (isLoading) return <LoadingIndicator className='mt-52' />;

  return (
    alternatives && (
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
              <Button onClick={open}>
                <PlusIcon className='mr-2' />
                Buat Alternatif
              </Button>
            </PageHeaderAction>
          )}
        </PageHeader>
        <AlternativeTable alternatives={alternatives} />
        <AlternativeForm open={isOpen} onOpenChange={close} />
      </>
    )
  );
}
