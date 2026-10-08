import Link from 'next/link';
import { portfolioProjects } from '@/data/projects';
import { Icon } from './Icon';
import ProjectCard from './ProjectCard';

export default function SelectedWork() {
  return (
    <section className="section section--paper" id="work">
      <div className="jt-container">
        <div className="work-heading">
          <div><p className="eyebrow">Selected work</p><h2>Built for real businesses.<br /><span>Designed for what’s next.</span></h2></div>
          <p>Explore a selection of digital experiences and systems built around the needs of the people and businesses behind them.</p>
        </div>
        <div className="project-showcase">
          {portfolioProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} variant={index < 2 ? 'featured' : 'standard'} />
          ))}
        </div>
        <div className="work-more"><Link className="button button--outline-dark" href="/work">Explore all projects <Icon name="arrow" size={18} /></Link><span>Project stories focus on the work delivered, not unverified metrics.</span></div>
      </div>
    </section>
  );
}
