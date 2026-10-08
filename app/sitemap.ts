import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://jimtech.online/', changeFrequency: 'monthly', priority: 1 },
    { url: 'https://jimtech.online/services', changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://jimtech.online/work', changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://jimtech.online/about', changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://jimtech.online/insights', changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://jimtech.online/contact', changeFrequency: 'monthly', priority: 0.9 },
    ...projects.map((project) => ({
      url: `https://jimtech.online/work/${project.slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
