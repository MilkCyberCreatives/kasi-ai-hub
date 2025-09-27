// src/app/page.tsx
import Script from 'next/script'

import Hero from '@/components/Hero'
import ValueStrip from '@/components/ValueStrip'
import ServicesGrid from '@/components/ServicesGrid'
import ProgramsTeaser from '@/components/ProgramsTeaser'
import ProgramFinder from '@/components/ProgramFinder'
import LeadCapture from '@/components/LeadCapture'
import HowItWorks from '@/components/HowItWorks'
import TrainingLocations from '@/components/TrainingLocations'
import Testimonials from '@/components/Testimonials'
import HomeFAQ from '@/components/HomeFAQ'
import StatsStrip from '@/components/StatsStrip'
import ApplyBanner from '@/components/ApplyBanner'
import FinalCTA from '@/components/FinalCTA'

export default function Page() {
  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'kasiAIhub',
    url: 'https://kasiaihub.com',
    logo: 'https://kasiaihub.com/favicon.svg',
    sameAs: []
  }

  const courseLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'AI Training South Africa – Learn and Build in 3 Hours',
    provider: { '@type': 'Organization', name: 'kasiAIhub', sameAs: 'https://kasiaihub.com' },
    description:
      'Hands-on AI training for entrepreneurs and community businesses. Build working AI workflows in 3 hours.'
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Do I need a technical background?',
        acceptedAnswer: { '@type': 'Answer', text: 'No. We teach by example. If you can use email/WhatsApp, you can learn our workflows.' }
      },
      {
        '@type': 'Question',
        name: 'What will I leave with?',
        acceptedAnswer: { '@type': 'Answer', text: 'A working workflow tailored to your goal, plus templates and a prompt library to reuse.' }
      },
      {
        '@type': 'Question',
        name: 'Which AI tools do you use?',
        acceptedAnswer: { '@type': 'Answer', text: 'We focus on accessible tools and show free/low-cost options. We also cover data privacy.' }
      },
      {
        '@type': 'Question',
        name: 'Can you train my team?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes. Our Team Workshop is designed for small/medium teams with industry-specific examples.' }
      }
    ]
  }

  return (
    <main className="min-h-screen">
      {/* SEO JSON-LD */}
      <Script id="ld-org" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      <Script id="ld-course" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseLd) }} />
      <Script id="ld-faq-home" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* Sections */}
      <Hero />
      <ValueStrip />
      <ServicesGrid />
      <ProgramsTeaser />
      <ProgramFinder />
      <LeadCapture />
      <HowItWorks />
      <TrainingLocations />   {/* <-- new section */}
      <Testimonials />
      <HomeFAQ />
      <StatsStrip />
      <ApplyBanner />
      <FinalCTA />
    </main>
  )
}
