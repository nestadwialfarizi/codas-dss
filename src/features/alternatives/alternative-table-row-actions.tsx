'use client';

import type { Alternative } from '@prisma/client';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useDisclosure } from 'react-use-disclosure';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { DeleteAlternativeDialog } from './delete-alternative-dialog';
import { UpdateAlternativeDialog } from './update-alternative-dialog';

type AlternativeTableRowActionsProps = {
  alternative: Alternative;
};

export function AlternativeTableRowActions({
  alternative,
}: AlternativeTableRowActionsProps) {
  const updateDialog = useDisclosure();
  const deleteDialog = useDisclosure();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <DotsHorizontalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={updateDialog.open}>Ubah</DropdownMenuItem>
          <DropdownMenuItem onClick={deleteDialog.open}>Hapus</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateAlternativeDialog
        isOpen={updateDialog.isOpen}
        onOpenChange={updateDialog.toggle}
        alternative={alternative}
      />
      <DeleteAlternativeDialog
        isOpen={deleteDialog.isOpen}
        onOpenChange={deleteDialog.toggle}
        alternativeId={alternative.id}
      />
    </>
  );
}
