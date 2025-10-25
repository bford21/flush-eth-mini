import type { Metadata } from 'next';
import { Bangers } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const bangers = Bangers({
  weight: "400",
  variable: "--font-bangers",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Flush ETH Mini 🚽',
  description: 'A Farcaster Mini App - Flush ETH down the proverbial toilet',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>🚽</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bangers.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

