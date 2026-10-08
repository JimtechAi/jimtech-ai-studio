import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeading from '@/components/SectionHeading';
import { Icon } from '@/components/Icon';

const services = [
  {
    title: 'Premium Website Development',
    description: 'High-converting websites and digital experiences designed around your business goals, customers and long-term growth.',
    icon: 'web' as const,
  },
  {
    title: 'AI-Powered Websites',
    description: 'Smart AI features and intelligent digital experiences that make websites more useful, responsive and engaging.',
    icon: 'spark' as const,
  },
  {
    title: 'Business Automation',
    description: 'Workflow systems, lead capture and operational automation that reduce repetitive work and improve efficiency.',
    icon: 'growth' as const,
  },
  {
    title: 'AI Solutions',
    description: 'Practical AI strategy and implementation for customer support, content, internal operations and business workflows.',
    icon: 'layers' as const,
  },
  {
    title: 'E-commerce Development',
    description: 'Modern storefronts, product systems and payment experiences designed to help businesses present products and convert customers.',
    icon: 'cart' as const,
  },
  {
    title: 'Digital Transformation',
    description: 'Digital systems that connect strategy, technology and business processes to improve how your organization operates.',
    icon: 'cloud' as const,
  },
  {
    title: 'Website Maintenance & Optimization',
    description: 'Ongoing technical support, performance improvements, security updates and optimization that keep your website working effectively.',
    icon: 'shield' as const,
  },
];

const principles = [
  'Understand the Business',
  'Build the Right System',
  'Optimize for Growth',
];

const benefits = [
  {
    title: 'Business-first thinking',
    description: 'We start with your goals, customers and operations so the digital system fits how your business actually works.',
    icon: 'check' as const,
  },
  {
    title: 'Modern technology',
    description: 'Every solution is built using the right tools and interfaces for speed, usability and long-term flexibility.',
    icon: 'spark' as const,
  },
  {
    title: 'Scalable architecture',
    description: 'We design systems that can grow with your business without adding friction or unnecessary complexity.',
    icon: 'growth' as const,
  },
  {
    title: 'Long-term support',
    description: 'From launch to optimization, we stay close to the work so your digital system continues to perform.',
    icon: 'shield' as const,
  },
];

const process = [
  {
    title: 'Discover',
    description: 'Understand the business, audience and objectives.',
  },
  {
    title: 'Strategize',
    description: 'Define the right digital structure, technology and user journey.',
  },
  {
    title: 'Build',
    description: 'Design and develop the digital experience.',
  },
  {
    title: 'Launch',
    description: 'Test, optimize and deploy.',
  },
  {
    title: 'Grow',
    description: 'Continue improving the system as the business grows.',
  },
];

export const metadata: Metadata = {
  title: 'Website Development, AI Solutions & Business Automation Services',
  description:
    'JimTech AI Studio offers premium website development, AI-powered websites, business automation, AI solutions, e-commerce development, digital transformation and ongoing website maintenance for businesses in Lagos, Nigeria and globally.',
  alternates: { canonical: 'https://jimtech.online/services' },
  openGraph: {
    type: 'website',
    url: 'https://jimtech.online/services',
    title: 'Website Development, AI Solutions & Business Automation Services | JimTech AI Studio',
    description:
      'From premium websites to AI solutions and business automation, JimTech AI Studio helps brands build digital systems that support long-term growth.',
    images: [{ url: '/images/hero.webp.jpeg', width: 1600, height: 900, alt: 'JimTech AI Studio services and digital strategy overview' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Development, AI Solutions & Business Automation Services | JimTech AI Studio',
    description:
      'Explore website development, AI-powered websites, business automation, e-commerce and digital transformation services from JimTech AI Studio.',
    images: ['/images/hero.webp.jpeg'],
  },
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="service-page">
        <section className="service-hero" aria-label="JimTech founder in a premium office with AI interfaces and digital business technology">
          <div className="jt-container service-hero__inner">
            <div className="service-hero__content">
              <p className="eyebrow"><span className="eyebrow-dot" /> Our services</p>
              <h1 className="service-hero__title">
                <span className="service-hero__line">Technology Built</span>
                <span className="service-hero__line">Around Your</span>
                <span className="service-hero__accent">Business.</span>
              </h1>
              <p className="service-hero__lede">
                We design, build and automate digital systems that help businesses work smarter, connect with their customers and grow with confidence.
              </p>

              <div className="hero-actions service-hero__actions">
                <Link href="/contact" className="button button--gold">
                  Start a Project <Icon name="arrow" size={19} />
                </Link>
                <Link href="/work" className="button button--outline">
                  See How We Work <Icon name="arrow" size={19} />
                </Link>
              </div>

              <div className="service-value-pills" aria-label="Core service values">
                <span className="service-value-pill"><Icon name="check" size={14} />Business Focused</span>
                <span className="service-value-pill"><Icon name="spark" size={14} />Technology Driven</span>
                <span className="service-value-pill"><Icon name="growth" size={14} />Built for Growth</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--paper">
          <div className="jt-container">
            <SectionHeading
              eyebrow="What we do"
              title="Digital services built for real business needs."
              description="We blend strategy, design and technology to create websites, automation flows and digital systems that help businesses look stronger and operate more effectively."
            />
          </div>
        </section>

        <section className="section section--paper service-section">
          <div className="jt-container">
            <div className="service-grid">
              {services.map((service) => (
                <article key={service.title} className="service-feature-card">
                  <div className="service-feature-card__top">
                    <span className="icon-frame icon-frame--service"><Icon name={service.icon} size={20} /></span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Link href="/contact" className="text-link text-link--light">
                    Start a project <Icon name="arrow" size={16} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--dark service-approach">
          <div className="jt-container">
            <div className="service-detail">
              <div className="service-detail__intro">
                <p className="eyebrow"><span className="eyebrow-dot" /> Our approach</p>
                <h2>Technology should solve problems, not create them.</h2>
              </div>

              <div className="service-principles">
                {principles.map((principle, index) => (
                  <div key={principle} className="service-principle">
                    <span className="service-principle__index">{String(index + 1).padStart(2, '0')}</span>
                    <h3>{principle}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section section--paper service-benefits-section">
          <div className="jt-container">
            <SectionHeading
              eyebrow="Why JimTech"
              title="More than a website. A digital system built around your business."
            />

            <div className="service-benefits">
              {benefits.map((benefit) => (
                <article key={benefit.title} className="service-benefit-card">
                  <span className="service-benefit-card__icon"><Icon name={benefit.icon} size={18} /></span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--dark service-process-section">
          <div className="jt-container">
            <div className="service-process-header">
              <p className="eyebrow"><span className="eyebrow-dot" /> Process</p>
              <h2>How we move from idea to digital system.</h2>
            </div>

            <div className="service-process" aria-label="JimTech project process timeline">
              {process.map((step, index) => (
                <div key={step.title} className="service-process-step">
                  <span className="service-process-step__number">0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--paper service-final-cta-section">
          <div className="jt-container">
            <div className="service-final-cta">
              <div>
                <p className="eyebrow"><span className="eyebrow-dot" /> Start a conversation</p>
                <h2>Ready to build a better digital system?</h2>
                <p>Tell us what you are building, and let&apos;s turn the idea into a digital experience that works.</p>
              </div>

              <div className="hero-actions service-final-cta__actions">
                <Link href="/contact" className="button button--gold">
                  Start a Project <Icon name="arrow" size={19} />
                </Link>
                <Link href="/work" className="button button--outline-dark">
                  Explore Our Work <Icon name="arrow" size={19} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
