import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectDetail from '@/components/ProjectDetail';
import { getProjectBySlug, projects } from '@/data/projects';

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project not found' };

  return {
    title: `${project.title} Case Study`,
    description: project.description,
    alternates: { canonical: `https://jimtech.online/work/${project.slug}` },
    openGraph: {
      title: `${project.title} | JimTech AI Studio`,
      description: project.description,
      url: `https://jimtech.online/work/${project.slug}`,
      type: 'article',
      images: project.images[0] ? [{ url: project.images[0].src, alt: project.images[0].alt, width: project.images[0].width, height: project.images[0].height }] : undefined,
    },
    twitter: {
      card: project.images[0] ? 'summary_large_image' : 'summary',
      title: `${project.title} | JimTech AI Studio`,
      description: project.description,
      images: project.images[0] ? [project.images[0].src] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://jimtech.online' },
      { '@type': 'ListItem', position: 2, name: 'Work', item: 'https://jimtech.online/work' },
      { '@type': 'ListItem', position: 3, name: project.title, item: `https://jimtech.online/work/${project.slug}` },
    ],
  };

  return (
    <>
      <Navbar />
      <ProjectDetail project={project} />
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}
