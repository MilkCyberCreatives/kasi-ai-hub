export type PlatformFeature = {
  href: string;
  title: string;
  summary: string;
  metricLabel: string;
  metricValue: string;
};

export const PLATFORM_FEATURES: PlatformFeature[] = [
  {
    href: '/platform/dashboard',
    title: 'Dashboard',
    summary: 'Live command center for sessions, automations, leads, and growth metrics.',
    metricLabel: 'Ops Coverage',
    metricValue: '92%',
  },
  {
    href: '/platform/onboarding',
    title: 'Onboarding Quiz',
    summary: 'Smart setup flow that matches each user to the fastest AI adoption path.',
    metricLabel: 'Completion',
    metricValue: '87%',
  },
  {
    href: '/platform/booking-payments',
    title: 'Booking & Payments',
    summary: 'Unified booking, intake, and payment readiness workflow with automation hooks.',
    metricLabel: 'Flow Speed',
    metricValue: '2.1m',
  },
  {
    href: '/platform/ai-copilot',
    title: 'AI Copilot',
    summary: 'Business copilot that drafts plans, prompts, and execution checklists in seconds.',
    metricLabel: 'Response Time',
    metricValue: '<2s',
  },
  {
    href: '/platform/downloads',
    title: 'Download Center',
    summary: 'Structured library of templates, playbooks, and operational kits.',
    metricLabel: 'Assets',
    metricValue: '50+',
  },
  {
    href: '/platform/workspace',
    title: 'Community Workspace',
    summary: 'Team and community collaboration area for updates, wins, and shared support.',
    metricLabel: 'Active Rooms',
    metricValue: '12',
  },
  {
    href: '/platform/team',
    title: 'Team Accounts',
    summary: 'Add teammates, set permissions, and assign responsibilities by workflow.',
    metricLabel: 'Seat Setup',
    metricValue: '1-click',
  },
  {
    href: '/platform/certificates',
    title: 'Certificates & Badges',
    summary: 'Generate proof-of-completion certificates and shareable achievement badges.',
    metricLabel: 'Issued',
    metricValue: '300+',
  },
  {
    href: '/platform/crm-automation',
    title: 'CRM & WhatsApp',
    summary: 'Automated lead triage, response templates, and follow-up sequences.',
    metricLabel: 'Reply Lift',
    metricValue: '+41%',
  },
  {
    href: '/platform/success-tracker',
    title: 'Success Tracker',
    summary: 'Track outcomes, spot bottlenecks, and receive AI-guided next actions.',
    metricLabel: 'Weekly Wins',
    metricValue: '18',
  },
];
