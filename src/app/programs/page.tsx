// src/app/programs/page.tsx
import Script from 'next/script';
import Link from 'next/link';
import BreadcrumbHero from '@/components/BreadcrumbHero';

export const metadata = {
  title: 'Programs',
  description: 'Cohorts, workshops, and hands-on sessions to make AI practical for your work.'
};

export default function ProgramsPage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kasiaihub.com' },
      { '@type': 'ListItem', position: 2, name: 'Programs', item: 'https://kasiaihub.com/programs' }
    ]
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Who is this for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Entrepreneurs, small teams, and community leaders who want practical AI workflows without heavy theory.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do I need a technical background?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'No. We teach by example. If you can use email and WhatsApp, you can learn our workflows.'
        }
      },
      {
        '@type': 'Question',
        name: 'What tools do we use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'We focus on accessible AI tools and show you how to integrate them into your daily tasks.'
        }
      }
    ]
  };

  return (
    <main className="min-h-screen">
      {/* SEO JSON-LD */}
      <Script id="ld-breadcrumbs" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* Shared breadcrumb hero */}
      <BreadcrumbHero
        title="Programs"
        subtitle="Pick a session and leave with a working AI workflow, templates, and clear next steps."
        currentPage="Programs"
      />

      <section className="mx-auto max-w-7xl px-4 py-14">
        {/* Cards */}
        <section className="grid gap-6 md:grid-cols-3">
          {/* Foundations */}
          <article className="glass rounded-2xl overflow-hidden">
            <img src="/images/programs/foundations.jpg" alt="AI Foundations" className="h-44 w-full object-cover" />
            <div className="p-6">
              <h2 className="text-white font-semibold text-xl">AI Foundations (3 Hours)</h2>
              <p className="mt-2 text-white/80">
                Learn prompts, setup core tools, and build your first workflow (content, customer support, or reports).
              </p>
              <ul className="mt-3 list-disc pl-5 text-white/80 space-y-1">
                <li>Role + Goal + Constraints prompting</li>
                <li>Checklists & SOPs you can reuse</li>
                <li>One working workflow you keep</li>
              </ul>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-white font-semibold">R1299</span>
                <Link href="/book" className="rounded-lg px-4 py-2 text-sm text-black" style={{ background: 'var(--brand-primary)' }}>
                  Book
                </Link>
              </div>
            </div>
          </article>

          {/* Team Workshop */}
          <article className="glass rounded-2xl overflow-hidden">
            <img src="/images/programs/team.jpg" alt="Team Workshop" className="h-44 w-full object-cover" />
            <div className="p-6">
              <h2 className="text-white font-semibold text-xl">Team Workshop (1 Day)</h2>
              <p className="mt-2 text-white/80">
                On-site or remote. We tailor examples to your industry and tools; leave with playbooks for your team.
              </p>
              <ul className="mt-3 list-disc pl-5 text-white/80 space-y-1">
                <li>Team prompt library tailored to you</li>
                <li>Ready-to-use templates for ops & marketing</li>
                <li>Setup checklist (security & privacy)</li>
              </ul>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-white font-semibold">Custom</span>
                <Link href="/book" className="rounded-lg px-4 py-2 text-sm text-black" style={{ background: 'var(--brand-primary)' }}>
                  Enquire
                </Link>
              </div>
            </div>
          </article>

          {/* Monthly Clinic */}
          <article className="glass rounded-2xl overflow-hidden">
            <img src="/images/programs/clinic.jpg" alt="Monthly AI Clinic" className="h-44 w-full object-cover" />
            <div className="p-6">
              <h2 className="text-white font-semibold text-xl">Monthly AI Clinic</h2>
              <p className="mt-2 text-white/80">
                Bring your problem—we’ll solve it together. You’ll leave with a working template.
              </p>
              <ul className="mt-3 list-disc pl-5 text-white/80 space-y-1">
                <li>Live troubleshooting</li>
                <li>Templates you can reuse</li>
                <li>Community Q&A</li>
              </ul>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-white font-semibold">Free</span>
                <Link href="/community" className="rounded-lg px-4 py-2 text-sm border border-white/20 text-white hover:bg-white/10">
                  Join
                </Link>
              </div>
            </div>
          </article>
        </section>

        {/* FAQ */}
        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="glass rounded-2xl p-6">
            <h3 className="text-white font-semibold text-lg">Who is this for?</h3>
            <p className="mt-2 text-white/80">
              Entrepreneurs, multipreneurs, side-hustlers, and teams who want quick, practical results from AI.
            </p>
          </div>
          <div className="glass rounded-2xl p-6">
            <h3 className="text-white font-semibold text-lg">Do I need any tools?</h3>
            <p className="mt-2 text-white/80">
              We use common AI tools and show free/low-cost options. You’ll get a checklist at the start.
            </p>
          </div>
          <div className="glass rounded-2xl p-6">
            <h3 className="text-white font-semibold text-lg">Can you train my team?</h3>
            <p className="mt-2 text-white/80">
              Yes. The Team Workshop is designed for small/medium teams. We tailor examples and set up playbooks.
            </p>
          </div>
          <div className="glass rounded-2xl p-6">
            <h3 className="text-white font-semibold text-lg">Do you offer certificates?</h3>
            <p className="mt-2 text-white/80">
              We provide a completion letter and—on request—portfolio-ready examples you built in the session.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 text-center">
          <Link
            href="/book"
            className="inline-flex rounded-xl px-6 py-3 text-black font-medium"
            style={{ background: 'var(--brand-primary)' }}
          >
            Book your session
          </Link>
        </section>
      </section>
    </main>
  );
}
