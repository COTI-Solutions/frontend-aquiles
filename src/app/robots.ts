import { MetadataRoute } from 'next'
import { seoConfig } from '@/config/seo'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/admin/',
                    '/private/',
                    '/_next/',
                    '/static/',
                    '*.json',
                ],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: [
                    '/api/',
                    '/admin/',
                    '/private/',
                ],
            },
            {
                userAgent: 'Bingbot',
                allow: '/',
                disallow: [
                    '/api/',
                    '/admin/',
                    '/private/',
                ],
            },
        ],
        sitemap: `${seoConfig.site.url}/sitemap.xml`,
        host: seoConfig.site.url,
    }
} 