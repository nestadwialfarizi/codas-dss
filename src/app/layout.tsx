import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import '~/styles/globals.css';
import { siteConfig } from '~/lib/config';
import { TRPCProvider } from '~/components/trpc-provider';
import { Toaster } from '~/components/ui/sonner';

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
            <Toaster
              position='bottom-center'
              style={{ fontFamily: inter.style.fontFamily }}
            />
          </TRPCProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
