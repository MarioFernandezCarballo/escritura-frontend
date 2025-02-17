import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/login',
                    '/create-post',
                    '/subscribers',
                ],
            },
        ],
        sitemap: 'https://mariocarballo.es/sitemap.xml',
        host: 'https://mariocarballo.es',
    };
}
