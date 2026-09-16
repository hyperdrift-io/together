import { HomePage } from '../components/home-page';

export default function EnglishHomePage() {
  return <HomePage locale="en" />;
}

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
