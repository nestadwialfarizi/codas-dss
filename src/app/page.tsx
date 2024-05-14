import Link from 'next/link';
import { SignInButton } from '@clerk/nextjs';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { Button } from '~/components/ui/button';

export default function RootPage() {
  return (
    <main className='container flex min-h-screen flex-col items-center justify-center'>
      <section className='flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center justify-center text-center'>
          <h1 className='text-4xl font-bold tracking-tight'>
            Temukan Rekomendasi Digital Multi-Effects terbaik anda
          </h1>
          <p className='max-w-4xl text-center text-muted-foreground'>
            Sistem Pendukung Keputusan berbasis website dengan menerapkan metode
            analisis Combinative Distance-based Assessment (CODAS) dalam
            menentukan rekomendasi terbaik alat audio Digital Multi-Effects.
          </p>
        </div>
        <div className='mt-3 flex flex-wrap items-center justify-center gap-3'>
          <SignInButton>
            <Button>
              Mulai sekarang
              <ArrowRightIcon className='ml-2' />
            </Button>
          </SignInButton>
          <Link target='_blank' href='/docs/criterias' className='text-sm'>
            Lihat panduan
          </Link>
        </div>
      </section>
    </main>
  );
}
