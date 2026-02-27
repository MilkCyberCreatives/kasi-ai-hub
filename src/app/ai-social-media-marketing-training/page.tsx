// src/app/ai-social-media-marketing-training/page.tsx
import ServiceDetailPage from '@/components/ServiceDetailPage';
import { SERVICES_BY_KEY } from '@/data/services';

export const metadata = {
  title: 'Social Media Marketing',
  description: 'Plan, generate, and schedule 30 posts in 3 hours with AI templates.',
};

export default function AISocialMediaMarketingTrainingPage() {
  return <ServiceDetailPage service={SERVICES_BY_KEY['ai-social-media-marketing-training']} />;
}

