'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { useCodas } from './use-codas';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '~/components/common/data-table';
import { SortableButton } from '~/components/common/sortable-button';

const columns: ColumnDef<{
  id: string;
  name: string;
  score: number;
}>[] = [
  {
    id: 'code',
    header: () => <div className='text-center'>Code</div>,
    cell: ({ row }) => <div className='text-center'>A{row.index + 1}</div>,
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: () => <div className='text-center'>Alternative Name</div>,
    cell: ({ cell }) => (
      <div className='text-center'>{cell.getValue() as string}</div>
    ),
  },
  {
    accessorKey: 'score',
    header: ({ column }) => (
      <div className='text-center'>
        <SortableButton column={column}>Assessment Score</SortableButton>
      </div>
    ),
    cell: ({ cell }) => (
      <div className='text-center'>
        {(cell.getValue() as number).toFixed(3)}
      </div>
    ),
  },
];

export function AssessmentScoreTable() {
  const { assessmentScore } = useCodas();

  return (
    <DataTable
      data={assessmentScore}
      columns={columns}
      styles={{ bordered: true }}
    />
  );
}
