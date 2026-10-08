import { contactInfo } from '@/data/contact';
import { Icon } from './Icon';

export default function WhatsAppButton() {
  return (
    <a className="whatsapp-button" href={contactInfo.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat with JimTech AI Studio on WhatsApp">
      <span className="whatsapp-button__dot" />WhatsApp <Icon name="arrow" size={17} />
    </a>
  );
}
