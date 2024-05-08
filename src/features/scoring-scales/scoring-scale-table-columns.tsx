'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { SortableButton } from '~/components/data-table';
import type { ScoringScale } from '~/server/drizzle/schema';
import { ScoringScaleTableRowActions } from './scoring-scale-table-row-actions';

export const scoringScaleTableColumns: ColumnDef<ScoringScale>[] = [
  {
    accessorKey: 'description',
    header: () => <div className='ml-1'>Deskripsi</div>,
    cell: ({ cell }) => <div className='ml-1'>{cell.getValue() as string}</div>,
  },
  {
    accessorKey: 'value',
    header: ({ column }) => (
      <div className='text-center'>
        <SortableButton column={column} className='ml-6'>
          Nilai
        </SortableButton>
      </div>
    ),
    cell: ({ cell }) => (
      <div className='text-center'>{cell.getValue() as number}</div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    header: () => <div className='mr-1 text-right'>(Aksi)</div>,
    cell: ({ row }) => (
      <div className='text-right'>
        <ScoringScaleTableRowActions scoringScale={row.original} />
      </div>
    ),
  },
];