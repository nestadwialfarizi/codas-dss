'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Fragment } from 'react';
import { useDisclosure } from 'react-use-disclosure';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { type Criteria } from '~/server/drizzle/schema';
import { DeleteCriteria } from './delete-criteria-dialog';
import { UpdateCriteria } from './update-criteria-dialog';

type CriteriaTableRowActionsProps = {
  criteria: Criteria;
};

export function CriteriaTableRowActions({
  criteria,
}: CriteriaTableRowActionsProps) {
  const updateDialog = useDisclosure();
  const deleteDialog = useDisclosure();

  return (
    <Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <DotsHorizontalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={updateDialog.open}>Ubah</DropdownMenuItem>
          <DropdownMenuItem onClick={deleteDialog.open}>Hapus</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateCriteria
        isOpen={updateDialog.isOpen}
        onOpenChange={updateDialog.toggle}
        criteria={criteria}
      />
      <DeleteCriteria
        isOpen={deleteDialog.isOpen}
        onOpenChange={deleteDialog.toggle}
        criteriaId={criteria.id}
      />
    </Fragment>
  );
}
