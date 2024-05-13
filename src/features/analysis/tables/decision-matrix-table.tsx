'use client';

import { cn } from '~/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { useCodas } from '../use-codas';

export function DecisionMatrixTable() {
  const { data, decisionMatrix } = useCodas();

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
            <TableRow key={alternative.id}>
              <TableCell className='border-r text-center'>
                A{index + 1}
              </TableCell>
              <TableCell className='border-r text-center'>
                {alternative.name}
              </TableCell>
              {data.criterias?.map((criteria) => (
                <TableCell
                  key={criteria.id}
                  className='border-r text-center last:border-r-0'
                >
                  {decisionMatrix[criteria.id][alternative.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow>
            <TableCell className='h-8'></TableCell>
          </TableRow>
          <TableRow className='text-center'>
            <TableCell>
              Max / <span className='text-destructive'>Min</span>
            </TableCell>
            <TableCell className='border-r'></TableCell>
            {data.criterias?.map((criteria) => (
              <TableCell
                key={criteria.id}
                className={cn(
                  'border-r last:border-r-0',
                  criteria.type === 'COST' && 'text-destructive',
                )}
              >
                {criteria.type === 'COST'
                  ? Math.min(
                      ...Object.values(decisionMatrix[criteria.id] as number),
                    )
                  : Math.max(
                      ...Object.values(decisionMatrix[criteria.id] as number),
                    )}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
