'use client';

import { Fragment } from 'react';
import { Alternative } from '@prisma/client';
import { useDisclosure } from 'react-use-disclosure';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Button } from '~/components/ui/button';
import { DeleteAlternativeDialog } from './delete-alternative-dialog';
import { UpdateAlternativeDialog } from './update-alternative-dialog';

type AlternativeDataTableRowActionsProps = {
  alternative: Alternative;
};

export function AlternativeDataTableRowActions({
  alternative,
}: AlternativeDataTableRowActionsProps) {
  const {
    isOpen: isOpenUpdateDialog,
    open: openUpdateDialog,
    close: closeUpdateDialog,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteDialog,
    open: openDeleteDialog,
    close: closeDeleteDialog,
  } = useDisclosure();

  return (
    <Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon'>
            <DotsHorizontalIcon className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={openUpdateDialog}>Update</DropdownMenuItem>
          <DropdownMenuItem onClick={openDeleteDialog}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateAlternativeDialog
        isOpen={isOpenUpdateDialog}
        onClose={closeUpdateDialog}
        alternative={alternative}
      />
      <DeleteAlternativeDialog
        isOpen={isOpenDeleteDialog}
        onClose={closeDeleteDialog}
        alternative={alternative}
      />
    </Fragment>
  );
}
