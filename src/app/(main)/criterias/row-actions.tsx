'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { ConfirmDialog } from '~/components/confirm-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { type Criteria } from '~/lib/drizzle/schema';
import { deleteCriteria } from './actions';
import { CriteriaDetailModal } from './modals';

type CriteriaTableRowActionsProps = {
  criteria: Criteria;
};

export function CriteriaTableRowActions({
  criteria,
}: CriteriaTableRowActionsProps) {
  const [openDetailModal, setOpenDetailModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  async function handleDelete() {
    const { message } = await deleteCriteria(criteria.id);
    toast('Berhasil menghapus data!', { description: message });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <DotsHorizontalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem asChild>
            <Link href={`/criterias/${criteria.slug}`}>Lihat detail</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDeleteModal(true)}>
            Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CriteriaDetailModal
        open={openDetailModal}
        onOpenChange={setOpenDetailModal}
        criteria={criteria}
      />
      <ConfirmDialog
        open={openDeleteModal}
        onOpenChange={setOpenDeleteModal}
        action={handleDelete}
      />
    </>
  );
}
