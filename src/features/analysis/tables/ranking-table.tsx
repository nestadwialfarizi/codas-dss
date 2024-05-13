'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '~/components/data-table';
import { useCodas } from '../use-codas';

const columns: ColumnDef<{
  code: string;
  name: string;
  score: number;
}>[] = [
  {
    accessorKey: 'code',
    header: () => <div className='text-center'>Kode</div>,
    cell: ({ cell }) => (
      <div className='text-center'>{cell.getValue() as string}</div>
    ),
  },
  {
    accessorKey: 'name',
    header: () => <div className='text-center'>Nama Alternatif</div>,
    cell: ({ cell }) => (
      <div className='text-center'>{cell.getValue() as string}</div>
    ),
  },
  {
    accessorKey: 'score',
    header: () => <div className='text-center'>Nilai Assessment</div>,
    cell: ({ cell }) => (
      <div className='text-center'>
        {(cell.getValue() as number).toFixed(3)}
      </div>
    ),
  },
  {
    id: 'ranking',
    header: () => <div className='text-center'>Ranking</div>,
    cell: ({ row }) => <div className='text-center'>{row.index + 1}</div>,
  },
];

type RankingTableProps = {
  pageSize?: number;
};

export function RankingTable({ pageSize = 5 }: RankingTableProps) {
  const { ranking } = useCodas();

  return (
    <DataTable
      data={ranking}
      columns={columns}
      styles={{ bordered: true }}
      initialState={{ pageSize }}
    />
  );
}
