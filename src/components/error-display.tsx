'use client';

import type { TRPCError } from '@trpc/server';

type ErrorDisplayProps = React.HTMLAttributes<HTMLDivElement> & {
  error: TRPCError | unknown;
};

export function ErrorDisplay({ error, ...props }: ErrorDisplayProps) {
  const trpcError = error as TRPCError;

  return (
    <div {...props}>
      <h1 className='text-sm font-semibold'>{trpcError?.code}</h1>
      <p className='text-sm text-muted-foreground'>{trpcError?.message}</p>
    </div>
  );
}
