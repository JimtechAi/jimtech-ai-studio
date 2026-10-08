import SectionHeading from './SectionHeading';
import { Icon } from './Icon';

const steps = [
  ['01', 'Discover', 'Understand your business, audience, goals and requirements.'],
  ['02', 'Strategy', 'Shape the structure, user journey, technology and growth direction.'],
  ['03', 'Design', 'Create a clear visual direction and considered user experience.'],
  ['04', 'Build', 'Develop the website or digital system using modern technology.'],
  ['05', 'Integrate', 'Connect the tools, data, APIs and automations the project needs.'],
  ['06', 'Launch', 'Test, refine, deploy and prepare the project for its next stage.'],
  ['07', 'Support', 'Keep improving, maintaining and adapting the platform over time.'],
];

const technologies = ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Cloudinary', 'Vercel', 'GitHub', 'AI APIs', 'Payment integrations', 'Google Analytics', 'Google Search Console'];

export default function ProcessAndTechnology() {
  return (
    <>
      <section className="section section--paper" id="process">
        <div className="jt-container">
          <SectionHeading eyebrow="A clear path forward" title="How we build." description="A collaborative process that keeps business goals, customer experience and technical quality connected at every stage." />
          <div className="process-grid">{steps.map(([number, title, description]) => <article className="process-step" key={number}><span className="process-step__number">{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
        </div>
      </section>
      <section className="technology-band" aria-labelledby="technology-title">
        <div className="jt-container technology-layout">
          <div><p className="eyebrow">The right tools for the work</p><h2 id="technology-title">Technology should support the business story.</h2><p>We choose tools based on the needs of each project—not because a technology is fashionable. These are among the platforms and tools relevant to our work.</p></div>
          <ul className="technology-list">{technologies.map((technology) => <li key={technology}><Icon name="check" size={14} />{technology}</li>)}</ul>
        </div>
      </section>
    </>
  );
}
