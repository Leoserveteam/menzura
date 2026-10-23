import LegalPage from '../components/LegalPage';
import { privacy } from '../legal';
export const metadata = { title: 'Privacy · Menzura', robots: { index: false } };
export default function Page() { return <LegalPage title="Privacy" blocks={privacy} />; }
