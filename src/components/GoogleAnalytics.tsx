'use client'

import Script from 'next/script'
import { seoConfig } from '@/config/seo'

interface GoogleAnalyticsProps {
    gaId?: string
    gtmId?: string
}

export default function GoogleAnalytics({
    gaId = seoConfig.analytics.googleAnalyticsId,
    gtmId = seoConfig.analytics.googleTagManagerId
}: GoogleAnalyticsProps) {
    // Si no hay IDs configurados, no renderizar nada
    if (gaId === 'G-XXXXXXXXXX' && gtmId === 'GTM-XXXXXXX') {
        return null
    }

    return (
        <>
            {/* Google Analytics 4 */}
            {gaId !== 'G-XXXXXXXXXX' && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                        strategy="afterInteractive"
                    />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_title: document.title,
                page_location: window.location.href,
                custom_map: {
                  'custom_parameter_1': 'user_type',
                  'custom_parameter_2': 'content_category'
                }
              });
              
              // Eventos personalizados
              gtag('event', 'page_view', {
                page_title: document.title,
                page_location: window.location.href,
                content_category: 'desarrollo_personal'
              });
            `}
                    </Script>
                </>
            )}

            {/* Google Tag Manager */}
            {gtmId !== 'GTM-XXXXXXX' && (
                <>
                    <Script id="google-tag-manager" strategy="afterInteractive">
                        {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}
                    </Script>
                    <noscript>
                        <iframe
                            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                            height="0"
                            width="0"
                            style={{ display: 'none', visibility: 'hidden' }}
                        />
                    </noscript>
                </>
            )}

            {/* Facebook Pixel */}
            {seoConfig.analytics.facebookPixelId !== 'XXXXXXXXXX' && (
                <Script id="facebook-pixel" strategy="afterInteractive">
                    {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${seoConfig.analytics.facebookPixelId}');
            fbq('track', 'PageView');
          `}
                </Script>
            )}
        </>
    )
}

// Hook para tracking de eventos personalizados
export const useAnalytics = () => {
    const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', eventName, {
                event_category: 'user_interaction',
                event_label: 'aquiles_conecta',
                ...parameters
            })
        }

        // Facebook Pixel tracking
        if (typeof window !== 'undefined' && window.fbq) {
            window.fbq('track', eventName, parameters)
        }
    }

    const trackProductView = (product: {
        id: string
        title: string
        price: string
        category: string
    }) => {
        trackEvent('view_item', {
            currency: 'ARS',
            value: parseFloat(product.price.replace(/[^\d]/g, '')),
            items: [{
                item_id: product.id,
                item_name: product.title,
                item_category: product.category,
                price: parseFloat(product.price.replace(/[^\d]/g, '')),
                currency: 'ARS'
            }]
        })
    }

    const trackProductClick = (product: {
        id: string
        title: string
        price: string
        category: string
    }) => {
        trackEvent('select_item', {
            currency: 'ARS',
            value: parseFloat(product.price.replace(/[^\d]/g, '')),
            items: [{
                item_id: product.id,
                item_name: product.title,
                item_category: product.category,
                price: parseFloat(product.price.replace(/[^\d]/g, '')),
                currency: 'ARS'
            }]
        })
    }

    const trackContactForm = (method: string) => {
        trackEvent('contact_form_submit', {
            contact_method: method,
            content_category: 'desarrollo_personal'
        })
    }

    const trackSocialShare = (platform: string, content: string) => {
        trackEvent('share', {
            method: platform,
            content_type: 'webpage',
            item_id: content
        })
    }

    return {
        trackEvent,
        trackProductView,
        trackProductClick,
        trackContactForm,
        trackSocialShare
    }
}

// Declaración de tipos para window
declare global {
    interface Window {
        gtag: (...args: any[]) => void
        fbq: (...args: any[]) => void
        dataLayer: any[]
    }
} 