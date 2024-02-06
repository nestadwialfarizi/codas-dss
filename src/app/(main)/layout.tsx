import { DesktopNav } from 'src/components/desktop-nav';
import { MobileNav } from 'src/components/mobile-nav';
import { ModeToggle } from 'src/components/mode-toggle';

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
