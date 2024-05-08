'use client';

import type { ScoringScale } from '@prisma/client';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Fragment } from 'react';
import { useDisclosure } from 'react-use-disclosure';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { DeleteScoringScaleDialog } from './delete-scoring-scale-dialog';
import { UpdateScoringScaleDialog } from './update-scoring-scale-dialog';

type ScoringScaleTableRowActionsProps = {
  scoringScale: ScoringScale;
};

export function ScoringScaleTableRowActions({
  scoringScale,
}: ScoringScaleTableRowActionsProps) {
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
      <UpdateScoringScaleDialog
        isOpen={updateDialog.isOpen}
        onOpenChange={updateDialog.toggle}
        scoringScale={scoringScale}
      />
      <DeleteScoringScaleDialog
        isOpen={deleteDialog.isOpen}
        onOpenChange={deleteDialog.toggle}
        scoringScaleId={scoringScale.id}
      />
    </Fragment>
  );
}
