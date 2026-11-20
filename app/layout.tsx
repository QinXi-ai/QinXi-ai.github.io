import type { Metadata, Viewport } from 'next';
import styles from './globals.css?inline';

export const viewport: Viewport = {
  themeColor: '#091113',
};

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
      <head>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <link
          rel="preload"
          href="/fonts/cormorant-garamond.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/cormorant-garamond-italic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
