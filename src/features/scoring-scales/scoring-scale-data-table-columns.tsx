'use client';

import type { ScoringScale } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';
import { SortableButton } from '~/components/common/sortable-button';
import { ScoringScaleDataTableRowActions } from './scoring-scale-data-table-row-actions';

export const scoringScaleDataTableColumns: ColumnDef<ScoringScale>[] = [
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <SortableButton column={column} className='-ml-3'>
        Description
      </SortableButton>
    ),
    cell: ({ cell }) => <div className='ml-1'>{cell.getValue() as string}</div>,
  },
  {
    accessorKey: 'value',
    header: () => <div className='text-center'>Value</div>,
    cell: ({ cell }) => (
      <div className='text-center'>{cell.getValue() as number}</div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className='text-right'>
        <ScoringScaleDataTableRowActions scoringScale={row.original} />
      </div>
    ),
    enableHiding: false,
  },
];
