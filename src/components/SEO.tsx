import Head from 'next/head';
import { seoConfig, generateSEOTitle, generateSEODescription, generateCanonicalURL, generateStructuredData, generateBreadcrumbData, generateFAQData } from '@/config/seo';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string[];
    canonical?: string;
    ogImage?: string;
    ogType?: 'website' | 'article' | 'product';
    structuredData?: {
        type: 'organization' | 'person' | 'article' | 'product';
        data: Record<string, unknown>;
    };
    breadcrumbs?: Array<{ name: string, url: string }>;
    faqs?: Array<{ question: string, answer: string }>;
    noIndex?: boolean;
    noFollow?: boolean;
}

export default function SEO({
    title,
    description,
    keywords = [],
    canonical,
    ogImage = seoConfig.openGraph.defaultImage,
    ogType = 'website',
    structuredData,
    breadcrumbs,
    faqs,
    noIndex = false,
    noFollow = false,
}: SEOProps) {
    const pageTitle = title ? generateSEOTitle(title) : seoConfig.site.name;
    const pageDescription = description ? generateSEODescription(description) : seoConfig.site.description;
    const pageKeywords = [...seoConfig.keywords.primary, ...keywords].join(', ');
    const canonicalURL = canonical ? generateCanonicalURL(canonical) : seoConfig.site.url;

    return (
        <Head>
            {/* Meta tags básicos */}
            <title>{pageTitle}</title>
            <meta name="description" content={pageDescription} />
            <meta name="keywords" content={pageKeywords} />
            <link rel="canonical" href={canonicalURL} />

            {/* Robots */}
            <meta name="robots" content={`${noIndex ? 'noindex' : 'index'}, ${noFollow ? 'nofollow' : 'follow'}`} />

            {/* Open Graph */}
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={pageDescription} />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={canonicalURL} />
            <meta property="og:image" content={`${seoConfig.site.url}${ogImage}`} />
            <meta property="og:image:width" content={seoConfig.openGraph.imageWidth.toString()} />
            <meta property="og:image:height" content={seoConfig.openGraph.imageHeight.toString()} />
            <meta property="og:locale" content={seoConfig.openGraph.locale} />
            <meta property="og:site_name" content={seoConfig.site.name} />

            {/* Twitter Card */}
            <meta name="twitter:card" content={seoConfig.twitter.cardType} />
            <meta name="twitter:site" content={seoConfig.twitter.site} />
            <meta name="twitter:creator" content={seoConfig.twitter.creator} />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={pageDescription} />
            <meta name="twitter:image" content={`${seoConfig.site.url}${ogImage}`} />

            {/* Structured Data */}
            {structuredData && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(generateStructuredData(structuredData.type, structuredData.data))
                    }}
                />
            )}

            {/* Breadcrumbs Structured Data */}
            {breadcrumbs && breadcrumbs.length > 0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(generateBreadcrumbData(breadcrumbs))
                    }}
                />
            )}

            {/* FAQ Structured Data */}
            {faqs && faqs.length > 0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(generateFAQData(faqs))
                    }}
                />
            )}

            {/* Meta tags adicionales */}
            <meta name="author" content={seoConfig.site.author} />
            <meta name="publisher" content={seoConfig.site.name} />
            <meta name="copyright" content={`© ${new Date().getFullYear()} ${seoConfig.site.name}. Todos los derechos reservados.`} />

            {/* Geo tags */}
            <meta name="geo.region" content="AR" />
            <meta name="geo.placename" content="Buenos Aires" />
            <meta name="geo.position" content="-34.6037;-58.3816" />
            <meta name="ICBM" content="-34.6037, -58.3816" />

            {/* DC tags */}
            <meta name="DC.title" content={pageTitle} />
            <meta name="DC.creator" content={seoConfig.site.author} />
            <meta name="DC.subject" content={pageKeywords} />
            <meta name="DC.description" content={pageDescription} />
            <meta name="DC.publisher" content={seoConfig.site.name} />
            <meta name="DC.date" content={new Date().toISOString()} />
            <meta name="DC.type" content="Text" />
            <meta name="DC.format" content="text/html" />
            <meta name="DC.identifier" content={canonicalURL} />
            <meta name="DC.language" content="es" />
            <meta name="DC.coverage" content="Argentina" />
            <meta name="DC.rights" content={`© ${new Date().getFullYear()} ${seoConfig.site.name}. Todos los derechos reservados.`} />
        </Head>
    );
}

// Componente SEO específico para productos de afiliación
export function ProductSEO({
    product,
    ...props
}: SEOProps & {
    product: {
        title: string;
        description: string;
        price: string;
        image: string;
        linkToPay: string;
    }
}) {
    const productStructuredData = generateStructuredData('product', {
        name: product.title,
        description: product.description,
        image: product.image,
        offers: {
            "@type": "Offer",
            price: product.price.replace(/[^\d]/g, ''),
            priceCurrency: "ARS",
            availability: "https://schema.org/InStock",
            url: product.linkToPay,
            seller: {
                "@type": "Organization",
                name: seoConfig.site.name
            }
        },
        brand: {
            "@type": "Brand",
            name: seoConfig.site.name
        },
        category: "Digital Product"
    });

    return (
        <SEO
            title={product.title}
            description={product.description}
            ogType="product"
            ogImage={product.image}
            structuredData={{
                type: 'product',
                data: productStructuredData
            }}
            {...props}
        />
    );
}

// Componente SEO específico para artículos/blog
export function ArticleSEO({
    article,
    ...props
}: SEOProps & {
    article: {
        title: string;
        description: string;
        content: string;
        author: string;
        publishedAt: string;
        updatedAt?: string;
        image: string;
        tags: string[];
    }
}) {
    const articleStructuredData = generateStructuredData('article', {
        headline: article.title,
        description: article.description,
        image: article.image,
        author: {
            "@type": "Person",
            name: article.author
        },
        publisher: {
            "@type": "Organization",
            name: seoConfig.site.name,
            logo: {
                "@type": "ImageObject",
                url: `${seoConfig.site.url}/images/AquilesLogo.png`
            }
        },
        datePublished: article.publishedAt,
        dateModified: article.updatedAt || article.publishedAt,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": props.canonical || seoConfig.site.url
        },
        keywords: article.tags.join(', '),
        articleSection: "Desarrollo Personal"
    });

    return (
        <SEO
            title={article.title}
            description={article.description}
            keywords={article.tags}
            ogType="article"
            ogImage={article.image}
            structuredData={{
                type: 'article',
                data: articleStructuredData
            }}
            {...props}
        />
    );
} 