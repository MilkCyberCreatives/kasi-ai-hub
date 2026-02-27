// src/app/ai-business-automation-training/page.tsx
import ServiceDetailPage from '@/components/ServiceDetailPage';
import { SERVICES_BY_KEY } from '@/data/services';

export const metadata = {
  title: 'Business Automation',
  description: 'Automate intake, replies, and weekly reports. Checklists + approvals.',
};

export default function AIBusinessAutomationTrainingPage() {
  return <ServiceDetailPage service={SERVICES_BY_KEY['ai-business-automation-training']} />;
}

