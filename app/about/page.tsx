import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Icon } from '@/components/Icon';

const approachSteps = [
  {
    number: '01',
    title: 'Understand',
    description: 'We start by understanding the business, its customers and the problem the digital experience needs to solve.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'We turn strategy into a clear, intuitive and premium digital experience.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'We develop the website, system, automation or digital product using modern technology.',
  },
  {
    number: '04',
    title: 'Improve',
    description: 'We refine the experience based on performance, business needs and future opportunities.',
  },
] as const;

const buildCards = [
  'Premium Websites',
  'AI-Powered Websites',
  'Business Automation',
  'E-commerce Development',
  'AI Solutions',
  'Digital Transformation',
  'Website Maintenance & Optimization',
] as const;

const whyJimTech = [
  {
    title: 'Business-first thinking',
    description: 'Technology decisions start with the business objective.',
  },
  {
    title: 'Premium digital experiences',
    description: 'Every interface is designed to communicate credibility and clarity.',
  },
  {
    title: 'AI and automation',
    description: 'We look for practical opportunities to make businesses smarter and more efficient.',
  },
  {
    title: 'Long-term thinking',
    description: 'Digital products should be built to evolve as the business grows.',
  },
] as const;

const technologyStack = [
  'Next.js',
  'TypeScript',
  'AI workflows',
  'Automation',
  'Cloud systems',
  'Modern UX',
  'SEO',
  'Performance',
] as const;

