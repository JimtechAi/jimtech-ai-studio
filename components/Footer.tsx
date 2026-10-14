import Image from 'next/image';
import Link from 'next/link';
import { contactInfo } from '@/data/contact';
import { Icon } from './Icon';
import CookiePreferencesButton from './CookiePreferencesButton';

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="jt-container">
        <div className="footer-grid">
          <div className="footer-brand-block">
            <Link href="/" aria-label="JimTech AI Studio home">
              <Image src="/jimtech-ai-studio-logo.png" alt="JimTech AI Studio" width={612} height={408} className="footer-logo" />
            </Link>
            <p>AI-Powered Websites. Automation. Digital Growth.</p>
            <span className="footer-location"><Icon name="pin" size={16} /> Lagos, Nigeria · Working globally</span>
          </div>
          <div>
            <h2 className="footer-title">Explore</h2>
            <ul className="footer-list">{footerLinks.map((link) => <li key={link.label}><Link href={link.href}>{link.label}</Link></li>)}</ul>
          </div>
          <div>
            <h2 className="footer-title">Services</h2>
            <ul className="footer-list">
              {['Website Development', 'AI & Automation', 'E-commerce', 'UI/UX Design', 'SEO & Growth', 'Cloud & Maintenance'].map((service) => <li key={service}><Link href="/services">{service}</Link></li>)}
            </ul>
          </div>
          <div>
            <h2 className="footer-title">Start a conversation</h2>
            <ul className="footer-list footer-contact-list">
              <li><a href={`mailto:${contactInfo.email}`}><Icon name="mail" size={17} />{contactInfo.email}</a></li>
              <li><a href={`tel:${contactInfo.phoneInternational}`}><Icon name="phone" size={17} />{contactInfo.phoneDisplay}</a></li>
              <li><a href={contactInfo.whatsappUrl} target="_blank" rel="noopener noreferrer"><Icon name="arrow" size={17} />WhatsApp us</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} JimTech AI Studio</span><span className="footer-legal"><Link href="/privacy">Privacy Notice</Link><CookiePreferencesButton /></span><span>Built around real business problems.</span></div>
      </div>
    </footer>
  );
}
