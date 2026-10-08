import SectionHeading from './SectionHeading';
import { Icon } from './Icon';
import Link from 'next/link';

const services = [
  { icon: 'web' as const, title: 'Website Development', description: 'Business and corporate websites, e-commerce, booking systems, portfolios and custom web applications.' },
  { icon: 'spark' as const, title: 'AI & Automation', description: 'Useful AI features, assistants and connected workflows for customer communication, lead management, bookings and repetitive business tasks.' },
  { icon: 'cart' as const, title: 'E-commerce', description: 'Online shops with product management, customer accounts, orders and payment integration architecture.' },
  { icon: 'design' as const, title: 'UI/UX Design', description: 'Responsive interfaces, design systems and customer journeys created to make digital products easier to use.' },
  { icon: 'search' as const, title: 'SEO & Growth', description: 'Technical SEO, metadata, structured data, performance and analytics foundations for discoverability.' },
  { icon: 'cloud' as const, title: 'Cloud & Maintenance', description: 'Deployment, integrations, security improvements, maintenance and ongoing technical support.' },
];

export default function Services() {
  return (
    <section className="section section--dark" id="services">
      <div className="jt-container">
        <SectionHeading eyebrow="How we can help" title="Digital services with a business purpose." description="Bring us a specific challenge or a bigger idea. We’ll help shape the right digital solution for where your business is going." light />
        <div className="services-grid">
          {services.map((service, index) => (
            <article className="service-card" key={service.title}>
              <div className="service-card__head"><span className="icon-frame icon-frame--dark"><Icon name={service.icon} size={22} /></span><span className="card-number">0{index + 1}</span></div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <Link className="text-link text-link--light" href="/#contact">Learn more <Icon name="arrow" size={16} /></Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
