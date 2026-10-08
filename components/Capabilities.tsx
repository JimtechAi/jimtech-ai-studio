import SectionHeading from './SectionHeading';
import { Icon } from './Icon';

const capabilities = [
  { icon: 'web' as const, number: '01', title: 'Websites', description: 'High-performance websites and digital platforms shaped around your brand, customers and business goals.' },
  { icon: 'spark' as const, number: '02', title: 'AI & Automation', description: 'Thoughtful AI features and automated workflows that reduce repetitive work and support better operations.' },
  { icon: 'growth' as const, number: '03', title: 'Digital Growth', description: 'SEO, conversion thinking and useful digital systems that help businesses reach and serve more customers.' },
];

export default function Capabilities() {
  return (
    <section className="section section--paper" id="capabilities">
      <div className="jt-container">
        <SectionHeading eyebrow="What we do" title="Technology built around your business." description="We combine strategy, design and development to build the digital foundations behind better customer experiences and smoother operations." />
        <div className="capability-grid">
          {capabilities.map((item) => (
            <article className="capability-card" key={item.number}>
              <div className="capability-card__top"><span className="icon-frame"><Icon name={item.icon} size={23} /></span><span className="card-number">{item.number}</span></div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a href="#services" aria-label={`Explore ${item.title}`} className="text-link">Explore capability <Icon name="arrow" size={17} /></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
