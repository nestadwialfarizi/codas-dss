import { ArrowRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { GitHubLinkButton } from '~/components/common/github-link-button';
import { ModeToggle } from '~/components/common/mode-toggle';
import { Button, buttonVariants } from '~/components/ui/button';

export const metadata = {
  title: 'Welcome',
};

export default function RootPage() {
  return (
    <section className='container'>
      <header className='flex items-center justify-between py-4'>
        <div className='ml-auto space-x-2'>
          <GitHubLinkButton />
          <ModeToggle />
        </div>
      </header>
      <div className='mt-48 flex flex-col items-center text-center'>
        <h1 className='text-3xl font-bold'>CODAS Decision Support System</h1>
        <p className='max-w-4xl text-muted-foreground'>
          An open source web-based decision support system that applies the
          Combinative Distance-based Assessment (CODAS) method to solve problems
          in determining the best choice based on certain criteria.
        </p>
        <div className='mt-6 space-x-4'>
          <Link href='/criterias'>
            <Button variant='ghost'>
              Get Started
              <ArrowRightIcon className='ml-2 h-4 w-4' />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
