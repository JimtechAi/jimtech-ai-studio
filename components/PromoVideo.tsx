import SectionHeading from './SectionHeading';
import { Icon } from './Icon';

export default function PromoVideo() {
  return (
    <section className="section section--soft promo-video-section" id="promo-video">
      <div className="jt-container">
        <SectionHeading
          eyebrow="JimTech in 20 seconds"
          title="Technology should solve problems."
          description="A short look at how JimTech AI Studio builds websites, automation and AI solutions around real business needs."
          light
        />
        <div className="promo-video">
          {/* Click-to-play: nothing but the poster loads until the visitor presses play. */}
          <video
            controls
            playsInline
            preload="none"
            width={1920}
            height={1080}
            poster="/videos/jimtech/jimtech-ai-studio-promo-poster.jpg"
            aria-label="JimTech AI Studio promotional video: premium websites, AI and business automation, and how to start a project"
          >
            <source src="/videos/jimtech/jimtech-ai-studio-promo.mp4" type="video/mp4" />
            Your browser does not support embedded video. You can start a project with us using the button below.
          </video>
        </div>
        <div className="promo-video-cta">
          <a className="button button--gold" href="#contact">Start a Project <Icon name="arrow" size={19} /></a>
        </div>
      </div>
    </section>
  );
}
