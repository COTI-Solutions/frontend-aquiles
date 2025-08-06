import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
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
    "bienestar"
  ],
  authors: [{ name: "Ángeles Gardón" }],
  creator: "Ángeles Gardón",
  publisher: "Aquiles Conecta",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://aquilesconecta.com.ar'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://aquilesconecta.com.ar',
    siteName: 'Aquiles Conecta',
    title: 'Aquiles Conecta - Tu fuente de conocimiento para el crecimiento personal y profesional',
    description: 'Un espacio curado por Ángeles para compartir contenidos digitales que inspiran y transforman.',
    images: [
      {
        url: '/images/aquiles-conecta-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Aquiles Conecta - Desarrollo Personal y Profesional',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aquiles Conecta - Tu fuente de conocimiento para el crecimiento personal y profesional',
    description: 'Un espacio curado por Ángeles para compartir contenidos digitales que inspiran y transforman.',
    images: ['/images/aquiles-conecta-twitter.jpg'],
    creator: '@aquilesconecta',
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
    google: 'tu-codigo-de-verificacion-google',
    yandex: 'tu-codigo-de-verificacion-yandex',
    yahoo: 'tu-codigo-de-verificacion-yahoo',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        
        {/* Preconnect para mejorar performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Aquiles Conecta",
              "url": "https://aquilesconecta.com.ar",
              "logo": "https://aquilesconecta.com.ar/images/AquilesLogo.png",
              "description": "Un espacio curado por Ángeles para compartir contenidos digitales que inspiran y transforman.",
              "founder": {
                "@type": "Person",
                "name": "Ángeles Gardón",
                "jobTitle": "Fundadora y Creadora de Contenido",
                "description": "Especialista en desarrollo personal y profesional"
              },
              "sameAs": [
                "https://instagram.com/aquilesconecta",
                "https://wa.me/1234567890"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "aquilesconecta@gmail.com"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
