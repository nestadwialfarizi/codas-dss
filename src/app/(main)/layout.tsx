'use client';

import { ClerkLoaded, OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import { ViewVerticalIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { cn, trpc } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

function CustomizedOrganizationSwitcher() {
  const utils = trpc.useUtils();
  const router = useRouter();

  function handleSwitchOrganization() {
    utils.invalidate();
    router.refresh();
    return '/criterias';
  }

  return (
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
  );
}

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();

  const navItems = useMemo(
    () => [
      { name: 'Kriteria', href: '/criterias' },
      { name: 'Skala Penilaian', href: '/scoring-scales' },
      { name: 'Alternatif', href: '/alternatives' },
      { name: 'Analisis', href: '/analysis' },
    ],
    [],
  );

  return (
    <ClerkLoaded>
      <header className='container flex h-16 items-center justify-between border-b'>
        <nav className='lg:hidden'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='icon'>
                <ViewVerticalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start'>
              {navItems.map((nav, index) => (
                <DropdownMenuItem key={index} asChild>
                  <Link href={nav.href}>{nav.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <div className='inline-flex items-center'>
          <CustomizedOrganizationSwitcher />
          <nav className='ml-10 hidden space-x-4 lg:inline'>
            {navItems.map((nav, index) => (
              <Link
                key={index}
                href={nav.href}
                className={cn(
                  'text-sm text-muted-foreground hover:text-primary',
                  pathname?.startsWith(nav.href) && 'text-primary',
                )}
              >
                {nav.name}
              </Link>
            ))}
          </nav>
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
