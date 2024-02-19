import { type Column } from '@tanstack/react-table';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Button, type ButtonProps } from '../ui/button';

type SortableButtonProps<TData, TValue> = ButtonProps & {
  column: Column<TData, TValue>;
};

export function SortableButton<TData, TValue>({
  column,
  children,
  ...props
}: SortableButtonProps<TData, TValue>) {
  return (
    <Button
      variant='ghost'
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      {...props}
    >
      {children}
      <CaretSortIcon className='ml-2 h-4 w-4' />
    </Button>
  );
}
