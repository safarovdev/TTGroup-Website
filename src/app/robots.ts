import { type MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = 'https://triptransfers.uz/sitemap.xml';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/admin/',
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
