import LegalPage from '../components/LegalPage';
import { terms } from '../legal';
export const metadata = { title: 'Terms of membership · Menzura', robots: { index: false } };
export default function Page() { return <LegalPage title="Terms of membership" blocks={terms} />; }
