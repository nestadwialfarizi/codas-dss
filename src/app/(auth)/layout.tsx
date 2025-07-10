type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className='flex flex-row'>
      <div className='container hidden h-screen flex-col items-center justify-center ps-16 text-center lg:flex lg:basis-3/4'>
        <h1 className='text-5xl font-bold tracking-tight'>
          Sistem Pendukung Keputusan Pemilihan Smartphone Gaming Mid-range Terbaik
        </h1>
        <p className='text-muted-foreground'>
          Sistem Pendukung Keputusan berbasis website dengan menerapkan metode
          analisis Combinative Distance-based Assessment (CODAS) dalam
          menentukan rekomendasi terbaik Smartphone Gaming Mid-range.
        </p>
      </div>
      <div className='flex h-screen basis-full items-center justify-center lg:basis-1/2'>
        {children}
      </div>
    </main>
  );
}
