import { redirect } from 'next/navigation';
import { routing } from '@/i18n';

// this page only renders when the app is built statically
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
