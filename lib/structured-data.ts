import type { Metadata } from 'next';

const SITE_URL = 'https://www.jimtech.online';

export const WEBSITE_ID = `${SITE_URL}/#website`;

// Builds a page's WebPage JSON-LD from its own metadata so it always matches the canonical and title.
export function webPageSchema(path: string, { title, description }: Pick<Metadata, 'title' | 'description'>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: typeof title === 'string' ? title : undefined,
    url: `${SITE_URL}${path}`,
    description: description ?? undefined,
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: 'en-NG',
  };
}
