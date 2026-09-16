import type { PageProps } from 'waku/router';

import { CheckEmailPage } from '../components/check-email-page';

export default function EnglishCheckEmailPage({ query }: PageProps<'/check-email'>) {
  return <CheckEmailPage query={query} locale="en" />;
}

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
