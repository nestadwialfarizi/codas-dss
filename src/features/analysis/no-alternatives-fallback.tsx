import { AddButton } from '~/components/add-button';

export function NoAlternativesFallback() {
  return (
    <div className='mt-44 flex flex-col items-center justify-center lg:mt-52'>
      <div>
        <h1 className='text-center text-3xl font-bold tracking-tight'>
          Oops, anda belum memiliki data alternatif!
        </h1>
        <p className='max-w-5xl text-center'>
          Analisis perhitungan melibatkan data alternatif beserta penilaiannya,
          minimal anda memiliki 3 (tiga) atau lebih data alternatif untuk
          menganalisis hasil.
        </p>
      </div>
      <div className='mt-6 flex flex-col gap-3 md:flex-row'>
        <AddButton href='/alternatives/create'>Buat Alternatif</AddButton>
      </div>
    </div>
  );
}
