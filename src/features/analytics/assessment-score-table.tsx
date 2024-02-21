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
import { DataTable } from '~/components/common/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { SortableButton } from '~/components/common/sortable-button';

const columns: ColumnDef<{
  name: string;
  score: number;
}>[] = [
  {
    id: 'code',
    header: () => <div className='text-center'>Code</div>,
    cell: ({ row }) => <div className='text-center'>A{row.index + 1}</div>,
  },
  {
    accessorKey: 'name',
    header: () => <div className='text-center'>Name</div>,
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
  const { data, assessmentScore } = useCodas();

  return (
    <DataTable
      data={assessmentScore}
      columns={columns}
      styles={{ bordered: true }}
    />

    // <div className='rounded-md border'>
    //   <Table>
    //     <TableHeader>
    //       <TableRow>
    //         <TableHead className='border-r text-center'>Code</TableHead>
    //         <TableHead className='border-r text-center'>
    //           Alternative Name
    //         </TableHead>
    //         <TableHead className='text-center'>Assessment Score</TableHead>
    //       </TableRow>
    //     </TableHeader>
    //     <TableBody>
    //       {data.alternatives?.map((alternative, index) => (
    //         <TableRow key={alternative.id} className='text-center'>
    //           <TableCell className='border-r'>A{index + 1}</TableCell>
    //           <TableCell className='border-r'>{alternative.name}</TableCell>
    //           <TableCell>
    //             {parseFloat(assessmentScore[alternative.id]).toFixed(3)}
    //           </TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </div>
  );
}
