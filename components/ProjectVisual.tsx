import type { Project } from '@/data/projects';
import Image from 'next/image';

export default function ProjectVisual({ project, compact = false, priority = false, fit = 'contain', sizes = '(max-width: 760px) 100vw, (max-width: 1050px) 50vw, 34vw' }: { project: Project; compact?: boolean; priority?: boolean; fit?: 'cover' | 'contain'; sizes?: string }) {
  const image = project.images[0];

  if (image) {
    return (
      <div className={`project-visual project-visual--image${compact ? ' project-visual--compact' : ''}`}>
        <Image
          className={`project-visual__image project-visual__image--${fit}`}
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
        />
        <span className="project-visual__caption">{image.label}</span>
      </div>
    );
  }

  return (
    <div className={`project-visual project-visual--missing${compact ? ' project-visual--compact' : ''}`}>
      <div className="project-image-missing" role="img" aria-label={`Real project screenshot for ${project.title} is not present in the workspace`}>
        <strong>{project.title}</strong>
        <span>Real project screenshot not present in the workspace</span>
      </div>
    </div>
  );
}
