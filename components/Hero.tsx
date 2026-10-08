import { Icon } from './Icon';

const signals = ['Custom digital experiences', 'AI & automation', 'Built for business growth'];

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow hero-glow--blue" aria-hidden="true" />
      <div className="hero-glow hero-glow--gold" aria-hidden="true" />
      <div className="jt-container hero-layout">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> Digital systems for ambitious businesses</p>
          <h1 className="hero-title" aria-label="AI-Powered Websites. Automation. Digital Growth.">
            <span className="hero-title__line hero-title__primary">AI-Powered</span>
            <span className="hero-title__line hero-title__primary">Websites.</span>
            <span className="hero-title__line hero-title__accent">Automation.</span>
            <span className="hero-title__line hero-title__accent">Digital Growth.</span>
          </h1>
          <p className="hero-lede">AI-powered websites, automation and digital solutions designed to help ambitious businesses grow, operate smarter and compete globally.</p>
          <div className="hero-actions">
            <a className="button button--gold" href="#contact">Start a Project <Icon name="arrow" size={19} /></a>
            <a className="button button--outline" href="#work"><Icon name="play" size={17} /> Explore Our Work</a>
          </div>
          <div className="hero-signals" aria-label="Our focus">
            {signals.map((signal) => <span key={signal}><Icon name="check" size={15} />{signal}</span>)}
          </div>
        </div>

      </div>
      <a className="hero-scroll" href="#capabilities"><span />Scroll to explore</a>
    </section>
  );
}
