import Link from 'next/link';
import { ClerkLoaded, OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import { DesktopNav } from 'src/components/desktop-nav';
import { MobileNav } from 'src/components/mobile-nav';

export const metadata = {
  title: 'Dashboard',
};

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
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
                    '&:hover': { backgroundColor: 'transparent' },
                  },
                },
              }}
              afterSelectOrganizationUrl='/overview'
              afterSelectPersonalUrl='/overview'
            />
          </div>
          <DesktopNav />
        </div>
        <div className='inline-flex items-center gap-x-8'>
          <Link
            href='/docs'
            className='text-sm text-muted-foreground hover:text-primary'
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
