import Image from 'next/image';
import type { Project } from '@/data/projects';

export default function ProjectGallery({ project }: { project: Project }) {
  if (project.images.length > 0) {
    return (
      <div className="case-gallery-images">
        {project.images.map((image) => <figure className="case-gallery-image" key={image.src}><Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 760px) 100vw, 50vw" /><figcaption>{image.label}</figcaption></figure>)}
      </div>
    );
  }

  return (
    <p className="case-gallery-unavailable">No project screenshots for {project.title} are present in the current workspace.</p>
  );
}
