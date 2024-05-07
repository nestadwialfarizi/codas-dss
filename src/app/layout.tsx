import type { Metadata } from 'next';
import { siteConfig } from '~/lib/config';
import { inter } from '~/lib/fonts';
import '~/styles/globals.css';

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.name}`,
    default: siteConfig.name,
  },
  description: siteConfig.description,
  icons: [{ rel: 'icon', url: siteConfig.faviconUrl }],
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <body className={`font-sans antialiased ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
