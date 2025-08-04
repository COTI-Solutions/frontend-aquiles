import Head from 'next/head'

interface SEOProps {
    title?: string
    description?: string
    keywords?: string[]
    image?: string
    url?: string
    type?: 'website' | 'article'
    author?: string
    publishedTime?: string
    modifiedTime?: string
}

export default function SEO({
    title = 'Aquiles Conecta - Tu fuente de conocimiento para el crecimiento personal y profesional',
    description = 'Un espacio curado por Ángeles para compartir contenidos digitales que inspiran y transforman.',
    keywords = ['desarrollo personal', 'crecimiento profesional', 'contenido digital'],
    image = '/images/aquiles-conecta-og.jpg',
    url = 'https://aquilesconecta.com.ar',
    type = 'website',
    author = 'Ángeles Gardón',
    publishedTime,
    modifiedTime
}: SEOProps) {
    const fullTitle = title.includes('Aquiles Conecta') ? title : `${title} | Aquiles Conecta`

    return (
        <Head>
            {/* Meta tags básicos */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords.join(', ')} />
            <meta name="author" content={author} />

            {/* Canonical URL */}
            <link rel="canonical" href={url} />

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={`https://aquilesconecta.com.ar${image}`} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content="Aquiles Conecta" />
            <meta property="og:locale" content="es_AR" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={`https://aquilesconecta.com ${image}`} />
            <meta name="twitter:creator" content="@aquilesconecta" />

            {/* Article specific meta tags */}
            {type === 'article' && (
                <>
                    <meta property="article:author" content={author} />
                    {publishedTime && <meta property="article:published_time" content={publishedTime} />}
                    {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
                </>
            )}

            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": type === 'article' ? "Article" : "WebPage",
                        "headline": fullTitle,
                        "description": description,
                        "image": `https://aquilesconecta.com.ar${image}`,
                        "url": url,
                        "author": {
                            "@type": "Person",
                            "name": author,
                            "description": "Especialista en desarrollo personal y profesional"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "Aquiles Conecta",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://aquilesconecta.com.ar/images/AquilesLogo.png"
                            }
                        },
                        ...(type === 'article' && {
                            "datePublished": publishedTime,
                            "dateModified": modifiedTime || publishedTime
                        })
                    })
                }}
            />
        </Head>
    )
} 