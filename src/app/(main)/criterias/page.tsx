'use client';

import { PlusIcon } from '@radix-ui/react-icons';
import { useDisclosure } from 'react-use-disclosure';
import { trpc } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { LoadingIndicator } from '~/components/loading-indicator';
import {
  PageHeader,
  PageHeaderAction,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
} from '~/components/page-header';
import { useIsAdmin } from '~/features/auth/use-is-admin';
import { CriteriaForm } from '~/features/criterias/criteria-form';
import { CriteriaTable } from '~/features/criterias/criteria-table';

export default function CriteriaPage() {
  const isAdmin = useIsAdmin();
  const { isOpen, open, close } = useDisclosure();
  const { data: criterias, isLoading } = trpc.criteria.list.useQuery();

  if (isLoading) return <LoadingIndicator />;

  return (
    criterias && (
      <>
        <PageHeader>
          <PageHeaderContent>
            <PageHeaderTitle>Kriteria ({criterias.length})</PageHeaderTitle>
            <PageHeaderDescription>
              Daftar data kriteria, anda juga dapat menambah kriteria baru atau
              mengubah dan menghapus kriteria yang sudah ada.
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
        <CriteriaTable criterias={criterias} />
        <CriteriaForm open={isOpen} onOpenChange={close} />
      </>
    )
  );
}
