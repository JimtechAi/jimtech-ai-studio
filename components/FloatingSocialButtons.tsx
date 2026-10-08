import { contactInfo } from '@/data/contact';
import { Icon } from './Icon';

export default function FloatingSocialButtons() {
  return (
    <div className="floating-socials" aria-label="Social media links">
      <a
        className="floating-socials__button floating-socials__button--instagram"
        href={contactInfo.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow JimTech AI Studio on Instagram"
      >
        <Icon name="instagram" size={22} />
      </a>
      <a
        className="floating-socials__button floating-socials__button--whatsapp"
        href={contactInfo.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with JimTech on WhatsApp"
      >
        <Icon name="whatsapp" size={22} />
      </a>
    </div>
  );
}
