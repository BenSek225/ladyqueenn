import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter, JetBrains_Mono } from 'next/font/google'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { ToastContainer } from '@/components/shared/toast'
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider'
import './globals.css'

// Fonts configuration - Design System Lady Queenn
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Lady Queenn — La maison du raffinement ivoirien',
  description: 'Lady Queenn — Soins naturels Sweet-Hair, parfums Fragrance, créations Crochet by THED. Beauty. Roots. Ritual.',
  keywords: ['Lady Queenn', 'Sweet-Hair', 'Fragrance', 'Crochet by THED', 'soins naturels', 'parfums', 'crochet', 'Abidjan', 'Côte d\'Ivoire'],
  authors: [{ name: 'Lady Queenn' }],
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
      <body className="antialiased font-sans bg-cream-white text-deep-black">
        <SmoothScrollProvider>
          <SiteHeader />
          <main className="min-h-screen">
            {children}
          </main>
          <SiteFooter />
          <ToastContainer />
        </SmoothScrollProvider>
        <Analytics />
      </body>
    </html>
  )
}
