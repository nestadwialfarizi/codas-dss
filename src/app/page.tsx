import Link from 'next/link';

import { buttonVariants } from '~/components/ui/button';

export default function RootPage() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold'>CODAS Decision Support System</h1>
        <p className='max-w-3xl text-muted-foreground'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere
          delectus placeat laborum ipsum animi, veritatis debitis natus alias
          itaque aperiam.
        </p>
        <div className='mt-4 space-x-4'>
          <Link href='/overview' className={buttonVariants({ size: 'lg' })}>
            Get Started
          </Link>
          <Link
            href='#'
            className={buttonVariants({ size: 'lg', variant: 'outline' })}
          >
            GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}
