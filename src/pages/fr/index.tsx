import { HomePage } from '../../components/home-page';

export default function FrenchHomePage() {
  return <HomePage locale="fr" />;
}

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
