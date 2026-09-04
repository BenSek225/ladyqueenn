import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { siteConfig } from '@/lib/data/navigation'

const univers = [
  { label: 'Sweet-Hair', href: '/sweet-hair', accent: 'text-sh-olive' },
  { label: 'Fragrance', href: '/fragrance', accent: 'text-fr-rose' },
  { label: 'Crochet by THED', href: '/crochet-by-thed', accent: 'text-cr-earth' },
]

const informations = [
  { label: 'À propos', href: '/a-propos' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
]

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-deep-black text-cream-white">
      <div className="container mx-auto px-4 py-16 lg:px-20 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1.2fr] lg:gap-10">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image src="/images/logo-lady-queenn.png" alt="Lady Queenn" width={48} height={48} className="h-12 w-12 object-contain" />
              <span className="font-display text-xl tracking-tight">Lady Queenn</span>
            </Link>
            <p className="mt-7 max-w-sm text-base leading-relaxed text-warm-gray-300">
              La maison du raffinement ivoirien. Des rituels de beauté, des fragrances singulières et des pièces façonnées avec intention.
            </p>
            <a
              href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-11 items-center gap-2 border border-champagne-gold px-5 text-xs font-semibold uppercase tracking-[0.16em] text-champagne-gold transition-colors hover:bg-champagne-gold hover:text-deep-black"
            >
              Écrire sur WhatsApp <ArrowUpRight size={15} />
            </a>
          </div>

          <div>
            <p className="eyebrow-label text-warm-gray-400">Explorer</p>
            <ul className="mt-5 space-y-4">
              {univers.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={`text-base text-warm-gray-200 transition-colors hover:text-champagne-gold ${item.accent}`}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow-label text-warm-gray-400">La maison</p>
            <ul className="mt-5 space-y-4">
              {informations.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-base text-warm-gray-200 transition-colors hover:text-champagne-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow-label text-warm-gray-400">Nous trouver</p>
            <ul className="mt-5 space-y-4 text-sm leading-relaxed text-warm-gray-300">
              <li className="flex items-start gap-3"><MapPin size={17} className="mt-0.5 shrink-0 text-champagne-gold" /><span>{siteConfig.address}</span></li>
              <li className="flex items-center gap-3"><Phone size={17} className="shrink-0 text-champagne-gold" /><a href={`tel:${siteConfig.whatsapp}`} className="hover:text-champagne-gold">{siteConfig.whatsapp}</a></li>
              <li className="flex items-center gap-3"><Mail size={17} className="shrink-0 text-champagne-gold" /><a href={`mailto:${siteConfig.email}`} className="hover:text-champagne-gold">{siteConfig.email}</a></li>
            </ul>
            <div className="mt-7 flex gap-3">
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram Lady Queenn" className="flex h-10 w-10 items-center justify-center border border-warm-gray-400/40 text-warm-gray-200 transition-colors hover:border-champagne-gold hover:text-champagne-gold"><span className="text-sm font-semibold">ig</span></a>
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook Lady Queenn" className="flex h-10 w-10 items-center justify-center border border-warm-gray-400/40 text-warm-gray-200 transition-colors hover:border-champagne-gold hover:text-champagne-gold"><span className="font-semibold">f</span></a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-warm-gray-400/20 pt-6 text-xs text-warm-gray-400 md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} Lady Queenn. Tous droits réservés.</p>
          <p className="font-mono uppercase tracking-[0.14em]">Beauty. Roots. Ritual.</p>
        </div>
      </div>
    </footer>
  )
}
