import { Inter } from 'next/font/google';

export const siteConfig = {
  name: 'Sistem Pendukung Keputusan CODAS',
  description: 'Sistem Pendukung Keputusan metode CODAS',
  faviconUrl: '/favicon.ico',
};

export type SiteConfig = typeof siteConfig;

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});
