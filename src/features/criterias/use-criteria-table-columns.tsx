'use client';

import type { Criteria } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';
import { pascalCase } from 'change-case';
import { SortableButton } from '~/components/data-table';
import { Badge } from '~/components/ui/badge';
import { CriteriaTableRowActions } from './criteria-table-row-actions';
import { useIsAdmin } from '../auth/use-is-admin';

export function useCriteriaTableColumns() {
  const isAdmin = useIsAdmin();

  return [
    {
      id: 'code',
      header: () => <div className='ml-1'>Kode</div>,
      cell: ({ row }) => <div className='ml-1'>C{row.index + 1}</div>,
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
      cell: ({ cell }) => {
        const type = cell.getValue() as Criteria['type'];
        return (
          <Badge variant={type === 'BENEFIT' ? 'default' : 'destructive'}>
            {pascalCase(type)}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'value',
      header: () => <div className='text-center'>Nilai</div>,
      cell: ({ cell }) => (
        <div className='text-center'>{cell.getValue() as number}</div>
      ),
    },
    {
      accessorKey: 'weight',
      header: ({ column }) => (
        <div className='text-center'>
          <SortableButton column={column} className='ml-6'>
            Bobot
          </SortableButton>
        </div>
      ),
      cell: ({ cell }) => (
        <div className='text-center'>
          {(cell.getValue() as number)?.toFixed(3)}
        </div>
      ),
    },
    {
      id: 'actions',
      ...(isAdmin && {
        enableHiding: false,
        header: () => <div className='mr-1 text-right'>(Opsi)</div>,
        cell: ({ row }) => (
          <div className='mr-2 text-right'>
            <CriteriaTableRowActions criteria={row.original} />
          </div>
        ),
      }),
    },
  ] as ColumnDef<Criteria>[];
}

export const criteriaTableColumns: ColumnDef<Criteria>[] = [];
