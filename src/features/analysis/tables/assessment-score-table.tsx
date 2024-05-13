'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'src/components/ui/table';
import { useCodas } from '../use-codas';

export function AssessmentScoreTable() {
  const { data, assessmentScore } = useCodas();

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='border-r text-center'>Kode</TableHead>
            <TableHead className='border-r text-center'>
              Alternative Name
            </TableHead>
            <TableHead className='text-center'>Nilai Assessment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.alternatives?.map((alternative, index) => (
            <TableRow key={alternative.id} className='text-center'>
              <TableCell className='border-r'>A{index + 1}</TableCell>
              <TableCell className='border-r'>{alternative.name}</TableCell>
              <TableCell>
                {parseFloat(assessmentScore[alternative.id]).toFixed(3)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
