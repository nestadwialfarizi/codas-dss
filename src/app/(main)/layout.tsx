import { MobileNav } from '~/components/layouts/mobile-nav';
import { DesktopNav } from '~/components/layouts/desktop-nav';
import { ModeToggle } from '~/components/common/mode-toggle';

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <header className='container flex items-center justify-between border-b py-4'>
        <DesktopNav />
        <MobileNav />
        <div className='space-x-2'>
          <ModeToggle />
        </div>
      </header>
      <main className='container mt-4'>{children}</main>
    </>
  );
}
