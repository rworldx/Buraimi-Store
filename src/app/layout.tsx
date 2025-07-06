// app/layout.tsx

import { Playfair_Display, PT_Sans } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

// Load fonts with next/font/google, create CSS variables for them
const playfair = Playfair_Display({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-playfair',
});

const ptsans = PT_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-ptsans',
});

export const metadata = {
  title: 'Buraimi Store - Exquisite Goods from the Peninsula',
  description:
    'Discover authentic, high-quality products from Buraimi. Traditional crafts, textiles, spices, and more.',
  keywords: ['Buraimi', 'Oman', 'e-commerce', 'traditional crafts', 'spices', 'textiles'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${ptsans.variable}`}
    >
      <body className="font-body antialiased">
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}