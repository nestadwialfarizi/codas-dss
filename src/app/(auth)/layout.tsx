type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="container flex min-h-screen items-center justify-center">
      {children}
    </main>
  );
}
