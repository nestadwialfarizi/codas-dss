type PageHeaderProps = {
  heading: string;
  description?: string;
  children?: React.ReactNode;
};

export function PageHeader({
  heading,
  description,
  children,
}: PageHeaderProps) {
  return (
    <div className='mb-6 mt-6 flex flex-wrap items-center justify-between gap-2'>
      <div>
        <h1 className='text-2xl font-semibold'>{heading}</h1>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </div>
      {children}
    </div>
  );
}
