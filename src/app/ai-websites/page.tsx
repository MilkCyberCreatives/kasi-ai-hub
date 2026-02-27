// src/app/ai-websites/page.tsx
import ServiceDetailPage from '@/components/ServiceDetailPage';
import { SERVICES_BY_KEY } from '@/data/services';

export const metadata = {
  title: 'Website Development',
  description: 'Fast, conversion-focused sites with AI content workflows built-in.',
};

export default function AIWebsitesPage() {
  return <ServiceDetailPage service={SERVICES_BY_KEY['ai-websites']} />;
}

