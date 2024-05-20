'use client';

import { useMemo } from 'react';
import { useDisclosure } from 'react-use-disclosure';
import type { Alternative } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { trpc } from '~/lib/utils';
import { Badge } from '~/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { ConfirmDialog } from '~/components/confirm-dialog';
import { AlignCenter, AlignStart, DataTable } from '~/components/data-table';
import { useIsAdmin } from '../auth/use-is-admin';
import { AlternativeForm } from './alternative-form';

type AlternativeTableProps = {
  alternatives: Alternative[];
};

export function AlternativeTable({ alternatives }: AlternativeTableProps) {
  const isAdmin = useIsAdmin();

  const { data: criterias } = trpc.criteria.list.useQuery();
  const { data: evaluations } = trpc.evaluation.list.useQuery();

  const columns = useMemo<ColumnDef<Alternative>[]>(
    () => [
      {
        id: 'code',
        header: () => <AlignStart>Kode</AlignStart>,
        cell: ({ row }) => <AlignStart>A{row.index + 1}</AlignStart>,
      },
      {
        accessorKey: 'name',
        header: 'Nama',
      },
      {
        accessorKey: 'id',
        header: () => <AlignCenter>Penilaian</AlignCenter>,
        cell: ({ renderValue }) => {
          const alternativeId = renderValue() as string;
          const filteredEvaluations = evaluations?.filter(
            (evaluation) => evaluation.alternativeId === alternativeId,
          );

          return (
            <AlignCenter>
              <Badge
                variant={
                  filteredEvaluations?.length === criterias?.length
                    ? 'default'
                    : 'destructive'
                }
              >
                {filteredEvaluations?.length} penilaian dari {criterias?.length}{' '}
                kriteria
              </Badge>
            </AlignCenter>
          );
        },
      },
      {
        id: 'actions',
        ...(isAdmin && {
          enableHiding: false,
          header: () => <div className='mr-1 text-right'>(Opsi)</div>,
          cell: ({ row }) => (
            <div className='mr-2 text-right'>
              <AlternativeTableRowActions alternative={row.original} />
            </div>
          ),
        }),
      },
    ],
    [criterias?.length, evaluations, isAdmin],
  );

  return (
    <DataTable
      data={alternatives}
      columns={columns}
      filter={{
        columnId: 'name',
        header: 'nama',
      }}
    />
  );
}

type AlternativeTableRowActionsProps = {
  alternative: Alternative;
};

function AlternativeTableRowActions({
  alternative,
}: AlternativeTableRowActionsProps) {
  const utils = trpc.useUtils();

  const { isOpen: isOpenUpdate, toggle: toggleUpdate } = useDisclosure();
  const { isOpen: isOpenDelete, toggle: toggleDelete } = useDisclosure();

  const { mutate: deleteAlternative, isPending } =
    trpc.alternative.delete.useMutation({
      onSuccess: (data) => {
        utils.alternative.invalidate();
        toast.success(`${data.name} berhasil dihapus`);
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
      <AlternativeForm
        open={isOpenUpdate}
        onOpenChange={toggleUpdate}
        prevAlternative={alternative}
      />
      <ConfirmDialog
        open={isOpenDelete}
        onOpenChange={toggleDelete}
        action={() => deleteAlternative({ id: alternative.id })}
        isPending={isPending}
      />
    </>
  );
}
