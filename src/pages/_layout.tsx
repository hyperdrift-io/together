import '../styles.css';

import type { ReactNode } from 'react';
import { Analytics } from '../components/analytics';

type RootLayoutProps = { children: ReactNode };

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <meta
        name="description"
        content="Together helps people already in the same place discover when the feeling is mutual—and meet face to face."
      />
      <meta name="theme-color" content="#061521" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Together" />
      <meta property="og:title" content="Look up. They’re here." />
      <meta
        property="og:description"
        content="A face-to-face connection with someone who is already there."
      />
      <meta
        property="og:image"
        content="https://together.hyperdrift.io/images/together-passing-glance-og.jpg"
      />
      <meta property="og:image:width" content="1536" />
      <meta property="og:image:height" content="806" />
      <meta property="og:url" content="https://together.hyperdrift.io/" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Look up. They’re here." />
      <meta
        name="twitter:description"
        content="Together makes a mutual hello easier when you’re already in the same place."
      />
      <meta
        name="twitter:image"
        content="https://together.hyperdrift.io/images/together-passing-glance-og.jpg"
      />
      <link rel="canonical" href="https://together.hyperdrift.io/" />
      <link rel="icon" type="image/svg+xml" href="/images/icon.svg" />
      <link rel="manifest" href="/manifest.webmanifest" />
      <Analytics />
      {children}
    </>
  );
}

export const getConfig = async () => {
  return { render: 'static' } as const;
};
