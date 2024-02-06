'use client';

import type { TRPCError } from '@trpc/server';

type ErrorDisplayProps = React.HTMLAttributes<HTMLDivElement> & {
  error: TRPCError;
};

export function ErrorDisplay({ error, ...props }: ErrorDisplayProps) {
  return (
    <div {...props}>
      <h1 className='text-sm font-semibold'>{error?.code}</h1>
      <p className='text-sm text-muted-foreground'>{error?.message}</p>
    </div>
  );
}
