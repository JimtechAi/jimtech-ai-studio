import Link from 'next/link';
import type { Project } from '@/data/projects';
import { Icon } from './Icon';
import ProjectVisual from './ProjectVisual';

export default function ProjectCard({ project, variant = 'standard' }: { project: Project; variant?: 'standard' | 'featured' | 'wide' }) {
  return (
    <article className={`project-card project-card--${variant}`}>
      <Link className="project-card__visual-link" href={`/work/${project.slug}`} aria-label={`View ${project.title} case study`}>
        <ProjectVisual
          project={project}
          fit="cover"
          sizes={variant === 'featured' ? '(max-width: 760px) 100vw, (max-width: 1050px) 50vw, 50vw' : '(max-width: 760px) 100vw, (max-width: 1050px) 50vw, 34vw'}
          priority={variant === 'featured'}
        />
        <span className="project-card__open" aria-hidden="true"><Icon name="arrow" size={18} /></span>
      </Link>
      <div className="project-card__body">
        <p className="project-category">{project.category}</p>
        <h3><Link href={`/work/${project.slug}`}>{project.title}</Link></h3>
        <p>{project.description}</p>
        <Link className="text-link" href={`/work/${project.slug}`} aria-label={`View case study for ${project.title}`}>
          View Case Study <Icon name="arrow" size={17} />
        </Link>
      </div>
    </article>
  );
}
