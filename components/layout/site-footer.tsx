import Link from 'next/link'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { siteConfig } from '@/lib/data/navigation'
import { brands } from '@/lib/brands'
import { LadyQueenLogo } from '@/components/brand/logo'

export function SiteFooter() {
  const year = new Date().getFullYear()
  const wa = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Bonjour Lady Queen 👑, j’ai une question.')}`

  return (
    <footer className="relative overflow-hidden bg-deep-black text-cream-white">
      {/* Grand logo en filigrane */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-[6vw] flex justify-center opacity-[0.05]">
        <LadyQueenLogo tone="light" className="w-[110vw] max-w-none" />
      </div>

      <div className="container-luxury relative py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-12">
          <div>
            <Link href="/" aria-label="Lady Queen — accueil" className="inline-block">
              <LadyQueenLogo tone="light" className="w-44" />
            </Link>
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-cream-white/60">
              La maison du raffinement ivoirien. Des soins, des parfums et des pièces faites main, réunis sous une même
              couronne.
            </p>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-gold mt-8">
              Écrire sur WhatsApp <ArrowUpRight size={16} />
            </a>
          </div>

          <div>
            <p className="eyebrow-label text-champagne-gold">Nos marques</p>
            <ul className="mt-6 space-y-4">
              {brands.map((b) => (
                <li key={b.slug}>
                  <Link
                    href={b.href}
                    className="group inline-flex flex-col text-cream-white/85 transition-colors hover:text-champagne-gold"
                  >
                    <span className="font-display text-xl">{b.name}</span>
                    <span className="text-xs text-cream-white/40">{b.category}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow-label text-champagne-gold">Service</p>
            <ul className="mt-6 space-y-3 text-[0.9375rem] text-cream-white/70">
              <li>
                <Link href="/commande" className="transition-colors hover:text-champagne-gold">
                  Finaliser ma commande
                </Link>
              </li>
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-champagne-gold">
                  Nous contacter sur WhatsApp
                </a>
              </li>
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-champagne-gold">
                  Livraison internationale
                </a>
              </li>
              <li>
                <Link href="/crochet-by-thed#sur-mesure" className="transition-colors hover:text-champagne-gold">
                  Crochet sur-mesure
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow-label text-champagne-gold">Nous trouver</p>
            <ul className="mt-6 space-y-4 text-[0.9375rem] text-cream-white/70">
              <li className="flex items-start gap-3">
                <MapPin size={17} className="mt-0.5 shrink-0 text-champagne-gold" />
                {siteConfig.address}
              </li>
              <li className="flex items-center gap-3">
                <Phone size={17} className="shrink-0 text-champagne-gold" />
                <a href={`tel:${siteConfig.whatsapp}`} className="hover:text-champagne-gold">
                  {siteConfig.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={17} className="shrink-0 text-champagne-gold" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-champagne-gold">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
            <div className="mt-7 flex gap-3">
              {[
                { label: 'Instagram', short: 'IG', href: siteConfig.social.instagram },
                { label: 'Facebook', short: 'FB', href: siteConfig.social.facebook },
                { label: 'TikTok', short: 'TT', href: siteConfig.social.tiktok },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} Lady Queen`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cream-white/20 text-[0.6875rem] font-semibold tracking-wider text-cream-white/80 transition-colors hover:border-champagne-gold hover:bg-champagne-gold hover:text-deep-black"
                >
                  {s.short}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-cream-white/10 pt-6 text-xs text-cream-white/40 md:flex-row md:items-center md:justify-between">
          <p>© {year} Lady Queen. Tous droits réservés.</p>
          <p className="font-mono uppercase tracking-[0.2em]">Beauty. Roots. Ritual.</p>
          <a
            href="https://bendev.site"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-cream-white/70 transition-colors hover:text-champagne-gold"
          >
            Developed by <span className="font-medium text-cream-white group-hover:text-champagne-gold">Ben</span>
            <span className="text-cream-white/40">·</span>
            <span className="underline decoration-champagne-gold/50 underline-offset-4">Voir mon portfolio</span>
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
