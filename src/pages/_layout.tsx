import '../styles.css';

import type { ReactNode } from 'react';
import { Analytics } from '../components/analytics';

type RootLayoutProps = { children: ReactNode };

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <meta name="theme-color" content="#061521" />
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
