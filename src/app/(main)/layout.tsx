import Link from 'next/link';
import { HomeIcon } from '@radix-ui/react-icons';
import { Button } from '~/components/ui/button';
import { MobileNav } from '~/components/layouts/mobile-nav';
import { DesktopNav } from '~/components/layouts/desktop-nav';
import { ModeToggle } from '~/components/common/mode-toggle';
import { GitHubLinkButton } from '~/components/common/github-link-button';

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <section>
      <header className='container flex items-center justify-between border-b py-4'>
        <DesktopNav />
        <MobileNav />
        <div className='space-x-2'>
          <Link href='/'>
            <Button variant='outline' size='icon'>
              <HomeIcon className='h-4 w-4' />
            </Button>
          </Link>
          <GitHubLinkButton />
          <ModeToggle />
        </div>
      </header>
      <main className='container mt-4'>{children}</main>
    </section>
  );
}
