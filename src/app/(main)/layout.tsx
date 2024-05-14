'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ClerkLoaded, OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import { DesktopNav } from '~/components/desktop-nav';
import { MobileNav } from '~/components/mobile-nav';
import { trpc } from '~/lib/utils';

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const utils = trpc.useUtils();
  const router = useRouter();

  function handleSwitchOrganization() {
    utils.invalidate();
    router.refresh();
    return '';
  }

  return (
    <ClerkLoaded>
      <header className='container flex h-[70px] items-center justify-between border-b'>
        <MobileNav />
        <div className='inline-flex items-center'>
          <div className='rounded-md border px-1 text-center hover:bg-accent'>
            <OrganizationSwitcher
              appearance={{
                elements: {
                  organizationSwitcherTrigger: {
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  },
                },
              }}
              afterSelectOrganizationUrl={handleSwitchOrganization}
              afterSelectPersonalUrl={handleSwitchOrganization}
            />
          </div>
          <DesktopNav />
        </div>
        <div className='inline-flex items-center gap-x-8'>
          <Link
            href='/docs/criterias'
            target='_blank'
            className='hidden text-sm text-muted-foreground hover:text-primary md:block'
          >
            Panduan
          </Link>
          <UserButton />
        </div>
      </header>
      <main className='container my-6'>{children}</main>
    </ClerkLoaded>
  );
}
