import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { TRPCProvider } from '~/components/trpc-provider';
import { Toaster } from '~/components/ui/sonner';
import { siteConfig } from '~/lib/config';
import '~/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

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
    <ClerkProvider>
      <html lang='en'>
        <body className={`font-sans antialiased ${inter.variable}`}>
          <TRPCProvider>
            {children}
            <Toaster style={{ fontFamily: inter.style.fontFamily }} />
          </TRPCProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
