import type { PageProps } from 'waku/router';

import { LeavePage } from '../components/leave-page';

export default function EnglishLeavePage({ query }: PageProps<'/leave'>) {
  return <LeavePage query={query} locale="en" />;
}

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
