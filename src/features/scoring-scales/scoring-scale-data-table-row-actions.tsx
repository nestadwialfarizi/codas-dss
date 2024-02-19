'use client';

import type { ScoringScale } from '@prisma/client';
import { useDisclosure } from 'react-use-disclosure';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Button } from '~/components/ui/button';

import { UpdateScoringScaleDialog } from './update-scoring-scale-dialog';
import { DeleteScoringScaleDialog } from './delete-scoring-scale-dialog';

type ScoringScaleDataTableRowActionsProps = {
  scoringScale: ScoringScale;
};

export function ScoringScaleDataTableRowActions({
  scoringScale,
}: ScoringScaleDataTableRowActionsProps) {
  const updateDialog = useDisclosure();
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
          <DropdownMenuItem onClick={updateDialog.open}>
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={deleteDialog.open}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateScoringScaleDialog
        isOpen={updateDialog.isOpen}
        onClose={updateDialog.close}
        scoringScale={scoringScale}
      />
      <DeleteScoringScaleDialog
        isOpen={deleteDialog.isOpen}
        onClose={deleteDialog.close}
        scoringScale={scoringScale}
      />
    </>
  );
}
