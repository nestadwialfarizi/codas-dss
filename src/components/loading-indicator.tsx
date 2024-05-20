import { ReloadIcon } from '@radix-ui/react-icons';
import type { IconProps } from '@radix-ui/react-icons/dist/types';
import { cn } from '~/lib/utils';

export function LoadingIndicator({ className, ...props }: IconProps) {
  return (
    <ReloadIcon
      className={cn('mx-auto my-auto animate-spin', className)}
      {...props}
    />
  );
}
