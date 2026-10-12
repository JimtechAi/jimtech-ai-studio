import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: { absolute: 'Page not found | JimTech AI Studio' },
  description: 'The page you requested could not be found.',
  robots: { index: false, follow: true },
  alternates: { canonical: null },
  openGraph: null,
  twitter: null,
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="section section--dark not-found-page">
        <div className="jt-container not-found-content">
          <p className="eyebrow">404 · Page not found</p>
          <h1>This page isn’t here.</h1>
          <p>The link may be outdated or the address may have changed. Explore our work or return to the homepage.</p>
          <div className="not-found-actions">
            <Link className="button button--gold" href="/">Return home</Link>
            <Link className="button button--outline" href="/work">Explore selected work</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
