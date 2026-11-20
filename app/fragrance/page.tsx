import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, Clock, MessageCircle } from 'lucide-react'
import { BrandCatalog } from '@/components/brand/brand-catalog'
import { BrandWordmark } from '@/components/brand/logo'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { Parallax, Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { FragranceGlow } from '@/components/brand/fragrance-glow'
import { fragranceProducts } from '@/lib/data/fragrance-products'
import { whatsappUrl } from '@/lib/utils'

export const metadata = {
  title: 'Fragrance — Parfums de grandes maisons | Lady Queen',
  description:
    'Une sélection de parfums de marque importés et authentiques, pour homme, femme ou à partager. Conseil personnalisé.',
}

const promises = [
  { icon: BadgeCheck, title: 'Authenticité garantie', text: 'Des parfums de marque importés, issus de sources sûres.' },
  { icon: Clock, title: 'Longue tenue', text: 'Des eaux de parfum choisies pour un sillage qui dure.' },
  { icon: MessageCircle, title: 'Conseil sur mesure', text: 'Dites-nous ce que vous aimez, on trouve votre signature.' },
]

export default function FragrancePage() {
  return (
    <div data-brand="fragrance" className="bg-fr-night text-cream-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <FragranceGlow />
        <Reveal
          direction="none"
          duration={1.6}
          className="absolute bottom-10 right-5 top-24 hidden w-[34%] max-w-[30rem] lg:block xl:right-[4.5rem]"
        >
          <Parallax amount={50} className="relative h-full w-full rounded-t-[999px]">
            <Image
              src="/images/hero/fragrance.png"
              alt="Parfums Fragrance"
              fill
              priority
              sizes="34vw"
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-fr-night via-fr-night/20 to-transparent" />
          </Parallax>
        </Reveal>
        <div className="container-luxury relative flex min-h-[72vh] items-end pb-16 pt-8 lg:min-h-[86vh] lg:items-center lg:pb-20">
          <div className="relative z-10 w-full min-w-0">
            <Breadcrumb items={[{ label: 'Fragrance', href: '/fragrance' }]} tone="dark" />
            <Reveal className="mt-14 lg:mt-20">
              <p className="eyebrow-label text-fr-rose">Parfums de grandes maisons · importés</p>
            </Reveal>
            <Reveal delay={0.1} duration={1.3}>
              <BrandWordmark brand="fragrance" tone="light" size="xl" className="mt-6 !text-[11.5vw] lg:!text-[8.5rem]" />
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-8 max-w-md font-brand text-2xl italic leading-snug text-cream-white/90 sm:text-3xl">
                Votre signature olfactive, choisie parmi les plus belles maisons.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link href="#parfums" className="btn-gold">
                  Voir les parfums <ArrowRight size={16} />
                </Link>
                <a
                  href={whatsappUrl('Bonjour Lady Queen, je cherche un parfum et j’aimerais un conseil.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-xs font-medium uppercase tracking-[0.2em] text-fr-rose"
                >
                  Demander conseil
                </a>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* Catalogue */}
      <section id="parfums" className="scroll-mt-24 border-t border-cream-white/10 py-20 lg:py-28">
        <div className="container-luxury">
          <Reveal className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow-label mb-4 text-fr-rose">La sélection</p>
              <h2 className="font-brand text-4xl sm:text-5xl">Trouvez votre sillage</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-cream-white/55">
              Les arrivages changent souvent : écrivez-nous si vous cherchez une référence précise.
            </p>
          </Reveal>
          <BrandCatalog
            products={fragranceProducts}
            tone="dark"
            noun={['parfum', 'parfums']}
            filters={[
              { key: 'all', label: 'Tous' },
              { key: 'femme', label: 'Femme' },
              { key: 'homme', label: 'Homme' },
              { key: 'mixte', label: 'Mixte' },
            ]}
          />
        </div>
      </section>

      {/* Engagements */}
      <section className="border-t border-cream-white/10 bg-gradient-to-b from-fr-night to-[#2a1d30] py-20 lg:py-28">
        <div className="container-luxury">
          <RevealGroup className="grid gap-12 md:grid-cols-3">
            {promises.map(({ icon: Icon, title, text }) => (
              <RevealItem key={title} className="border-t border-fr-rose/30 pt-8">
                <Icon size={22} strokeWidth={1.4} className="text-fr-rose" />
                <h3 className="mt-6 font-brand text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream-white/60">{text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </div>
  )
}
