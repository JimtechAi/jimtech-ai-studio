import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import { webPageSchema } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Contact Us | Start Your Project',
  description:
    'Contact JimTech AI Studio about website development, AI solutions and business automation for your business in Lagos or worldwide.',
  alternates: { canonical: 'https://www.jimtech.online/contact' },
  openGraph: {
    type: 'website',
    url: 'https://www.jimtech.online/contact',
    title: 'Contact Us | Start Your Project | JimTech AI Studio',
    description:
      'Speak with JimTech AI Studio about premium websites, AI-powered systems, automation and digital growth for your business.',
    images: [{ url: '/jimtech-ai-studio-logo.png', width: 612, height: 408, alt: 'JimTech AI Studio logo' }],
  },
  twitter: {
    card: 'summary',
    title: 'Contact Us | Start Your Project | JimTech AI Studio',
    description:
      'Start a project with JimTech AI Studio for custom website development, AI solutions and business automation.',
    images: ['/jimtech-ai-studio-logo.png'],
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <ContactSection pageHeading />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema('/contact', metadata)) }} />
    </>
  );
}
