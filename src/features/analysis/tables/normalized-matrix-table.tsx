'use client';

import { cn } from 'src/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'src/components/ui/table';
import { useCodas } from '../use-codas';

export function NormalizedMatrixTable() {
  const { data, normalizedMatrix } = useCodas();

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='border-r text-center'>Kode</TableHead>
            <TableHead className='border-r text-center'>
              Nama Alternatif
            </TableHead>
            {data.criterias?.map((criteria, index) => (
              <TableHead
                key={criteria.id}
                className={cn(
                  'border-r text-center last:border-r-0',
                  criteria.type === 'COST' && 'text-destructive',
                )}
              >
                C{index + 1}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.alternatives?.map((alternative, index) => (
            <TableRow key={alternative.id} className='text-center'>
              <TableCell className='border-r'>A{index + 1}</TableCell>
              <TableCell className='border-r'>{alternative.name}</TableCell>
              {data.criterias?.map((criteria) => (
                <TableCell
                  key={criteria.id}
                  className='border-r last:border-r-0'
                >
                  {parseFloat(
                    normalizedMatrix[criteria.id][alternative.id],
                  ).toFixed(3)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
