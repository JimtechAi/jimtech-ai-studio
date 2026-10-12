import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Icon } from '@/components/Icon';

const insightArticles = [
  {
    category: 'Featured Insights',
    title: 'How AI can support sustainable digital growth without adding complexity',
    description: 'A practical framework for choosing the right automation, data and systems that help your business scale with clarity instead of chaos.',
    readTime: '6 min read',
    href: '#featured-insights',
  },
  {
    category: 'AI & Automation',
    title: 'Where AI delivers the most value in the customer journey',
    description: 'The strongest wins usually happen when AI supports your team and your customer experience, not when it becomes the whole experience.',
    readTime: '5 min read',
    href: '/insights',
  },
  {
    category: 'Website Development',
    title: 'Why better website strategy often matters more than more content',
    description: 'A clear message, stronger conversion paths and calmer UX help businesses turn attention into real business momentum.',
    readTime: '7 min read',
    href: '/insights',
  },
  {
    category: 'Business Automation',
    title: 'The automation stack small businesses actually need',
    description: 'The best systems are simple, measurable and useful to real teams, rather than disconnected tools with added complexity.',
    readTime: '4 min read',
    href: '/insights',
  },
  {
    category: 'Digital Transformation',
    title: 'Digital foundations that support long-term growth',
    description: 'Transformation works best when it improves operations, communication and decision-making across the business, not just the website.',
    readTime: '8 min read',
    href: '/insights',
  },
  {
    category: 'Business Growth',
    title: 'Building a digital engine for consistent, sustainable momentum',
    description: 'Growth planning should connect your offer, systems and customer experience so each part of the journey reinforces the next.',
    readTime: '5 min read',
    href: '/insights',
  },
];

export const metadata: Metadata = {
  title: 'AI & Business Automation Insights',
  description:
    'Practical insights on AI, website development, business automation and digital growth from JimTech AI Studio.',
  alternates: { canonical: 'https://jimtech.online/insights' },
  openGraph: {
    type: 'website',
    url: 'https://jimtech.online/insights',
    title: 'AI & Business Automation Insights | JimTech AI Studio',
    description:
      'JimTech AI Studio shares practical ideas on digital transformation, AI implementation, website strategy, and business automation for modern growth.',
    images: [{ url: '/images/insights-hero.webp.jpeg', width: 1280, height: 720, alt: 'JimTech AI Studio insights and digital strategy hero' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI & Business Automation Insights | JimTech AI Studio',
    description:
      'Read practical insights on AI, website development, automation and digital growth from JimTech AI Studio.',
    images: ['/images/insights-hero.webp.jpeg'],
  },
};

export default function InsightsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="insight-page">
        <section className="insight-hero" aria-labelledby="insights-hero-title">
          <div className="insight-hero__media" aria-hidden="true">
            <Image
              src="/images/insights-hero.webp.jpeg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="insight-hero__image"
            />
          </div>

          <div className="insight-hero__overlay" aria-hidden="true" />

          <div className="jt-container insight-hero__inner">
            <div className="insight-hero__content">
              <p className="eyebrow insight-hero__eyebrow">Insights</p>
              <h1 id="insights-hero-title">
                Ideas, strategy and practical thinking
                <span className="insight-hero__accent">for digital growth.</span>
              </h1>
              <p className="insight-hero__lede">
                Explore practical thinking on AI, websites, automation, digital transformation and the systems that help ambitious businesses grow.
              </p>
              <div className="hero-actions insight-hero__actions">
                <Link href="#featured-insights" className="button button--gold">
                  Explore Insights <Icon name="arrow" size={19} />
                </Link>
                <Link href="/contact" className="button button--outline">
                  Start a Project <Icon name="arrow" size={19} />
                </Link>
              </div>
            </div>
          </div>

          <div className="insight-hero__scroll" aria-label="Scroll to featured insights">
            <span>Explore insights</span>
            <span className="insight-hero__scroll-arrow">
              <Icon name="arrow" size={14} />
            </span>
          </div>
        </section>

        <section id="featured-insights" className="section insight-section">
          <div className="jt-container">
            <div className="insight-section__header">
              <div>
                <p className="eyebrow">Featured insights</p>
                <h2>Editorial thinking for teams building smarter digital systems.</h2>
              </div>
              <Link href="/contact" className="text-link text-link--light">
                Book a strategy call <Icon name="arrow" size={15} />
              </Link>
            </div>

            <div className="insight-grid">
              {insightArticles.map((article) => (
                <article key={article.title} className="insight-card">
                  <div className="insight-card__meta">
                    <span className="insight-card__category">{article.category}</span>
                    <span className="insight-card__time">{article.readTime}</span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <Link href={article.href} className="text-link text-link--light">
                    Read article <Icon name="arrow" size={15} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
