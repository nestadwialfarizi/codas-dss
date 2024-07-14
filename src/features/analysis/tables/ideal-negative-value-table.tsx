'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { cn } from '~/lib/utils';
import { useCodas } from '../use-codas';

export function IdealNegativeValueTable() {
  const { data, weightedNormalizedMatrix } = useCodas();

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
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
          <TableRow className='text-center'>
            {data.criterias?.map((criteria) => (
              <TableCell key={criteria.id} className='border-r last:border-r-0'>
                {parseFloat(
                  Math.min(
                    ...Object.values(
                      weightedNormalizedMatrix[criteria.id] as number,
                    ),
                  ).toFixed(3),
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
