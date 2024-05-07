'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { SortableButton } from '~/components/data-table';
import { Badge } from '~/components/ui/badge';
import type { Criteria } from '~/lib/drizzle/schema';
import { CriteriaTableRowActions } from './row-actions';

export const criteriaTableColumns: ColumnDef<Criteria>[] = [
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
        <Badge
          variant={type === 'benefit' ? 'default' : 'destructive'}
          className='capitalize'
        >
          {type}
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
    enableHiding: false,
    cell: ({ row }) => (
      <div className='text-right'>
        <CriteriaTableRowActions criteria={row.original} />
      </div>
    ),
  },
];
