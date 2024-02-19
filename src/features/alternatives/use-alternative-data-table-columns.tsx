import { Alternative, Evaluation } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { cn } from '~/lib/utils';
import { trpc } from '~/lib/trpc';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip';
import { SortableButton } from '~/components/common/sortable-button';
import { AlternativeDataTableRowActions } from './alternative-data-table-row-actions';

export function useAlternativeDataTableColumns() {
  const { data: criterias } = trpc.criteria.get.useQuery();
  const { data: evaluations } = trpc.evaluation.get.useQuery();
  const { data: scoringScales } = trpc.scoringScale.get.useQuery();

  const columns: ColumnDef<Alternative>[] = [
    {
      id: 'alternatives',
      header: () => <div className='text-center'>Alternatives</div>,
      columns: [
        {
          id: 'code',
          header: () => <div className='text-center'>Code</div>,
          cell: ({ row }) => (
            <div className='text-center'>{`A${row.index + 1}`}</div>
          ),
        },
        {
          accessorKey: 'name',
          header: ({ column }) => (
            <div className='text-center'>
              <SortableButton column={column}>Name</SortableButton>
            </div>
          ),
          cell: ({ cell }) => (
            <div className='text-center'>{cell.getValue()}</div>
          ),
        },
      ],
    },
    {
      id: 'evaluations-by-criteria',
      header: () => <div className='text-center'>Criterias</div>,
      columns: criterias?.map((criteria, index) => ({
        id: `C${index + 1}`,
        header: () => (
          <div className='text-center'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  className={cn(
                    'hover:text-primary',
                    criteria.type === 'COST' && 'text-destructive',
                  )}
                >{`C${index + 1}`}</TooltipTrigger>
                <TooltipContent
                  className={cn(criteria.type === 'COST' && 'bg-destructive')}
                >
                  {criteria.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ),
        cell: ({ row }) => {
          const alternative = row.original;

          const evaluation = evaluations
            ?.filter(
              (evaluation) => evaluation.alternativeId === alternative.id,
            )
            .find((evaluation) => evaluation.criteriaId === criteria.id);

          const scoringScale = scoringScales?.find(
            (scoringScale) => scoringScale.id === evaluation?.scoringScaleId,
          );

          return <div className={cn('text-center')}>{scoringScale?.value}</div>;
        },
      })),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className='text-center'>
          <AlternativeDataTableRowActions alternative={row.original} />
        </div>
      ),
    },
  ];

  return columns;
}
