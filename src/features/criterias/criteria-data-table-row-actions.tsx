'use client';

import type { Criteria } from '@prisma/client';
import { useDisclosure } from 'react-use-disclosure';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';
import { Button } from 'src/components/ui/button';

import { UpdateCriteriaDialog } from './update-criteria-dialog';
import { DeleteCriteriaDialog } from './delete-criteria-dialog';

type CriteriaDataTableRowActionsProps = {
  criteria: Criteria;
};

export function CriteriaDataTableRowActions({
  criteria,
}: CriteriaDataTableRowActionsProps) {
  const deleteDialog = useDisclosure();
  const updateDialog = useDisclosure();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon'>
            <DotsHorizontalIcon className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={updateDialog.open}>
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={deleteDialog.open}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateCriteriaDialog
        isOpen={updateDialog.isOpen}
        onClose={updateDialog.close}
        criteria={criteria}
      />
      <DeleteCriteriaDialog
        isOpen={deleteDialog.isOpen}
        onClose={deleteDialog.close}
        criteria={criteria}
      />
    </>
  );
}
