'use client';

import { pascalCase } from 'change-case';
import type { Criteria } from '@prisma/client';
import { CaretSortIcon } from '@radix-ui/react-icons';
import type { ColumnDef } from '@tanstack/react-table';

import { Badge } from 'src/components/ui/badge';
import { Button } from 'src/components/ui/button';

import { CriteriaDataTableRowActions } from './criteria-data-table-row-actions';

export const criteriaDataTableColumns: ColumnDef<Criteria>[] = [
  { header: 'Code', cell: ({ row }) => `C${row.index + 1}` },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='-ml-4'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Name
        <CaretSortIcon className='ml-2 h-4 w-4' />
      </Button>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ cell }) => {
      const type = cell.getValue() as string;

      return (
        <Badge variant={type === 'BENEFIT' ? 'default' : 'destructive'}>
          {pascalCase(type)}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'value',
    header: () => <div className='text-center'>Value</div>,
    cell: ({ cell }) => (
      <div className='text-center'>{cell.getValue() as number}</div>
    ),
  },
  {
    accessorKey: 'weight',
    header: () => <div className='text-center'>Weight</div>,
    cell: ({ cell }) => (
      <div className='text-center'>
        {Number(cell.getValue() as number).toFixed(3)}
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className='text-right'>
        <CriteriaDataTableRowActions criteria={row.original} />
      </div>
    ),
    enableHiding: false,
  },
];
