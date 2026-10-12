import SectionHeading from './SectionHeading';
import { Icon } from './Icon';
import ContactForm from './ContactForm';
import { contactInfo } from '@/data/contact';

export default function ContactSection({ pageHeading = false }: { pageHeading?: boolean }) {
  return (
    <section className="section section--dark contact-section" id="contact">
      <div className="jt-container">
        <div className="contact-heading"><SectionHeading eyebrow="Start a conversation" title="Let’s Build Something That Moves Your Business Forward." description="Tell us what you want to build, improve or automate. We’ll follow up to understand the project and discuss a sensible next step." light level={pageHeading ? 1 : 2} /></div>
        <div className="contact-layout">
          <div className="contact-copy"><p className="contact-lede">Let’s build something useful for your business.</p><p>Whether you need a new website, a smarter workflow or a connected digital platform, start with a conversation.</p>
            <div className="contact-methods">
              <a href={`mailto:${contactInfo.email}`}><span><Icon name="mail" size={19} /></span><div><small>Email</small><strong>{contactInfo.email}</strong></div></a>
              <a href={`tel:${contactInfo.phoneInternational}`}><span><Icon name="phone" size={19} /></span><div><small>Phone</small><strong>{contactInfo.phoneDisplay}</strong></div></a>
              <a href={contactInfo.whatsappUrl} target="_blank" rel="noopener noreferrer"><span><Icon name="arrow" size={19} /></span><div><small>WhatsApp</small><strong>Chat with JimTech</strong></div></a>
            </div>
            <p className="contact-location"><Icon name="pin" size={17} /> Lagos, Nigeria · Working internationally</p>
          </div>
          <div className="contact-form-panel"><ContactForm /></div>
        </div>
      </div>
    </section>
  );
}
