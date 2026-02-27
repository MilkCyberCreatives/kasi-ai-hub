// src/data/resources.ts
import 'server-only'

export type ResourceItem = {
  label: string
  url: string
  description: string
  tags: string[]
  category: 'Tools' | 'Docs' | 'Tutorials' | 'Communities' | 'Newsletters' | 'Playbooks'
}

export const resources: ResourceItem[] = [
  // ——— Tools
  {
    category: 'Tools',
    label: 'ChatGPT',
    url: 'https://chat.openai.com',
    description: 'General-purpose AI assistant for ideation, drafting, analysis, and coding.',
    tags: ['assistant', 'writing', 'analysis']
  },
  {
    category: 'Tools',
    label: 'Google AI Studio',
    url: 'https://aistudio.google.com',
    description: 'Experiment with Google’s latest models in a simple, web-based playground.',
    tags: ['playground', 'models']
  },
  {
    category: 'Tools',
    label: 'Anthropic Claude',
    url: 'https://claude.ai',
    description: 'Long-context assistant known for helpful, concise answers and tool use.',
    tags: ['assistant', 'long-context']
  },
  {
    category: 'Tools',
    label: 'Hugging Face',
    url: 'https://huggingface.co',
    description: 'Models, datasets, and Spaces to demo or deploy ML apps quickly.',
    tags: ['models', 'datasets', 'deploy']
  },
  {
    category: 'Tools',
    label: 'Zapier',
    url: 'https://zapier.com',
    description: 'No-code automations connecting apps (Gmail, Sheets, Slack, etc.).',
    tags: ['automation', 'no-code']
  },
  {
    category: 'Tools',
    label: 'Make',
    url: 'https://www.make.com',
    description: 'Visual, no-code workflows; great for multi-step automations.',
    tags: ['automation', 'no-code', 'workflows']
  },

  // ——— Docs
  {
    category: 'Docs',
    label: 'OpenAI Platform Docs',
    url: 'https://platform.openai.com/docs',
    description: 'API quickstarts, capabilities, safety, and integration guides.',
    tags: ['api', 'openai', 'docs']
  },
  {
    category: 'Docs',
    label: 'Anthropic Docs',
    url: 'https://docs.anthropic.com',
    description: 'API reference, prompts, tool use, and safety guidance.',
    tags: ['api', 'claude', 'docs']
  },
  {
    category: 'Docs',
    label: 'LangChain (JS/TS)',
    url: 'https://js.langchain.com',
    description: 'Build LLM apps with tools, memory, retrieval, and agents (JavaScript).',
    tags: ['framework', 'langchain', 'retrieval']
  },
  {
    category: 'Docs',
    label: 'LangChain (Python)',
    url: 'https://python.langchain.com',
    description: 'Python docs for chains, tools, and RAG patterns.',
    tags: ['framework', 'python', 'rag']
  },
  {
    category: 'Docs',
    label: 'Microsoft Learn – AI',
    url: 'https://learn.microsoft.com/training/azure/ai-services/',
    description: 'Structured, free learning paths for AI services and fundamentals.',
    tags: ['learning', 'azure', 'fundamentals']
  },

  // ——— Tutorials
  {
    category: 'Tutorials',
    label: 'OpenAI Cookbook',
    url: 'https://cookbook.openai.com',
    description: 'Practical recipes and code samples for common AI tasks.',
    tags: ['examples', 'recipes', 'code']
  },
  {
    category: 'Tutorials',
    label: 'Google Machine Learning Crash Course',
    url: 'https://developers.google.com/machine-learning/crash-course',
    description: 'Fast, hands-on introduction to ML basics with exercises.',
    tags: ['ml', 'foundation']
  },
  {
    category: 'Tutorials',
    label: 'Fast.ai Practical Deep Learning',
    url: 'https://course.fast.ai/',
    description: 'Beginner-friendly DL course focusing on doing more with less code.',
    tags: ['deep-learning', 'practical']
  },

  // ——— Communities
  {
    category: 'Communities',
    label: 'Hugging Face Forums',
    url: 'https://discuss.huggingface.co',
    description: 'Active help on models, datasets, and Spaces.',
    tags: ['community', 'help']
  },
  {
    category: 'Communities',
    label: 'LangChain Discord',
    url: 'https://discord.gg/langchain',
    description: 'Support and examples for building LLM apps.',
    tags: ['community', 'discord']
  },

  // ——— Newsletters
  {
    category: 'Newsletters',
    label: 'Import AI (Jack Clark)',
    url: 'https://www.importai.com',
    description: 'Weekly summary of AI capabilities, impacts, and policy.',
    tags: ['news', 'analysis']
  },
  {
    category: 'Newsletters',
    label: 'The Batch (DeepLearning.AI)',
    url: 'https://www.deeplearning.ai/the-batch/',
    description: 'Digestible updates and practical tutorials.',
    tags: ['news', 'tutorials']
  },

  // ——— Playbooks (internal + reputable guides)
  {
    category: 'Playbooks',
    label: 'Kasi AI Hub — Blog',
    url: '/blog',
    description: 'Short, practical reads with examples and action steps.',
    tags: ['internal', 'playbook']
  },
  {
    category: 'Playbooks',
    label: 'Kasi AI Hub — Courses',
    url: '/courses',
    description: 'Self-paced paths to build business AI skills.',
    tags: ['internal', 'courses']
  },
  {
    category: 'Playbooks',
    label: 'MIT Sloan — AI for Business',
    url: 'https://mitsloan.mit.edu/ideas-made-to-matter/topic/artificial-intelligence',
    description: 'Manager-friendly insights on using AI in operations and strategy.',
    tags: ['management', 'case-studies']
  },
]
