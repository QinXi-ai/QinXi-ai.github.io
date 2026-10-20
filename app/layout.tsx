import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Xi Qin — Research & Open Source',
  description:
    'Learning theory, reproducible AI evaluation, and open-source engineering by Xi Qin at Wuhan University.',
  metadataBase: new URL('https://qinxi-ai.github.io'),
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    title: 'Xi Qin — Research & Open Source',
    description:
      'From first principles to working code. Learning theory, AI evaluation, and open-source engineering.',
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
      'From first principles to working code. Learning theory, AI evaluation, and open-source engineering.',
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
