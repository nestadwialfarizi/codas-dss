'use client';

import type { Criteria, CriteriaType } from '@prisma/client';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import type { ColumnDef } from '@tanstack/react-table';
import { pascalCase } from 'change-case';
import { useMemo } from 'react';
import { useDisclosure } from 'react-use-disclosure';
import { toast } from 'sonner';
import { trpc } from '~/lib/utils';
import { Badge } from '~/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import {
  AlignCenter,
  AlignEnd,
  AlignStart,
  DataTable,
  SortableButton,
} from '~/components/data-table';
import { ConfirmDialog } from '~/components/confirm-dialog';
import { useIsAdmin } from '../auth/use-is-admin';
import { CriteriaForm } from './criteria-form';

type CriteriaTableProps = {
  criterias: Criteria[];
};

export function CriteriaTable({ criterias }: CriteriaTableProps) {
  const isAdmin = useIsAdmin();

  const columns = useMemo<ColumnDef<Criteria>[]>(
    () => [
      {
        id: 'code',
        header: () => <AlignStart>Kode</AlignStart>,
        cell: ({ row }) => <AlignStart>C{row.index + 1}</AlignStart>,
      },
      {
        accessorKey: 'name',
        header: 'Nama',
      },
      {
        accessorKey: 'type',
        header: ({ column }) => (
          <SortableButton column={column} className='-ml-4'>
            Tipe
          </SortableButton>
        ),
        cell: ({ renderValue }) => {
          const type = renderValue() as CriteriaType;
          return (
            <Badge variant={type === 'BENEFIT' ? 'default' : 'destructive'}>
              {pascalCase(type)}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'value',
        header: () => <AlignCenter>Nilai</AlignCenter>,
        cell: ({ cell }) => (
          <AlignCenter>{cell.getValue() as number}</AlignCenter>
        ),
      },
      {
        accessorKey: 'weight',
        header: ({ column }) => (
          <AlignCenter>
            <SortableButton column={column} className='ml-6'>
              Bobot
            </SortableButton>
          </AlignCenter>
        ),
        cell: ({ renderValue }) => (
          <AlignCenter>{(renderValue() as number).toFixed(3)}</AlignCenter>
        ),
      },
      {
        id: 'actions',
        ...(isAdmin && {
          enableHiding: false,
          header: () => <AlignEnd>(Opsi)</AlignEnd>,
          cell: ({ row }) => (
            <AlignEnd>
              <CriteriaTableRowActions criteria={row.original} />
            </AlignEnd>
          ),
        }),
      },
    ],
    [isAdmin],
  );

  return (
    <DataTable
      data={criterias}
      columns={columns}
      filter={{ columnId: 'name', header: 'nama' }}
    />
  );
}

type CriteriaTableRowActionsProps = {
  criteria: Criteria;
};

function CriteriaTableRowActions({ criteria }: CriteriaTableRowActionsProps) {
  const utils = trpc.useUtils();

  const { isOpen: isOpenUpdate, toggle: toggleUpdate } = useDisclosure();
  const { isOpen: isOpenDelete, toggle: toggleDelete } = useDisclosure();

  const { mutate: deleteCriteria, isPending } =
    trpc.criteria.delete.useMutation({
      onSuccess: (data) => {
        utils.criteria.invalidate();
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
      <CriteriaForm
        open={isOpenUpdate}
        onOpenChange={toggleUpdate}
        prevCriteria={criteria}
      />
      <ConfirmDialog
        open={isOpenDelete}
        onOpenChange={toggleDelete}
        action={() => deleteCriteria({ id: criteria.id })}
        isPending={isPending}
      />
    </>
  );
}
