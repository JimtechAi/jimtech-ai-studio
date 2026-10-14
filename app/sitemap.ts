import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://www.jimtech.online/', changeFrequency: 'monthly', priority: 1 },
    { url: 'https://www.jimtech.online/services', changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://www.jimtech.online/work', changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.jimtech.online/about', changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.jimtech.online/insights', changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.jimtech.online/contact', changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://www.jimtech.online/privacy', changeFrequency: 'yearly', priority: 0.3 },
    ...projects.map((project) => ({
      url: `https://www.jimtech.online/work/${project.slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
