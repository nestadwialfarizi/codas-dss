'use client';

import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import { DesktopNav } from './desktop-nav';
import { MobileNav } from './mobile-nav';

export function Header() {
  return (
    <header className='container flex h-[70px] items-center justify-between border-b'>
      <MobileNav />
      <div className='inline-flex items-center'>
        <div className='rounded-md border px-1 text-center hover:bg-accent'>
          <OrganizationSwitcher
            appearance={{
              elements: {
                organizationSwitcherTrigger: {
                  '&:hover': { backgroundColor: 'transparent' },
                },
              },
            }}
          />
        </div>
        <DesktopNav />
      </div>
      <UserButton />
    </header>
  );
}
