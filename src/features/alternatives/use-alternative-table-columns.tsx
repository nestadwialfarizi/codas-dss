'use client';

import type { Alternative } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';
import { trpc } from '~/lib/utils';
import { Badge } from '~/components/ui/badge';
import { AlternativeTableRowActions } from './alternative-table-row-actions';
import { useIsAdmin } from '../auth/use-is-admin';

export function useAlternativeTableColumns() {
  const { data: criterias, isLoading: isLoadingCriterias } =
    trpc.criteria.list.useQuery();
  const { data: evaluations, isLoading: isLoadingEvaluations } =
    trpc.evaluation.list.useQuery();

  const isAdmin = useIsAdmin();
  const isLoading = isLoadingCriterias || isLoadingEvaluations;

  const columns: ColumnDef<Alternative>[] = [
    {
      id: 'code',
      header: () => <div className='ml-1'>Kode</div>,
      cell: ({ row }) => <div className='ml-1'>A{row.index + 1}</div>,
    },
    {
      accessorKey: 'name',
      header: 'Nama',
    },
    {
      accessorKey: 'id',
      header: () => <div className='-ml-24 text-center'>Penilaian</div>,
      cell: ({ cell }) => {
        const alternativeId = cell.getValue() as string;
        const filteredEvaluations = evaluations?.filter(
          (evaluation) => evaluation.alternativeId === alternativeId,
        );

        return (
          <div className='text-center'>
            <Badge
              variant={
                filteredEvaluations?.length === criterias?.length
                  ? 'default'
                  : 'destructive'
              }
            >
              {filteredEvaluations?.length} penilaian dari {criterias?.length}{' '}
              kriteria
            </Badge>
          </div>
        );
      },
    },
    {
      id: 'actions',
      ...(isAdmin && {
        enableHiding: false,
        header: () => <div className='mr-1 text-right'>(Opsi)</div>,
        cell: ({ row }) => (
          <div className='mr-2 text-right'>
            <AlternativeTableRowActions alternative={row.original} />
          </div>
        ),
      }),
    },
  ];

  return {
    columns,
    isLoading,
  };
}
