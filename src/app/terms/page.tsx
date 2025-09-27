// src/app/terms/page.tsx
import Script from 'next/script'
import BreadcrumbHero from '@/components/BreadcrumbHero'

export const metadata = {
  title: 'Terms of Service',
  description:
    'The terms that govern your use of kasiAIhub programs, resources, and website.',
}

export default function TermsPage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kasiaihub.com' },
      { '@type': 'ListItem', position: 2, name: 'Terms', item: 'https://kasiaihub.com/terms' },
    ],
  }

  return (
    <main className="min-h-screen">
      <Script id="ld-bc-terms" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <BreadcrumbHero
        title="Terms of Service"
        subtitle="Please read these terms carefully before using our website and services."
        currentPage="Terms"
      />

      <section className="mx-auto max-w-3xl px-4 py-12">
        <article className="glass rounded-2xl p-6 md:p-8 prose prose-invert max-w-none">
          <h2>Agreement</h2>
          <p>
            By accessing or using <strong>kasiAIhub</strong> (“we”, “us”) programs, resources, or website, you agree to these Terms.
            If you do not agree, please do not use our services.
          </p>

          <h3>Services</h3>
          <p>
            We provide AI training sessions, workshops, resources, and community clinics. Some services may change or be discontinued.
          </p>

          <h3>Bookings & payments</h3>
          <ul>
            <li>Bookings may require pre-payment. Fees are shown during checkout or on the Book page.</li>
            <li>Rescheduling is allowed with reasonable notice. No-shows may forfeit fees.</li>
            <li>Refunds are at our discretion where sessions cannot be delivered.</li>
          </ul>

          <h3>User responsibilities</h3>
          <ul>
            <li>Provide accurate information when booking or contacting us.</li>
            <li>Use resources legally and do not infringe others’ rights.</li>
            <li>Do not misuse our website, attempt to breach security, or harm other users.</li>
          </ul>

          <h3>Content & intellectual property</h3>
          <p>
            Content we provide (guides, templates, prompts, brand assets) is owned by us or our licensors. You may use it
            for your business or team, but you may not redistribute or resell without permission.
          </p>

          <h3>AI usage notice</h3>
          <p>
            Our examples may involve third-party AI tools. You are responsible for reviewing their terms, acceptable use,
            and data policies before adoption in your workflow.
          </p>

          <h3>Disclaimer</h3>
          <p>
            Training and resources are provided “as is”. We do not guarantee specific outcomes. Use professional judgment
            when applying templates or automations.
          </p>

          <h3>Limitation of liability</h3>
          <p>
            To the maximum extent permitted by law, we are not liable for indirect or consequential damages. Our total
            liability for any claim will not exceed the amount you paid for the relevant service.
          </p>

          <h3>Changes to terms</h3>
          <p>We may update these Terms. Continued use after changes means you accept the new Terms.</p>

          <h3>Contact</h3>
          <p>Questions about these Terms? Email <a href="mailto:hello@kasiaihub.com">hello@kasiaihub.com</a>.</p>

          <p className="text-sm opacity-70">Last updated: {new Date().toLocaleDateString()}</p>
        </article>
      </section>
    </main>
  )
}
