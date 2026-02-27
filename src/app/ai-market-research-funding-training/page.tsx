// src/app/ai-market-research-funding-training/page.tsx
import ServiceDetailPage from '@/components/ServiceDetailPage';
import { SERVICES_BY_KEY } from '@/data/services';

export const metadata = {
  title: 'Market Research & Funding',
  description: 'Use AI to research markets, draft proposals, and prep funding decks.',
};

export default function AIMarketResearchFundingTrainingPage() {
  return <ServiceDetailPage service={SERVICES_BY_KEY['ai-market-research-funding-training']} />;
}

