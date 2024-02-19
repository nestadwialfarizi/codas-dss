'use client';

import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from '~/components/ui/button';

export function PlusButton({
  children,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <Button variant='outline' {...props}>
      <PlusIcon className='mr-2 h-4 w-4' />
      {children}
      <span className='sr-only'>Add</span>
    </Button>
  );
}
