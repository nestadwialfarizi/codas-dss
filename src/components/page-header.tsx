type PageHeaderProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function PageHeader({
  title,
  description,
  children,
}: Partial<PageHeaderProps>) {
  return (
    <div className='mb-6 flex flex-wrap items-center justify-between gap-y-2'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>{title}</h1>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </div>
      <div className='ml-auto'>{children}</div>
    </div>
  );
}
