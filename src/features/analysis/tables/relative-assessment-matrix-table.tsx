'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { useCodas } from '../use-codas';

export function RelativeAssessmentMatrixTable() {
  const { data, relativeAssessmentMatrix } = useCodas();

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='border-r text-center'></TableHead>
            {data.alternatives?.map((alternative, index) => (
              <TableHead
                key={alternative.id}
                className='border-r text-center last:border-r-0'
              >
                A{index + 1}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.alternatives?.map((alternative1, index) => (
            <TableRow key={alternative1.id}>
              <TableCell className='border-r text-center text-muted-foreground'>
                A{index + 1}
              </TableCell>
              {data.alternatives?.map((alternative2) => (
                <TableCell
                  key={alternative2.id}
                  className='border-r text-center last:border-r-0'
                >
                  {parseFloat(
                    relativeAssessmentMatrix[alternative1.id][alternative2.id],
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
