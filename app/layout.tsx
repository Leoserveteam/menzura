import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400'], style: ['normal', 'italic'], variable: '--font-cormorant', display: 'swap' });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-inter', display: 'swap' });

const description = 'A private house of 500 members. Your wardrobe made to your measure every month, and a welcome among peers wherever you go. By invitation only.';

export const metadata: Metadata = {
  metadataBase: new URL('https://menzura.co'),
  title: 'Menzura · One house. Every room.',
  description,
  openGraph: { title: 'Menzura · One house. Every room.', description, images: ['/images/menzura-share.png'], type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Menzura · One house. Every room.', description, images: ['/images/menzura-share.png'] },
  icons: { icon: [{ url: '/images/menzura-icon-32.png', sizes: '32x32' }], apple: '/images/menzura-icon-180.png' },
};

export const viewport: Viewport = { themeColor: '#111111', width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        {children}
        {/* Vercel Web Analytics: no cookies, no personal data */}
        <Analytics />
      </body>
    </html>
  );
}
