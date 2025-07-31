export const seoConfig = {
  // Información básica del sitio
  site: {
    name: 'Aquiles Conecta',
    url: 'https://aquilesconecta.com.ar',
    description: 'Un espacio curado por Ángeles para compartir contenidos digitales que inspiran y transforman.',
    author: 'Ángeles Gardón',
    authorTitle: 'Fundadora y Creadora de Contenido',
    authorBio: 'Especialista en desarrollo personal y profesional',
    email: 'aquilesconecta@gmail.com',
    phone: '+54 9 11 1234-5678',
    address: 'Buenos Aires, Argentina',
  },

  // Redes sociales
  social: {
    instagram: 'https://instagram.com/aquilesconecta',
    whatsapp: 'https://wa.me/1234567890',
  },

  // Palabras clave principales
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
      'bienestar'
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
      'mindfulness'
    ]
  },

  // Configuración de Open Graph
  openGraph: {
    defaultImage: '/images/aquiles-conecta-og.jpg',
    imageWidth: 1200,
    imageHeight: 630,
    locale: 'es_AR',
    type: 'website',
  },

  // Configuración de Twitter
  twitter: {
    handle: '@aquilesconecta',
    site: '@aquilesconecta',
    cardType: 'summary_large_image',
  },

  // Configuración de Google Analytics
  analytics: {
    googleAnalyticsId: 'G-XXXXXXXXXX', // Reemplazar con tu ID real
    googleTagManagerId: 'GTM-XXXXXXX', // Reemplazar con tu ID real
  },

  // Configuración de verificación
  verification: {
    google: 'tu-codigo-de-verificacion-google',
    bing: 'tu-codigo-de-verificacion-bing',
    yandex: 'tu-codigo-de-verificacion-yandex',
  },

  // Estructura de navegación
  navigation: {
    main: [
      { name: 'Inicio', url: '/', priority: 1.0 },
      { name: 'Blog', url: '/blog', priority: 0.8 },
      { name: 'Recursos', url: '/recursos', priority: 0.7 },
      { name: 'Sobre Mí', url: '/sobre-mi', priority: 0.6 },
      { name: 'Contacto', url: '/contacto', priority: 0.5 },
    ],
    footer: [
      { name: 'Política de Privacidad', url: '/politica-privacidad' },
      { name: 'Términos y Condiciones', url: '/terminos-condiciones' },
      { name: 'Cookies', url: '/cookies' },
    ]
  },

  // Configuración de rendimiento
  performance: {
    imageOptimization: true,
    lazyLoading: true,
    preloadCriticalResources: true,
    cacheStrategy: 'stale-while-revalidate',
  }
}

// Función para generar títulos SEO
export const generateSEOTitle = (pageTitle: string, includeBrand = true): string => {
  const brand = 'Aquiles Conecta'
  return includeBrand ? `${pageTitle} | ${brand}` : pageTitle
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
export const generateStructuredData = (type: 'organization' | 'person' | 'article', data: Record<string, unknown>) => {
  const baseData = {
    "@context": "https://schema.org",
    "@type": type === 'organization' ? "Organization" : type === 'person' ? "Person" : "Article",
  }

  return {
    ...baseData,
    ...data
  }
} 