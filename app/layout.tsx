import type { Metadata, Viewport } from 'next';
import {
  Cormorant_Garamond,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display-face',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ui-face',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono-face',
  display: 'swap',
});

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
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
