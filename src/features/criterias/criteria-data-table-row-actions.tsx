'use client';

import type { Criteria } from '@prisma/client';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useDisclosure } from 'react-use-disclosure';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { DeleteCriteriaDialog } from './delete-criteria-dialog';

type CriteriaDataTableRowActionsProps = {
  criteria: Criteria;
};

export function CriteriaDataTableRowActions({
  criteria,
}: CriteriaDataTableRowActionsProps) {
  const deleteDialog = useDisclosure();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon'>
            <DotsHorizontalIcon className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem>Update</DropdownMenuItem>
          <DropdownMenuItem onClick={deleteDialog.open}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteCriteriaDialog
        isOpen={deleteDialog.isOpen}
        onClose={deleteDialog.close}
        criteria={criteria}
      />
    </>
  );
}
