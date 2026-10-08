import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Capabilities from '@/components/Capabilities';
import Services from '@/components/Services';
import WhyJimTech from '@/components/WhyJimTech';
import SelectedWork from '@/components/SelectedWork';
import ProcessAndTechnology from '@/components/ProcessAndTechnology';
import { About, Insights } from '@/components/AboutInsights';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'JimTech AI Studio | AI-Powered Websites, Automation & Digital Growth',
  description:
    'JimTech AI Studio builds AI-powered websites, business automation, AI solutions and digital transformation systems for businesses in Lagos, Nigeria and globally.',
  alternates: { canonical: 'https://jimtech.online/' },
  openGraph: {
    type: 'website',
    url: 'https://jimtech.online/',
    title: 'JimTech AI Studio | AI-Powered Websites, Automation & Digital Growth',
    description:
      'JimTech AI Studio delivers premium website development, business automation, AI solutions and digital transformation for ambitious businesses.',
    images: [{ url: '/jimtech-ai-studio-logo.png', width: 612, height: 408, alt: 'JimTech AI Studio logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JimTech AI Studio | AI-Powered Websites, Automation & Digital Growth',
    description:
      'Premium website development, AI-powered systems, business automation and digital transformation for businesses ready to grow.',
    images: ['/jimtech-ai-studio-logo.png'],
  },
};

const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'JimTech AI Studio Services',
  itemListElement: [
    'Website Development',
    'AI Integration',
    'Business Automation',
    'E-commerce',
    'UI/UX Design',
    'SEO & Digital Growth',
    'Cloud & Maintenance',
  ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name, provider: { '@type': 'Organization', name: 'JimTech AI Studio', url: 'https://jimtech.online' } } })),
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Capabilities />
        <Services />
        <WhyJimTech />
        <SelectedWork />
        <ProcessAndTechnology />
        <About />
        <Insights />
        <ContactSection />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }} />
    </>
  );
}