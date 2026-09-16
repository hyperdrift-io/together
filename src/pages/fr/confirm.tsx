import type { PageProps } from 'waku/router';

import { ConfirmPage } from '../../components/confirm-page';

export default function FrenchConfirmPage({ query }: PageProps<'/fr/confirm'>) {
  return <ConfirmPage query={query} locale="fr" />;
}

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
