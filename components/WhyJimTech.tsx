import SectionHeading from './SectionHeading';
import { Icon } from './Icon';

const reasons = [
  { icon: 'growth' as const, title: 'Business first', description: 'We start with the objective and the people you serve—not just a visual direction.' },
  { icon: 'spark' as const, title: 'AI-ready', description: 'We build digital experiences that can evolve with useful AI and automation.' },
  { icon: 'search' as const, title: 'Built for growth', description: 'We consider visibility, customer acquisition and conversion from the start.' },
  { icon: 'layers' as const, title: 'Modern technology', description: 'We choose contemporary tools and scalable architecture that fit the work.' },
  { icon: 'support' as const, title: 'Human support', description: 'You work directly with the team through decisions, delivery and next steps.' },
  { icon: 'shield' as const, title: 'Long-term thinking', description: 'We aim for a useful foundation your business can keep improving over time.' },
];

export default function WhyJimTech() {
  return (
    <section className="section section--ink">
      <div className="jt-container">
        <SectionHeading eyebrow="The JimTech approach" title="Why businesses choose JimTech." description="Technology matters most when it makes a real difference to how your business works and how customers experience it." light />
        <div className="reason-grid">
          {reasons.map((reason) => <article className="reason-card" key={reason.title}><span className="reason-icon"><Icon name={reason.icon} size={21} /></span><div><h3>{reason.title}</h3><p>{reason.description}</p></div></article>)}
        </div>
      </div>
    </section>
  );
}
