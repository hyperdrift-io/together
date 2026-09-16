import type { PageProps } from 'waku/router';

import { CheckEmailPage } from '../../components/check-email-page';

export default function FrenchCheckEmailPage({ query }: PageProps<'/fr/check-email'>) {
  return <CheckEmailPage query={query} locale="fr" />;
}

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
