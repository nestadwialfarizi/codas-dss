'use client';

import type { ScoringScale } from '@prisma/client';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useDisclosure } from 'react-use-disclosure';
import { toast } from 'sonner';
import { trpc } from '~/lib/utils';
import { ConfirmDialog } from '~/components/confirm-dialog';
import {
  AlignCenter,
  AlignEnd,
  AlignStart,
  DataTable,
  SortableButton,
} from '~/components/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { useIsAdmin } from '../auth/use-is-admin';
import { ScoringScaleForm } from './scoring-scale-form';

type ScoringScaleTableProps = {
  scoringScales: ScoringScale[];
};

export function ScoringScaleTable({ scoringScales }: ScoringScaleTableProps) {
  const isAdmin = useIsAdmin();

  const columns = useMemo<ColumnDef<ScoringScale>[]>(
    () => [
      {
        accessorKey: 'description',
        header: () => <AlignStart>Deskripsi</AlignStart>,
        cell: ({ renderValue }) => (
          <AlignStart>{renderValue() as string}</AlignStart>
        ),
      },
      {
        accessorKey: 'value',
        header: ({ column }) => (
          <AlignCenter>
            <SortableButton column={column} className='ml-6'>
              Nilai
            </SortableButton>
          </AlignCenter>
        ),
        cell: ({ renderValue }) => (
          <AlignCenter>{renderValue() as number}</AlignCenter>
        ),
      },
      {
        id: 'actions',
        ...(isAdmin && {
          enableHiding: false,
          header: () => <AlignEnd>(Opsi)</AlignEnd>,
          cell: ({ row }) => (
            <AlignEnd>
              <ScoringScaleTableRowActions scoringScale={row.original} />
            </AlignEnd>
          ),
        }),
      },
    ],
    [isAdmin],
  );

  return (
    <DataTable
      data={scoringScales}
      columns={columns}
      filter={{ columnId: 'description', header: 'deskripsi' }}
    />
  );
}

type ScoringScaleTableRowActionsProps = {
  scoringScale: ScoringScale;
};

export function ScoringScaleTableRowActions({
  scoringScale,
}: ScoringScaleTableRowActionsProps) {
  const utils = trpc.useUtils();

  const { isOpen: isOpenUpdate, toggle: toggleUpdate } = useDisclosure();
  const { isOpen: isOpenDelete, toggle: toggleDelete } = useDisclosure();

  const { mutate: deleteScoringScale, isPending } =
    trpc.scoringScale.delete.useMutation({
      onSuccess: (data) => {
        utils.scoringScale.invalidate();
        toast.success(`${data.description} berhasil dihapus`);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <DotsHorizontalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={() => toggleUpdate(true)}>
            Ubah
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toggleDelete(true)}>
            Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ScoringScaleForm
        open={isOpenUpdate}
        onOpenChange={toggleUpdate}
        prevScoringScale={scoringScale}
      />
      <ConfirmDialog
        open={isOpenDelete}
        onOpenChange={toggleDelete}
        action={() => deleteScoringScale({ id: scoringScale.id })}
        isPending={isPending}
      />
    </>
  );
}
