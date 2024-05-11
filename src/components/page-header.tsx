import { cn } from 'src/lib/utils';
import { Button, type ButtonProps } from 'src/components/ui/button';

export function PageHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'mb-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-2',
        className,
      )}
      {...props}
    />
  );
}

export function PageHeaderContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex flex-col space-y-0.5', className)} {...props} />
  );
}

export function PageHeaderTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn('text-3xl font-bold tracking-tight', className)}
      {...props}
    />
  );
}

export function PageHeaderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-sm text-muted-foreground', className)} {...props} />
  );
}

export function PageHeaderAction({ ...props }: ButtonProps) {
  return <Button {...props} />;
}
