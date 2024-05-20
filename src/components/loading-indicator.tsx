import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import type { IconProps } from '@radix-ui/react-icons/dist/types';
import { cn } from '~/lib/utils';

export function LoadingIndicator({ className, ...props }: IconProps) {
  return (
    <DotsHorizontalIcon
      className={cn('mx-auto h-5 w-5 animate-bounce', className)}
      {...props}
    />
  );
}
