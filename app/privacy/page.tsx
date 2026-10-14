import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookiePreferencesButton from '@/components/CookiePreferencesButton';
import { contactInfo } from '@/data/contact';
import { webPageSchema } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Privacy Notice',
  description:
    'How JimTech AI Studio handles enquiry information, website analytics and your privacy choices, including how to change your cookie preferences.',
  alternates: { canonical: 'https://www.jimtech.online/privacy' },
  openGraph: {
    type: 'website',
    url: 'https://www.jimtech.online/privacy',
    title: 'Privacy Notice | JimTech AI Studio',
    description: 'How JimTech AI Studio handles enquiry information, website analytics and your privacy choices.',
    images: [{ url: '/jimtech-ai-studio-logo.png', width: 612, height: 408, alt: 'JimTech AI Studio logo' }],
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Notice | JimTech AI Studio',
    description: 'How JimTech AI Studio handles enquiry information, website analytics and your privacy choices.',
    images: ['/jimtech-ai-studio-logo.png'],
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="section section--dark legal-page">
        <div className="jt-container legal-content">
          <p className="eyebrow"><span className="eyebrow-dot" />Legal</p>
          <h1>Privacy Notice</h1>
          <p className="legal-updated">Last updated: 14 October 2026</p>

          <section aria-labelledby="who">
            <h2 id="who">Who we are</h2>
            <p>This website is operated by JimTech AI Studio, a digital studio based in Lagos, Nigeria that builds websites, automation and AI-powered systems for businesses. This notice explains how information is handled when you use this website.</p>
          </section>

          <section aria-labelledby="enquiries">
            <h2 id="enquiries">Project enquiries</h2>
            <p>The website lets you send a project enquiry through the contact form. The form can collect your name, email address, phone number, company, the service and budget range you select, your timeline, and the project description you write. Name, email and project description are required; the other fields are optional.</p>
            <p>We use this information to read your enquiry, reply to you and discuss a possible project. Please avoid including sensitive personal information in the project description.</p>
            <p>Enquiries are delivered to our business mailbox by email.</p>
          </section>

          <section aria-labelledby="analytics">
            <h2 id="analytics">Website analytics</h2>
            <p>We use Google Analytics 4 to understand website traffic and how the site is used, so we can improve it. Analytics is optional. It stays disabled, and no analytics script is loaded, until you choose to accept it in the privacy banner or preferences panel.</p>
            <p>If you accept, Google Analytics may set cookies, typically with names beginning <code>_ga</code>, and may process technical and usage information such as pages viewed and device or browser details. We do not intentionally send your name, email address, phone number or enquiry text to Google Analytics. We do not treat analytics data as anonymous.</p>
            <p>If you reject analytics, or later withdraw your choice, analytics storage is turned off and we remove the analytics cookies we can access from this site.</p>
          </section>

          <section aria-labelledby="choices">
            <h2 id="choices">Your choices and withdrawing consent</h2>
            <p>You can change your choice at any time, on any page, using the &ldquo;Cookie preferences&rdquo; control in the footer. Withdrawing consent applies from that point onward.</p>
            <p><CookiePreferencesButton className="button button--outline" /></p>
          </section>

          <section aria-labelledby="technologies">
            <h2 id="technologies">Necessary and optional technologies</h2>
            <ul>
              <li><strong>Necessary:</strong> technology needed to deliver and secure the website and to handle your enquiry, including remembering your privacy choice in your browser&rsquo;s local storage on your device.</li>
              <li><strong>Optional analytics:</strong> Google Analytics 4, only after you accept.</li>
              <li><strong>Advertising:</strong> not used. We do not run advertising pixels or ad personalisation.</li>
            </ul>
          </section>

          <section aria-labelledby="providers">
            <h2 id="providers">Service providers</h2>
            <p>We rely on third-party providers to run the website. Depending on what you do, information may be processed by:</p>
            <ul>
              <li><strong>Hosting and delivery provider (Vercel):</strong> serves the website and handles requests, which can include technical data such as your IP address and browser details.</li>
              <li><strong>Email provider (Google):</strong> receives and stores enquiry emails sent from the contact form.</li>
              <li><strong>Abuse-prevention service (Upstash):</strong> to limit repeated form submissions we keep a short-lived counter linked to a hashed identifier derived from your connection details. It is set to expire after about ten minutes.</li>
              <li><strong>Google Analytics:</strong> only if you accept analytics.</li>
            </ul>
            <p>Links to WhatsApp, Instagram and other external services take you to sites with their own privacy practices. Some providers may process information outside Nigeria, so international transfers may be involved. Please see each provider&rsquo;s own documentation for details.</p>
          </section>

          <section aria-labelledby="retention">
            <h2 id="retention">How long we keep information</h2>
            <p>We keep enquiry emails for as long as needed to respond to you, manage any resulting project and maintain reasonable business records, and we do not hold them longer than we need to. We have not set a fixed retention period. Analytics retention is controlled in our Google Analytics settings. Abuse-prevention counters expire automatically after a short period.</p>
          </section>

          <section aria-labelledby="rights">
            <h2 id="rights">Your rights</h2>
            <p>Depending on where you live, you may have rights over your personal information, such as asking to access, correct or delete it, objecting to or restricting how it is used, and withdrawing consent. To make a privacy request or ask a question, contact us using the details below. We may need to confirm your identity before acting on a request.</p>
          </section>

          <section aria-labelledby="contact">
            <h2 id="contact">Contact us about privacy</h2>
            <p>Email <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>, or use the <Link href="/contact">contact page</Link>.</p>
          </section>

          <section aria-labelledby="changes">
            <h2 id="changes">Changes to this notice</h2>
            <p>We may update this notice as the website or our providers change. The date at the top shows when it was last updated.</p>
          </section>
        </div>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema('/privacy', metadata)) }} />
    </>
  );
}
