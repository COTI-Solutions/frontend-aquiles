import { MetadataRoute } from 'next'
import { seoConfig } from '@/config/seo'
import affiliations from '@/affiliations.json'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = seoConfig.site.url
    const currentDate = new Date()

    // Páginas principales
    const mainPages = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'daily' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/productos`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/sobre-mi`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/recursos`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/contacto`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        },
    ]

    // Páginas legales
    const legalPages = [
        {
            url: `${baseUrl}/politica-privacidad`,
            lastModified: currentDate,
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terminos-condiciones`,
            lastModified: currentDate,
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
        {
            url: `${baseUrl}/cookies`,
            lastModified: currentDate,
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
        {
            url: `${baseUrl}/politica-afiliados`,
            lastModified: currentDate,
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
    ]

    // Páginas de productos de afiliación
    const productPages = affiliations.affiliations.map((product) => ({
        url: `${baseUrl}/producto/${product.id}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    // Páginas de categorías
    const categoryPages = seoConfig.products.categories.map((category) => ({
        url: `${baseUrl}/categoria/${category.replace(/\s+/g, '-').toLowerCase()}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    return [
        ...mainPages,
        ...legalPages,
        ...productPages,
        ...categoryPages,
    ]
} 