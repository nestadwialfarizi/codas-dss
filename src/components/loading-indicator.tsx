import { ReloadIcon } from '@radix-ui/react-icons';

export function LoadingIndicator({
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <ReloadIcon className='h-4 w-4' />
      <span className='sr-only'>Loading...</span>
    </div>
  );
}
