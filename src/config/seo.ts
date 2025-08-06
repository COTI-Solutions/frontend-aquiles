export const seoConfig = {
  // Información básica del sitio
  site: {
    name: 'Aquiles Conecta',
    url: 'https://aquilesconecta.com.ar',
    description: 'Un espacio curado por Ángeles para compartir contenidos digitales que inspiran y transforman. Descubre herramientas, consejos y recursos para tu desarrollo personal y profesional.',
    author: 'Ángeles Gardón',
    authorTitle: 'Fundadora y Creadora de Contenido',
    authorBio: 'Especialista en desarrollo personal y profesional, creadora de contenido digital inspirador',
    email: 'aquilesconecta@gmail.com',
    phone: '+54 9 11 6533-3017',
    address: 'Buenos Aires, Argentina',
    language: 'es',
    country: 'AR',
  },

  // Redes sociales
  social: {
    instagram: 'https://instagram.com/aquilesconecta',
    whatsapp: 'https://wa.me/549116533-3017',
    facebook: 'https://facebook.com/aquilesconecta',
    youtube: 'https://youtube.com/@aquilesconecta',
    tiktok: 'https://tiktok.com/@aquilesconecta',
  },

  // Palabras clave principales basadas en el contenido
  keywords: {
    primary: [
      'desarrollo personal',
      'crecimiento profesional',
      'contenido digital',
      'inspiración',
      'transformación personal',
      'herramientas digitales',
      'consejos profesionales',
      'motivación',
      'productividad',
      'bienestar',
      'Ángeles Gardón',
      'Aquiles Conecta'
    ],
    secondary: [
      'coaching',
      'mentoría',
      'liderazgo',
      'emprendimiento',
      'marketing digital',
      'branding personal',
      'networking',
      'habilidades blandas',
      'gestión del tiempo',
      'mindfulness',
      'recetas para niños',
      'BLW',
      'jardinería',
      'jabones artesanales',
      'reiki',
      'cartas angelicales',
      'escritura',
      'libros de no ficción'
    ],
    longTail: [
      'desarrollo personal argentina',
      'contenido digital inspirador',
      'herramientas para crecimiento profesional',
      'recetas BLW para niños',
      'jardinería para principiantes',
      'jabones artesanales naturales',
      'reiki para principiantes',
      'taller de ángeles y cartas',
      'entrenamiento para escritoras',
      'marca personal digital'
    ]
  },

  // Configuración de Open Graph
  openGraph: {
    defaultImage: '/images/aquiles-conecta-og.jpg',
    imageWidth: 1200,
    imageHeight: 630,
    locale: 'es_AR',
    type: 'website',
    siteName: 'Aquiles Conecta',
  },

  // Configuración de Twitter
  twitter: {
    handle: '@aquilesconecta',
    site: '@aquilesconecta',
    cardType: 'summary_large_image',
    creator: '@aquilesconecta',
  },

  // Configuración de Google Analytics
  analytics: {
    googleAnalyticsId: 'G-XXXXXXXXXX', // Reemplazar con tu ID real
    googleTagManagerId: 'GTM-XXXXXXX', // Reemplazar con tu ID real
    facebookPixelId: 'XXXXXXXXXX', // Reemplazar con tu ID real
  },

  // Configuración de verificación
  verification: {
    google: 'tu-codigo-de-verificacion-google',
    bing: 'tu-codigo-de-verificacion-bing',
    yandex: 'tu-codigo-de-verificacion-yandex',
    facebook: 'tu-codigo-de-verificacion-facebook',
  },

  // Estructura de navegación
  navigation: {
    main: [
      { name: 'Inicio', url: '/', priority: 1.0 },
      { name: 'Productos', url: '/productos', priority: 0.9 },
      { name: 'Sobre Mí', url: '/sobre-mi', priority: 0.8 },
      { name: 'Blog', url: '/blog', priority: 0.7 },
      { name: 'Recursos', url: '/recursos', priority: 0.6 },
      { name: 'Contacto', url: '/contacto', priority: 0.5 },
    ],
    footer: [
      { name: 'Política de Privacidad', url: '/politica-privacidad' },
      { name: 'Términos y Condiciones', url: '/terminos-condiciones' },
      { name: 'Cookies', url: '/cookies' },
      { name: 'Política de Afiliados', url: '/politica-afiliados' },
    ]
  },

  // Configuración de rendimiento
  performance: {
    imageOptimization: true,
    lazyLoading: true,
    preloadCriticalResources: true,
    cacheStrategy: 'stale-while-revalidate',
    compression: true,
    minification: true,
  },

  // Configuración de productos de afiliación
  products: {
    categories: [
      'desarrollo personal',
      'recetas y cocina',
      'jardinería',
      'artesanías',
      'espiritualidad',
      'escritura'
    ],
    featured: [
      'Bocaditos Felices',
      'Taller de Ángeles y Lectura de Cartas',
      '25 Errores Comunes en Jardinería',
      'Curso de Jabones Artesanales',
      'Entrenamiento para Escritoras',
      'Reiki para Principiantes'
    ]
  }
}

// Función para generar títulos SEO
export const generateSEOTitle = (pageTitle: string, includeBrand = true): string => {
  const brand = 'Aquiles Conecta'
  const maxLength = 60
  const title = includeBrand ? `${pageTitle} | ${brand}` : pageTitle
  return title.length > maxLength ? title.substring(0, maxLength - 3) + '...' : title
}

// Función para generar descripciones SEO
export const generateSEODescription = (description: string, maxLength = 160): string => {
  if (description.length <= maxLength) return description
  return description.substring(0, maxLength - 3) + '...'
}

// Función para generar URLs canónicas
export const generateCanonicalURL = (path: string): string => {
  return `${seoConfig.site.url}${path}`
}

// Función para generar structured data
export const generateStructuredData = (type: 'organization' | 'person' | 'article' | 'product', data: Record<string, unknown>) => {
  const baseData = {
    "@context": "https://schema.org",
    "@type": type === 'organization' ? "Organization" : 
             type === 'person' ? "Person" : 
             type === 'article' ? "Article" : "Product",
  }

  return {
    ...baseData,
    ...data
  }
}

// Función para generar breadcrumbs structured data
export const generateBreadcrumbData = (breadcrumbs: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `${seoConfig.site.url}${crumb.url}`
    }))
  }
}

// Función para generar FAQ structured data
export const generateFAQData = (faqs: Array<{question: string, answer: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
} 