import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { ToastContainer } from '@/components/shared/toast'
import { WhatsAppFloat } from '@/components/layout/whatsapp-float'
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider'
import { OrganizationSchema, WebsiteSchema } from '@/components/seo/structured-data'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lady Queen — La maison du raffinement ivoirien',
  description: 'Lady Queen — Soins naturels Sweet-Hair, parfums Fragrance, créations Crochet by THED. Beauty. Roots. Ritual.',
  keywords: ['Lady Queen', 'Sweet-Hair', 'Fragrance', 'Crochet by THED', 'soins naturels', 'parfums', 'crochet', 'Abidjan', 'Côte d\'Ivoire'],
  authors: [{ name: 'Lady Queen' }],
  creator: 'Lady Queen',
  publisher: 'Lady Queen',
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
    title: 'Lady Queen — Beauty. Roots. Ritual.',
    description: 'Soins naturels, parfums intemporels et créations artisanales. L\'élégance africaine sublimée.',
    type: 'website',
    locale: 'fr_CI',
    url: '/',
    siteName: 'Lady Queen',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lady Queen - Beauty, Roots, Ritual',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lady Queen — Beauty. Roots. Ritual.',
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
  colorScheme: 'light',
  themeColor: '#1A1714',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body>
        <OrganizationSchema />
        <WebsiteSchema />
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        <SmoothScrollProvider>
            <SiteHeader />
            <main className="min-h-screen" id="main-content">
              {children}
            </main>
            <SiteFooter />
            <ToastContainer />
            <WhatsAppFloat />
        </SmoothScrollProvider>
        <Analytics />
      </body>
    </html>
  )
}
