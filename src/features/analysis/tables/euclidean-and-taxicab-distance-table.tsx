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

export function EuclideanAndTaxicabDistanceTable() {
  const { data, euclidean, taxicab } = useCodas();

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='border-r text-center'>Kode</TableHead>
            <TableHead className='border-r text-center'>
              Nama Alternatif
            </TableHead>
            <TableHead className='border-r text-center'>Euclidean</TableHead>
            <TableHead className='text-center'>Taxicab</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.alternatives?.map((alternative, index) => (
            <TableRow key={alternative.id} className='text-center'>
              <TableCell className='border-r'>A{index + 1}</TableCell>
              <TableCell className='border-r'>{alternative.name}</TableCell>
              <TableCell className='border-r'>
                {parseFloat(euclidean[alternative.id]).toFixed(3)}
              </TableCell>
              <TableCell>
                {parseFloat(taxicab[alternative.id]).toFixed(3)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
