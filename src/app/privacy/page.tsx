// src/app/privacy/page.tsx
import Script from 'next/script'
import BreadcrumbHero from '@/components/BreadcrumbHero'

export const metadata = {
  title: 'Privacy Policy',
  description:
    'How kasiAIhub collects, uses, and protects your information.',
}

export default function PrivacyPage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kasiaihub.com' },
      { '@type': 'ListItem', position: 2, name: 'Privacy', item: 'https://kasiaihub.com/privacy' },
    ],
  }

  return (
    <main className="min-h-screen">
      <Script id="ld-bc-privacy" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <BreadcrumbHero
        title="Privacy Policy"
        subtitle="We respect your privacy and aim to be transparent about our data practices."
        currentPage="Privacy"
      />

      <section className="mx-auto max-w-3xl px-4 py-12">
        <article className="glass rounded-2xl p-6 md:p-8 prose prose-invert max-w-none">
          <h2>Overview</h2>
          <p>
            This Privacy Policy explains how <strong>kasiAIhub</strong> (“we”, “us”) collects, uses, and protects your
            information when you use our website, programs, and services.
          </p>

          <h3>Information we collect</h3>
          <ul>
            <li><strong>Contact data:</strong> name, email, WhatsApp/phone.</li>
            <li><strong>Booking details:</strong> selected session, goals, preferred time/location.</li>
            <li><strong>Usage data:</strong> pages viewed, referral/UTM, device information (via analytics).</li>
            <li><strong>Messages:</strong> questions sent via forms or WhatsApp links.</li>
          </ul>

          <h3>How we use your information</h3>
          <ul>
            <li>To provide training, confirm bookings, and send session materials.</li>
            <li>To improve programs, resources, and website performance.</li>
            <li>To send helpful updates (you can unsubscribe at any time).</li>
            <li>To prevent abuse and maintain security.</li>
          </ul>

          <h3>Legal basis</h3>
          <p>We process data with your consent, to perform a contract (your booking), or for our legitimate interests (analytics & security).</p>

          <h3>Sharing</h3>
          <p>
            We do not sell your data. We may share limited data with service providers (e.g., email, analytics, payment)
            under agreements that protect your privacy.
          </p>

          <h3>Data retention</h3>
          <p>We keep data only as long as necessary for the purposes above or to comply with legal obligations.</p>

          <h3>Your choices</h3>
          <ul>
            <li>Access, update, or delete your data by emailing <a href="mailto:hello@kasiaihub.com">hello@kasiaihub.com</a>.</li>
            <li>Unsubscribe from emails using the link in messages or by contacting us.</li>
            <li>Disable non-essential cookies in your browser.</li>
          </ul>

          <h3>Children</h3>
          <p>Our services are for adults and older students under supervision. We do not knowingly collect data from children under 13.</p>

          <h3>International</h3>
          <p>Your data may be processed outside your country. We use providers with appropriate safeguards.</p>

          <h3>Changes</h3>
          <p>We may update this policy. The “Last updated” date indicates the latest version.</p>

          <h3>Contact</h3>
          <p>
            Questions? Email <a href="mailto:hello@kasiaihub.com">hello@kasiaihub.com</a>.
          </p>

          <p className="text-sm opacity-70">Last updated: {new Date().toLocaleDateString()}</p>
        </article>
      </section>
    </main>
  )
}
