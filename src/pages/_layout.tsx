import '../styles.css';

import type { ReactNode } from 'react';

type RootLayoutProps = { children: ReactNode };

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <meta
        name="description"
        content="Together turns a meeting request into a confirmed face-to-face meeting in London."
      />
      <meta name="theme-color" content="#ff4f00" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Together" />
      <meta property="og:title" content="A meeting. Not a match." />
      <meta
        property="og:description"
        content="Skip the matching, messaging, and waiting. Put a real meeting in the calendar."
      />
      <meta
        property="og:image"
        content="https://together.hyperdrift.io/images/og-together.png"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content="https://together.hyperdrift.io/" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="A meeting. Not a match." />
      <meta
        name="twitter:description"
        content="A face-to-face meeting service for London."
      />
      <meta
        name="twitter:image"
        content="https://together.hyperdrift.io/images/og-together.png"
      />
      <link rel="canonical" href="https://together.hyperdrift.io/" />
      <link rel="icon" type="image/svg+xml" href="/images/icon.svg" />
      <link rel="manifest" href="/manifest.webmanifest" />
      {children}
    </>
  );
}

export const getConfig = async () => {
  return { render: 'static' } as const;
};