export const metadata: Metadata = {
  title: 'About JimTech AI Studio | AI Digital Agency',
  description:
    'Learn about JimTech AI Studio, an AI digital agency in Lagos, Nigeria building premium websites, business automation systems, AI solutions and digital transformation experiences for ambitious businesses.',
  alternates: { canonical: 'https://jimtech.online/about' },
  openGraph: {
    type: 'website',
    url: 'https://jimtech.online/about',
    title: 'About JimTech AI Studio | AI Digital Agency',
    description:
      'JimTech AI Studio is a digital agency focused on website development, AI solutions, business automation and digital transformation for growing businesses.',
    images: [{ url: '/images/about-hero-section.webp.jpeg', width: 1600, height: 900, alt: 'JimTech AI Studio founder and digital agency team environment' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About JimTech AI Studio | AI Digital Agency',
    description:
      'Learn how JimTech AI Studio creates premium websites, AI systems and digital experiences for modern businesses.',
    images: ['/images/about-hero-section.webp.jpeg'],
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="about-page">
        <section className="about-hero" aria-labelledby="about-hero-title">
          <div className="about-hero__media" aria-hidden="true">
            <Image
              src="/images/about-hero-section.webp.jpeg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="about-hero__image"
            />
          </div>

          <div className="about-hero__overlay" aria-hidden="true" />

          <div className="jt-container about-hero__inner">
            <div className="about-hero__copy">
              <p className="eyebrow about-hero__eyebrow"><span className="eyebrow-dot" /> ABOUT JIMTECH</p>
              <h1 id="about-hero-title">
                Technology should solve problems,
                <span> not create them.</span>
              </h1>
              <p className="about-hero__description">
                JimTech AI Studio builds digital experiences, intelligent systems and automation solutions for ambitious businesses that want to operate smarter and compete globally.
              </p>
              <div className="hero-actions about-hero__actions">
                <Link href="/contact" className="button button--gold">
                  Start a Project <Icon name="arrow" size={18} />
                </Link>
                <Link href="/work" className="button button--outline-light">
                  Explore Our Work <Icon name="arrow" size={18} />
                </Link>
              </div>
            </div>
          </div>

          <div className="about-hero__scroll" aria-label="Scroll to explore">
            <span>Scroll to explore</span>
            <span className="about-hero__scroll-line"><Icon name="arrow" size={14} /></span>
          </div>
        </section>

        <section className="section section--paper">
          <div className="jt-container founder-section">
            <div className="founder-portrait-wrap">
              <div className="founder-portrait">
                <Image
                  src="/images/jimtech-founder.jpg"
                  alt="Gbenga Ogunsanwo, Founder of JimTech AI Studio"
                  width={800}
                  height={1000}
                  priority
                  className="founder-portrait__image"
                />
                <div className="founder-portrait__label">
                  <span>GBENGA OGUNSANWO</span>
                  <small>Founder, JimTech AI Studio</small>
                </div>
              </div>
            </div>

            <div className="founder-copy">
              <p className="eyebrow"><span className="eyebrow-dot" /> THE FOUNDER</p>
              <h2>Gbenga Ogunsanwo</h2>
              <p className="founder-role">Founder &amp; Digital Technology Strategist</p>
              <h3>Building digital systems around real business needs.</h3>
              <p>
                JimTech AI Studio was created around a simple idea: businesses should have digital systems that work for them, not technology that simply looks impressive.
              </p>
              <p>
                Gbenga brings together digital strategy, website development, AI, automation and business thinking to help entrepreneurs and organizations turn ideas into practical digital experiences.
              </p>
              <p>
                From websites and e-commerce platforms to booking systems, automation and AI-powered solutions, the focus is always the same: understand the business first, then build technology around it.
              </p>
            </div>
          </div>
        </section>

        <section className="section section--dark about-story">
          <div className="jt-container about-story__inner">
            <div className="about-story__header">
              <p className="eyebrow"><span className="eyebrow-dot" /> OUR STORY</p>
              <h2>Built around real business problems.</h2>
            </div>

            <div className="about-story__copy">
              <p>
                JimTech AI Studio exists to help businesses move from having a digital presence to having digital systems that actually support the business.
              </p>
              <p>
                We combine strategy, design, development, AI and automation to create experiences that are useful to customers and practical for the teams operating them.
              </p>
            </div>

            <div className="about-story__principles">
              <div className="story-principle">
                <span className="story-principle__num">01</span>
                <div>
                  <h3>Business First</h3>
                </div>
              </div>
              <div className="story-principle">
                <span className="story-principle__num">02</span>
                <div>
                  <h3>Technology With Purpose</h3>
                </div>
              </div>
              <div className="story-principle">
                <span className="story-principle__num">03</span>
                <div>
                  <h3>Designed for Growth</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--paper about-approach">
          <div className="jt-container">
            <div className="section-heading about-approach__heading">
              <p className="eyebrow"><span className="eyebrow-dot" /> OUR APPROACH</p>
              <h2>Understand first. Build with purpose.</h2>
            </div>

            <div className="about-approach__steps">
              {approachSteps.map((step) => (
                <article key={step.number} className="about-step">
                  <span className="about-step__number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--dark about-build">
          <div className="jt-container">
            <div className="section-heading about-build__heading">
              <p className="eyebrow"><span className="eyebrow-dot" /> WHAT WE BUILD</p>
              <h2>What we build</h2>
            </div>

            <div className="about-build-grid">
              {buildCards.map((card) => (
                <Link key={card} href="/services" className="build-card">
                  <span className="build-card__icon"><Icon name="arrow" size={16} /></span>
                  <span>{card}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--paper about-technology">
          <div className="jt-container about-technology__inner">
            <div className="about-technology__copy">
              <p className="eyebrow"><span className="eyebrow-dot" /> TECHNOLOGY</p>
              <h2>Modern technology. Practical execution.</h2>
              <p>
                We use modern web technologies, cloud platforms, AI tools and automation systems to build digital experiences that are fast, scalable and designed around the needs of the business.
              </p>
            </div>

            <div className="about-technology__visual" aria-label="Technology stack used by JimTech">
              <div className="technology-stack">
                {technologyStack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section section--dark about-why">
          <div className="jt-container">
            <div className="section-heading about-why__heading">
              <p className="eyebrow"><span className="eyebrow-dot" /> WHY JIMTECH</p>
              <h2>Why businesses work with JimTech</h2>
            </div>

            <div className="about-why-grid">
              {whyJimTech.map((item, index) => (
                <article key={item.title} className="about-why-card">
                  <span className="about-why-card__index">0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--paper about-quote-section">
          <div className="jt-container about-quote">
            <blockquote>
              Good technology is not about adding more.
              <span>It&apos;s about making the right things work better.</span>
            </blockquote>
            <p className="about-quote__by">
              Gbenga Ogunsanwo
              <span>Founder, JimTech AI Studio</span>
            </p>
          </div>
        </section>

        <section className="section section--dark about-final-cta">
          <div className="jt-container about-final-cta__inner">
            <div className="about-final-cta__content">
              <p className="eyebrow"><span className="eyebrow-dot" /> LET&apos;S BUILD</p>
              <h2>Your next digital advantage starts with a conversation.</h2>
              <p>Tell us what you&apos;re building, what isn&apos;t working or where you want your business to go.</p>
            </div>
            <div className="hero-actions about-final-cta__actions">
              <Link href="/contact" className="button button--gold">
                Start a Project <Icon name="arrow" size={18} />
              </Link>
              <Link href="/work" className="button button--outline-light">
                View Our Work <Icon name="arrow" size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
