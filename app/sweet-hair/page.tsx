import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Droplets, Leaf, Sprout, Sparkles } from 'lucide-react'
import { BrandCatalog } from '@/components/brand/brand-catalog'
import { SweetHairLogo } from '@/components/brand/logo'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { AddToCart } from '@/components/add-to-cart'
import { Parallax, Reveal, RevealGroup, RevealItem, SplitLines } from '@/components/motion/reveal'
import { sweetHairProducts } from '@/lib/data/sweet-hair-products'
import { whatsappUrl } from '@/lib/utils'

export const metadata = {
  title: 'Sweet-Hair — Soins capillaires naturels | Lady Queen',
  description:
    'Huiles, shampooings et pommades aux ingrédients naturels pour des cheveux nourris, forts et resplendissants.',
}

const promises = [
  { icon: Leaf, title: '100 % naturel', text: 'Huiles végétales, beurres et extraits de plantes africaines.' },
  { icon: Sprout, title: 'Pousse stimulée', text: 'Renforce les racines et réveille le cuir chevelu.' },
  { icon: Droplets, title: 'Nutrition intense', text: 'Hydrate en profondeur, apporte volume et brillance.' },
  { icon: Sparkles, title: 'Cheveux réparés', text: 'Apaise le cuir chevelu, répare les longueurs abîmées.' },
]

const ritual = [
  { step: '01', title: 'Nourrir', text: 'Massez l’huile sur le cuir chevelu, cheveux secs ou humides, pour stimuler la circulation.' },
  { step: '02', title: 'Laver', text: 'Le shampooing nettoie en douceur tout en préservant les huiles naturelles.' },
  { step: '03', title: 'Sceller', text: 'La pommade définit les boucles, scelle l’hydratation et protège au quotidien.' },
]

export default function SweetHairPage() {
  const kit = sweetHairProducts.find((p) => p.isKit)

  return (
    <div data-brand="sweet-hair" className="bg-cream-white">
      {/* Hero */}
      <section className="grain relative overflow-hidden bg-sh-light">
        <div className="container-luxury grid items-center gap-10 pb-16 pt-8 lg:min-h-[78vh] lg:grid-cols-2 lg:gap-16 lg:py-16">
          <div className="order-2 lg:order-1">
            <Breadcrumb items={[{ label: 'Sweet-Hair', href: '/sweet-hair' }]} />
            <Reveal className="mt-8">
              <SweetHairLogo tone="dark" className="w-24 sm:w-28" />
            </Reveal>
            <p className="eyebrow-label mt-8 text-sh-olive">Soins capillaires naturels</p>
            <SplitLines
              delay={0.2}
              className="mt-4 font-brand text-5xl leading-[1] tracking-tight text-sh-deep sm:text-6xl lg:text-7xl"
              lines={['La nature', <em key="i" className="font-light">sublime</em>, 'vos cheveux.']}
            />
            <Reveal delay={0.5}>
              <p className="mt-8 max-w-md text-base leading-relaxed text-sh-deep/75 sm:text-lg">
                Des soins formulés avec des ingrédients naturels d’Afrique pour nourrir, fortifier et révéler toutes les
                textures.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link href="#soins" className="btn-primary !bg-sh-deep">
                  Découvrir les soins <ArrowRight size={16} />
                </Link>
                <Link href="#kit" className="link-underline text-xs font-medium uppercase tracking-[0.2em] text-sh-deep">
                  Le kit complet
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal direction="none" duration={1.4} className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-[32rem]">
              <Parallax amount={40} className="relative aspect-[4/5] rounded-t-[999px] rounded-b-soft">
                <Image
                  src="/images/hero/sweet-hair.png"
                  alt="Soins Sweet-Hair"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </Parallax>
              <div className="absolute -bottom-6 -left-4 rounded-soft bg-cream-white px-5 py-4 shadow-luxe sm:-left-10">
                <p className="eyebrow-label text-sh-olive">Made in Côte d’Ivoire</p>
                <p className="mt-1 font-brand text-xl text-sh-deep">Dès 2 000 FCFA</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Promesses */}
      <section className="border-b border-sh-sage/20 bg-cream-white py-16 lg:py-20">
        <RevealGroup className="container-luxury grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map(({ icon: Icon, title, text }) => (
            <RevealItem key={title}>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sh-light text-sh-olive">
                <Icon size={20} strokeWidth={1.5} />
              </span>
              <h3 className="mt-5 font-brand text-xl text-sh-deep">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-warm-500">{text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Catalogue */}
      <section id="soins" className="scroll-mt-24 py-20 lg:py-28">
        <div className="container-luxury">
          <Reveal className="mb-10">
            <p className="eyebrow-label mb-4 text-sh-olive">La collection</p>
            <h2 className="font-brand text-4xl text-sh-deep sm:text-5xl">Les essentiels Sweet-Hair</h2>
          </Reveal>
          <BrandCatalog
            products={sweetHairProducts}
            noun={['soin', 'soins']}
            filters={[
              { key: 'all', label: 'Tous' },
              { key: 'huile', label: 'Huiles' },
              { key: 'shampooing', label: 'Shampooings' },
              { key: 'pommade', label: 'Pommades' },
              { key: 'kit', label: 'Kit' },
            ]}
          />
        </div>
      </section>

      {/* Kit */}
      {kit && (
        <section id="kit" className="scroll-mt-24 px-3 pb-20 sm:px-5 lg:pb-28">
          <div className="grain relative mx-auto grid max-w-[1400px] overflow-hidden rounded-[1.5rem] bg-sh-deep text-cream-white lg:grid-cols-2">
            <div className="relative min-h-[360px] lg:min-h-[560px]">
              <Image src={kit.image} alt={kit.name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <Reveal className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
              <p className="eyebrow-label text-sh-sage">Offre rituel complet</p>
              <h2 className="mt-4 font-brand text-4xl leading-tight sm:text-5xl">
                Le kit qui fait <em className="font-light">tout</em>.
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-cream-white/70">
                Huile 60 ml, shampooing 250 ml et pommade : la routine complète pour des cheveux nourris, forts et
                brillants. Emballage cadeau offert.
              </p>
              <p className="price mt-8 flex items-baseline gap-3">
                <span className="text-4xl text-cream-white">{kit.price.toLocaleString('fr-FR')} FCFA</span>
                {kit.oldPrice && (
                  <span className="text-lg text-cream-white/40 line-through">{kit.oldPrice.toLocaleString('fr-FR')}</span>
                )}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <AddToCart product={kit} variant="light" />
                <a
                  href={whatsappUrl('Bonjour Lady Queen, je souhaite commander le Kit complet Sweet-Hair.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-cream-white"
                >
                  Commander sur WhatsApp
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Rituel */}
      <section className="bg-sh-light py-20 lg:py-28">
        <div className="container-luxury">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <p className="eyebrow-label mb-4 text-sh-olive">Le rituel</p>
            <h2 className="font-brand text-4xl text-sh-deep sm:text-5xl">Trois gestes, des cheveux transformés</h2>
          </Reveal>
          <RevealGroup className="grid gap-6 md:grid-cols-3" stagger={0.15}>
            {ritual.map((r) => (
              <RevealItem key={r.step} className="rounded-soft bg-cream-white p-8 lg:p-10">
                <span className="font-brand text-6xl font-light text-sh-sage">{r.step}</span>
                <h3 className="mt-6 font-brand text-2xl text-sh-deep">{r.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-warm-500">{r.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </div>
  )
}
