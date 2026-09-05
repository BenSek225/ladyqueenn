import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter, JetBrains_Mono } from 'next/font/google'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { ToastContainer } from '@/components/shared/toast'
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider'
import { RevealProvider } from '@/components/providers/reveal-provider'
import { OrganizationSchema, WebsiteSchema } from '@/components/seo/structured-data'
import './globals.css'

// Fonts configuration - Design System Lady Queenn  
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  preload: true,
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600'],
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
  preload: false, // Used less, not critical
})

export const metadata: Metadata = {
  title: 'Lady Queenn — La maison du raffinement ivoirien',
  description: 'Lady Queenn — Soins naturels Sweet-Hair, parfums Fragrance, créations Crochet by THED. Beauty. Roots. Ritual.',
  keywords: ['Lady Queenn', 'Sweet-Hair', 'Fragrance', 'Crochet by THED', 'soins naturels', 'parfums', 'crochet', 'Abidjan', 'Côte d\'Ivoire'],
  authors: [{ name: 'Lady Queenn' }],
  creator: 'Lady Queenn',
  publisher: 'Lady Queenn',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ladyqueenn.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Lady Queenn — Beauty. Roots. Ritual.',
    description: 'Soins naturels, parfums intemporels et créations artisanales. L\'élégance africaine sublimée.',
    type: 'website',
    locale: 'fr_CI',
    url: '/',
    siteName: 'Lady Queenn',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lady Queenn - Beauty, Roots, Ritual',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lady Queenn — Beauty. Roots. Ritual.',
    description: 'Soins naturels, parfums intemporels et créations artisanales.',
    images: ['/images/og-image.jpg'],
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
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F9F6F1' },
    { media: '(prefers-color-scheme: dark)', color: '#1A1714' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://wa.me" />
      </head>
      <body className="antialiased font-sans bg-cream-white text-deep-black selection:bg-champagne-gold/20">
        <OrganizationSchema />
        <WebsiteSchema />
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        <SmoothScrollProvider>
          <RevealProvider>
            <SiteHeader />
            <main className="min-h-screen" id="main-content">
              {children}
            </main>
            <SiteFooter />
            <ToastContainer />
          </RevealProvider>
        </SmoothScrollProvider>
        <Analytics />
      </body>
    </html>
  )
}
