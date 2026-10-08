import SectionHeading from './SectionHeading';
import { Icon } from './Icon';

const focusAreas = [
  { number: '01', title: 'Make the next step clear', text: 'A good digital experience helps the right people understand what you offer and what to do next.' },
  { number: '02', title: 'Connect the work behind the scenes', text: 'Forms, bookings and customer communication can become part of a more coherent business workflow.' },
  { number: '03', title: 'Build a foundation you can grow', text: 'Your digital presence should be easier to improve as your audience, services and ambitions evolve.' },
];

export function About() {
  return (
    <section className="section section--paper about-section" id="about">
      <div className="jt-container about-layout">
        <div className="about-statement"><p className="eyebrow">About JimTech</p><h2>We build technology around <span>real business problems.</span></h2><p>JimTech brings design, software development, AI, automation and digital strategy together with an understanding of how businesses serve customers and get work done. We work alongside ambitious teams to turn that understanding into useful digital experiences and systems—not just a launch-day website.</p><a className="text-link" href="#contact">Let’s talk about your business <Icon name="arrow" size={17} /></a></div>
        <div className="about-note"><span className="about-note__mark">JT</span><p>AI-Powered Websites.<br />Automation.<br /><strong>Digital Growth.</strong></p><span className="about-note__location"><Icon name="pin" size={16} /> Founded in Lagos, Nigeria</span></div>
      </div>
    </section>
  );
}

export function Insights() {
  return (
    <section className="section section--soft" id="insights">
      <div className="jt-container">
        <SectionHeading eyebrow="Ideas for your next step" title="What we build for." description="A few practical principles we bring to digital projects—grounded in business needs, not technology for its own sake." />
        <div className="insight-grid">{focusAreas.map((item) => <article className="insight-card" key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </div>
    </section>
  );
}
