import { Header } from './header';

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
      <Header />
      <main className='container my-6'>{children}</main>
    </div>
  );
}
