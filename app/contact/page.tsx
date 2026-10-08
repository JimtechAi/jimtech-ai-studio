import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';

export const metadata: Metadata = {
  title: 'Contact JimTech AI Studio | Website Development & AI Solutions',
  description:
    'Contact JimTech AI Studio for website development, AI solutions, business automation and digital transformation services in Lagos, Nigeria and globally.',
  alternates: { canonical: 'https://jimtech.online/contact' },
  openGraph: {
    type: 'website',
    url: 'https://jimtech.online/contact',
    title: 'Contact JimTech AI Studio | Website Development & AI Solutions',
    description:
      'Speak with JimTech AI Studio about premium websites, AI-powered systems, automation and digital growth for your business.',
    images: [{ url: '/jimtech-ai-studio-logo.png', width: 612, height: 408, alt: 'JimTech AI Studio logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact JimTech AI Studio | Website Development & AI Solutions',
    description:
      'Start a project with JimTech AI Studio for custom website development, AI solutions and business automation.',
    images: ['/jimtech-ai-studio-logo.png'],
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
