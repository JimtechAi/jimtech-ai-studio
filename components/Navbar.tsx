'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Icon } from './Icon';

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobileNav, setIsMobileNav] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 760px)');
    const updateMobileNav = () => setIsMobileNav(mediaQuery.matches);
    updateMobileNav();
    mediaQuery.addEventListener('change', updateMobileNav);
    return () => mediaQuery.removeEventListener('change', updateMobileNav);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        <Link className="brand" href="/" aria-label="JimTech AI Studio home">
          <Image src="/jimtech-ai-studio-logo.png" alt="JimTech AI Studio" width={612} height={408} loading="eager" className="brand__logo" />
        </Link>
        <button
          className="nav-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} size={23} />
        </button>
        <div id="primary-navigation" className={`nav-links${menuOpen ? ' nav-links--open' : ''}`} aria-hidden={isMobileNav && !menuOpen} inert={isMobileNav && !menuOpen}>
          {navigation.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)} className={isActive ? 'active' : ''}>{item.label}</Link>
            );
          })}
          <Link className="button button--gold nav-cta" href="/contact" onClick={() => setMenuOpen(false)}>
            Start a Project <Icon name="arrow" size={18} />
          </Link>
        </div>
      </nav>
    </header>
  );
}
