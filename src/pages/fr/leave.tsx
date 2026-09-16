import type { PageProps } from 'waku/router';

import { LeavePage } from '../../components/leave-page';

export default function FrenchLeavePage({ query }: PageProps<'/fr/leave'>) {
  return <LeavePage query={query} locale="fr" />;
}

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
