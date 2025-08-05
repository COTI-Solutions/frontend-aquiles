import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { seoConfig, generateStructuredData } from "@/config/seo";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Aquiles Conecta - Tu fuente de conocimiento para el crecimiento personal y profesional",
    template: "%s | Aquiles Conecta"
  },
  description: "Un espacio curado por Ángeles para compartir contenidos digitales que inspiran y transforman. Descubre herramientas, consejos y recursos para tu desarrollo personal y profesional.",
  keywords: [
    "desarrollo personal",
    "crecimiento profesional",
    "contenido digital",
    "inspiración",
    "transformación personal",
    "herramientas digitales",
    "consejos profesionales",
    "motivación",
    "productividad",
    "bienestar",
    "Ángeles Gardón",
    "Aquiles Conecta",
    "recetas BLW",
    "jardinería",
    "jabones artesanales",
    "reiki",
    "cartas angelicales",
    "escritura"
  ],
  authors: [{ name: "Ángeles Gardón" }],
  creator: "Ángeles Gardón",
  publisher: "Aquiles Conecta",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(seoConfig.site.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: seoConfig.site.url,
    siteName: seoConfig.site.name,
    title: 'Aquiles Conecta - Tu fuente de conocimiento para el crecimiento personal y profesional',
    description: 'Un espacio curado por Ángeles para compartir contenidos digitales que inspiran y transforman. Descubre herramientas, consejos y recursos para tu desarrollo personal y profesional.',
    images: [
      {
        url: '/images/aquiles-conecta-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Aquiles Conecta - Desarrollo Personal y Profesional',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aquiles Conecta - Tu fuente de conocimiento para el crecimiento personal y profesional',
    description: 'Un espacio curado por Ángeles para compartir contenidos digitales que inspiran y transforman.',
    images: ['/images/aquiles-conecta-twitter.jpg'],
    creator: '@aquilesconecta',
    site: '@aquilesconecta',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: seoConfig.verification.google,
    yandex: seoConfig.verification.yandex,
  },
  category: 'Personal Development',
  classification: 'Educational',
  other: {
    'geo.region': 'AR',
    'geo.placename': 'Buenos Aires',
    'geo.position': '-34.6037;-58.3816',
    'ICBM': '-34.6037, -58.3816',
    'DC.title': 'Aquiles Conecta',
    'DC.creator': 'Ángeles Gardón',
    'DC.subject': 'Desarrollo Personal, Crecimiento Profesional, Contenido Digital',
    'DC.description': 'Un espacio curado por Ángeles para compartir contenidos digitales que inspiran y transforman.',
    'DC.publisher': 'Aquiles Conecta',
    'DC.contributor': 'Ángeles Gardón',
    'DC.date': new Date().toISOString(),
    'DC.type': 'Text',
    'DC.format': 'text/html',
    'DC.identifier': seoConfig.site.url,
    'DC.language': 'es',
    'DC.coverage': 'Argentina',
    'DC.rights': '© 2024 Aquiles Conecta. Todos los derechos reservados.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data para la organización
  const organizationData = generateStructuredData('organization', {
    name: seoConfig.site.name,
    url: seoConfig.site.url,
    logo: `${seoConfig.site.url}/images/AquilesLogo.png`,
    description: seoConfig.site.description,
    founder: {
      "@type": "Person",
      name: seoConfig.site.author,
      jobTitle: seoConfig.site.authorTitle,
      description: seoConfig.site.authorBio,
      email: seoConfig.site.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Buenos Aires",
        addressCountry: "AR"
      }
    },
    sameAs: [
      seoConfig.social.instagram,
      seoConfig.social.whatsapp,
      seoConfig.social.facebook,
      seoConfig.social.youtube,
      seoConfig.social.tiktok
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: seoConfig.site.email,
      telephone: seoConfig.site.phone,
      availableLanguage: "Spanish"
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Buenos Aires",
      addressCountry: "AR"
    },
    areaServed: "AR",
    serviceArea: {
      "@type": "Country",
      name: "Argentina"
    }
  });

  // Structured Data para la persona (Ángeles Gardón)
  const personData = generateStructuredData('person', {
    name: seoConfig.site.author,
    jobTitle: seoConfig.site.authorTitle,
    description: seoConfig.site.authorBio,
    email: seoConfig.site.email,
    telephone: seoConfig.site.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Buenos Aires",
      addressCountry: "AR"
    },
    worksFor: {
      "@type": "Organization",
      name: seoConfig.site.name
    },
    sameAs: [
      seoConfig.social.instagram,
      seoConfig.social.whatsapp,
      seoConfig.social.facebook,
      seoConfig.social.youtube,
      seoConfig.social.tiktok
    ],
    knowsAbout: [
      "Desarrollo Personal",
      "Crecimiento Profesional",
      "Contenido Digital",
      "Marketing Digital",
      "Branding Personal",
      "Coaching",
      "Mentoría"
    ]
  });

  return (
    <html lang="es">
      <head>
        {/* Favicon y iconos */}
        <link rel="icon" type="image/png" href="/images/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/images/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/images/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Aquiles" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png" />
        <link rel="mask-icon" href="/images/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        {/* Preconnect para mejorar performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* DNS Prefetch para recursos externos */}
        <link rel="dns-prefetch" href="//static-media.hotmart.com" />
        <link rel="dns-prefetch" href="//go.hotmart.com" />

        {/* Meta tags adicionales para SEO */}
        <meta name="author" content="Ángeles Gardón" />
        <meta name="copyright" content="© 2024 Aquiles Conecta. Todos los derechos reservados." />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
        <meta name="language" content="Spanish" />
        <meta name="coverage" content="Argentina" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="width" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Aquiles Conecta" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationData)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personData)
          }}
        />

        {/* Google Analytics */}
        <GoogleAnalytics />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
