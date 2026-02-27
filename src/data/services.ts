// src/data/services.ts
export type ServiceKey =
  | 'ai-websites'
  | 'ai-social-media-marketing-training'
  | 'ai-business-automation-training'
  | 'ai-market-research-funding-training';

export type Service = {
  key: ServiceKey;
  slug: `/${ServiceKey}`;
  title: string;
  blurb: string;
  img: string;
  outcomes: string[];
  includes: string[];
};

export const SERVICES: Service[] = [
  {
    key: 'ai-websites',
    slug: '/ai-websites',
    title: 'Website Development',
    blurb: 'Fast, conversion-focused sites with AI content workflows built-in.',
    img: '/images/home/services/website.png',
    outcomes: ['Launch faster with a clean funnel structure.', 'Improve conversion with focused page copy.', 'Keep content updates consistent with AI workflows.'],
    includes: ['Homepage and offer structure', 'Content workflow for updates', 'SEO-ready page setup'],
  },
  {
    key: 'ai-social-media-marketing-training',
    slug: '/ai-social-media-marketing-training',
    title: 'Social Media Marketing',
    blurb: 'Plan, generate, and schedule 30 posts in 3 hours with AI templates.',
    img: '/images/home/services/marketing.png',
    outcomes: ['Publish consistently across your channels.', 'Generate campaign ideas and post variants quickly.', 'Reduce time spent on weekly content planning.'],
    includes: ['30-post planning framework', 'Prompt templates by campaign type', 'Post review checklist'],
  },
  {
    key: 'ai-business-automation-training',
    slug: '/ai-business-automation-training',
    title: 'Business Automation',
    blurb: 'Automate intake, replies, and weekly reports. Checklists + approvals.',
    img: '/images/home/services/automation.png',
    outcomes: ['Respond to leads and client requests faster.', 'Reduce repetitive manual admin work.', 'Standardize weekly reporting and follow-ups.'],
    includes: ['Intake and response workflow', 'Report template automation', 'Approval and quality checklist'],
  },
  {
    key: 'ai-market-research-funding-training',
    slug: '/ai-market-research-funding-training',
    title: 'Market Research & Funding',
    blurb: 'Use AI to research markets, draft proposals, and prep funding decks.',
    img: '/images/home/services/research.png',
    outcomes: ['Validate markets with structured research prompts.', 'Draft stronger funding proposals faster.', 'Prepare clear investor and partner summaries.'],
    includes: ['Market scan prompt system', 'Proposal draft framework', 'Funding deck outline template'],
  },
];

export const SERVICES_BY_KEY: Record<ServiceKey, Service> = SERVICES.reduce(
  (acc, service) => {
    acc[service.key] = service;
    return acc;
  },
  {} as Record<ServiceKey, Service>
);

