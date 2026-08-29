import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Xi Qin — Research & Open Source',
  description:
    'Research systems, claim-relative evaluation, and open-source engineering by Xi Qin.',
  metadataBase: new URL('https://qinxi-ai.github.io'),
  openGraph: {
    title: 'Xi Qin — Research & Open Source',
    description:
      'Research systems that turn ambitious AI claims into reproducible evidence.',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Xi Qin — Research & Open Source',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xi Qin — Research & Open Source',
    description:
      'Research systems that turn ambitious AI claims into reproducible evidence.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
