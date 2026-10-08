import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';
import { portfolioProjects } from '@/data/projects';
import { Icon } from '@/components/Icon';

export const metadata: Metadata = {
  title: 'Website Development Portfolio | JimTech AI Studio',
  description:
    'Explore the JimTech AI Studio portfolio of web design, website development, AI-powered websites, digital experiences and business websites for Nigerian and global brands.',
  alternates: { canonical: 'https://jimtech.online/work' },
  openGraph: {
    type: 'website',
    url: 'https://jimtech.online/work',
    title: 'Website Development Portfolio | JimTech AI Studio',
    description:
      'Browse the JimTech AI Studio website development portfolio featuring premium digital experiences, business websites, and AI-powered solutions.',
    images: [{ url: '/images/work-hero-section-image.webp.jpeg', width: 1600, height: 900, alt: 'JimTech AI Studio portfolio and web design showcase' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Development Portfolio | JimTech AI Studio',
    description:
      'Explore the JimTech AI Studio digital portfolio and website development work for brands seeking premium, AI-powered digital experiences.',
    images: ['/images/work-hero-section-image.webp.jpeg'],
  },
};

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <main className="work-page">
        <section className="work-page-hero" aria-labelledby="work-hero-title">
          <div className="jt-container work-page-hero__inner">
            <p className="eyebrow work-page-hero__eyebrow"><span className="eyebrow-dot" /> Our work</p>
            <h1 id="work-hero-title" className="work-page-hero__title">
              Digital experiences built
              <span className="work-page-hero__highlight"> around real business needs.</span>
            </h1>
            <p className="work-page-hero__lede">
              Digital experiences we&apos;ve designed and built across luxury events, bakery and wellness, photography, and commercial cleaning. No invented metrics — just the work and the thinking behind it.
            </p>
            <div className="hero-actions work-page-hero__actions">
              <Link href="#portfolio" className="button button--gold">
                Explore Our Work <Icon name="arrow" size={18} />
              </Link>
            </div>
          </div>
        </section>

        <section id="portfolio" className="section section--paper work-intro-section">
          <div className="jt-container work-intro">
            <p className="eyebrow"><span className="eyebrow-dot" /> Our work</p>
            <h2>Selected digital experiences.</h2>
            <p>Each project is designed around the business, its audience and the experience it needs to deliver.</p>
          </div>
        </section>

        <section className="section section--paper">
          <div className="jt-container">
            <div className="project-showcase project-showcase--work">
              {portfolioProjects.map((project, index) => (
                <ProjectCard key={project.slug} project={project} variant={index === 0 ? 'featured' : 'standard'} />
              ))}
            </div>
          </div>
        </section>

        <section className="section section--dark work-approach-section">
          <div className="jt-container work-approach">
            <div className="work-approach__header">
              <p className="eyebrow"><span className="eyebrow-dot" /> The JimTech approach</p>
              <h2>We build around the business, not just the brief.</h2>
              <p>Every project starts with understanding the business, the customer and the problem the digital experience needs to solve.</p>
            </div>

            <div className="work-principles">
              <div className="work-principle">
                <span className="work-principle__icon"><Icon name="check" size={18} /></span>
                <h3>Business First</h3>
              </div>
              <div className="work-principle">
                <span className="work-principle__icon"><Icon name="spark" size={18} /></span>
                <h3>Technology With Purpose</h3>
              </div>
              <div className="work-principle">
                <span className="work-principle__icon"><Icon name="growth" size={18} /></span>
                <h3>Built for Growth</h3>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--paper work-cta-section">
          <div className="jt-container">
            <div className="work-final-cta">
              <div className="work-final-cta__content">
                <p className="eyebrow"><span className="eyebrow-dot" /> Start a conversation</p>
                <h2>Have a business that needs a better digital experience?</h2>
                <p>Let&apos;s turn your idea, business or existing digital system into something that works harder for your brand.</p>
              </div>

              <div className="hero-actions work-final-cta__actions">
                <Link href="/contact" className="button button--gold">
                  Start a Project <Icon name="arrow" size={18} />
                </Link>
                <Link href="/services" className="button button--outline-dark">
                  Explore Services <Icon name="arrow" size={18} />
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
