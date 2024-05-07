export const siteConfig = {
  name: 'Sistem Pendukung Keputusan CODAS',
  description: 'Sistem Pendukung Keputusan metode CODAS',
  faviconUrl: '/favicon.ico',
};

export type SiteConfig = typeof siteConfig;

export const navItems = [
  { name: 'Tinjauan', href: '/overview' },
  { name: 'Kriteria', href: '/criterias' },
  { name: 'Skala Penilaian', href: '/scoring-scales' },
];

export type NavItems = typeof navItems;
