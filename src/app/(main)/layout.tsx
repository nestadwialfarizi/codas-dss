import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import { DesktopNav } from '~/components/desktop-nav';
import { MobileNav } from '~/components/mobile-nav';

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
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
        <UserButton />
      </header>
      <main className='container my-6'>{children}</main>
    </div>
  );
}
