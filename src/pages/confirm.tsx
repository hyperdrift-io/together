import type { PageProps } from 'waku/router';

import { ConfirmPage } from '../components/confirm-page';

export default function EnglishConfirmPage({ query }: PageProps<'/confirm'>) {
  return <ConfirmPage query={query} locale="en" />;
}

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
