import Link from 'next/link';
import type { Project } from '@/data/projects';
import { Icon } from './Icon';
import ProjectVisual from './ProjectVisual';
import ProjectGallery from './ProjectGallery';

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <main className="case-main">
      <section className="case-hero section--dark">
        <div className="jt-container">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/work">Work</Link><span>/</span><span aria-current="page">{project.title}</span></nav>
          <div className="case-hero__layout">
            <div><p className="eyebrow">{project.category}</p><h1>{project.title}</h1>{project.positioning ? <p className="case-positioning">{project.positioning}</p> : null}<p className="case-intro">{project.description}</p>
              <div className="case-links">{project.website ? <a className="button button--gold" href={project.website} target="_blank" rel="noopener noreferrer">{project.slug === 'curvesnspice' ? 'Visit Live Website' : project.slug === 'the-vine-cleaners' ? 'Visit website' : 'Visit live project'} <Icon name="external" size={17} /></a> : null}{project.sourceUrl ? <a className="button button--outline" href={project.sourceUrl} target="_blank" rel="noopener noreferrer">View source <Icon name="external" size={17} /></a> : null}</div>
            </div>
            <div className="case-hero__visual"><ProjectVisual project={project} priority fit="contain" /></div>
          </div>
        </div>
      </section>
      <section className="section section--paper">
        <div className="jt-container case-overview">
          <aside className="case-overview__label"><p className="eyebrow">Project overview</p><h2>Digital work, shaped around the business.</h2></aside>
          <div className="case-overview__body"><p>{project.description}</p>{project.outcome ? <p>{project.outcome}</p> : null}</div>
        </div>
      </section>
      {project.challenge || project.solution ? (
        <section className="section section--soft">
          <div className="jt-container case-problem-grid">
            {project.challenge ? <article className="case-story"><span className="case-story__index">01 / THE CHALLENGE</span><h2>The challenge</h2><p>{project.challenge}</p></article> : null}
            {project.solution ? <article className="case-story case-story--accent"><span className="case-story__index">02 / THE APPROACH</span><h2>Our approach</h2><p>{project.solution}</p></article> : null}
          </div>
        </section>
      ) : null}
      {project.features?.length ? (
        <section className="section section--paper">
          <div className="jt-container case-build-grid">
            <div><p className="eyebrow">What we built</p><h2>Key features.</h2>{project.solution ? <p className="case-build-intro">{project.solution}</p> : null}</div>
            <div className="feature-list">{project.features.map((feature) => <div className="feature-row" key={feature}><Icon name="check" size={18} /><span>{feature}</span></div>)}</div>
          </div>
        </section>
      ) : null}
      {project.technologies !== undefined ? <section className="technology-band case-tech"><div className="jt-container"><p className="eyebrow">Technology & integrations</p><h2>Tools chosen to support the work.</h2>{project.technologies.length > 0 ? <div className="case-tech__list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div> : <p className="case-tech-note">We publish implementation details only where they are confirmed for this project.</p>}</div></section> : null}
      {project.outcome ? <section className="section section--dark case-impact"><div className="jt-container case-impact__inner"><div><p className="eyebrow">Business impact</p><h2>Clearer experiences.<br /><span>More connected workflows.</span></h2></div><p>{project.outcome}</p></div></section> : null}
      <section className="section section--soft case-gallery-section">
        <div className="jt-container"><p className="eyebrow">Visual gallery</p><h2 className="case-gallery-title">A closer look at the experience.</h2><ProjectGallery project={project} /></div>
      </section>
      <section className="case-cta"><div className="jt-container case-cta__inner"><div><p className="eyebrow">Have a similar project?</p><h2>Let’s build it around your business.</h2></div><Link href="/#contact" className="button button--gold">Start a Project <Icon name="arrow" size={18} /></Link></div></section>
    </main>
  );
}
