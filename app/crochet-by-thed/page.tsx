import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart, Ruler, Shirt, Sparkles } from 'lucide-react'
import { BrandCatalog } from '@/components/brand/brand-catalog'
import { BrandWordmark, PresentedBy } from '@/components/brand/logo'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { Parallax, Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { crochetProducts } from '@/lib/data/crochet-products'
import { whatsappUrl } from '@/lib/utils'

export const metadata = {
  title: 'Crochet by THED — L’élégance faite à la main | Lady Queen',
  description:
    'Robes, ensembles, tops, sacs et pièces pour toute la famille, crochetés à la main. Prêt-à-porter et sur commande.',
}

const features = [
  { icon: Shirt, title: 'Tenues au crochet', text: 'Robes, ensembles, tops, shorts, jupes…' },
  { icon: Ruler, title: 'Modèles personnalisés', text: 'Selon vos envies et vos mesures.' },
  { icon: Sparkles, title: 'Travail soigné', text: 'Finitions propres, qualité assurée.' },
  { icon: Heart, title: 'Style & confort', text: 'Des créations tendance et uniques.' },
]

const steps = [
  { n: '01', title: 'Votre idée', text: 'Envoyez-nous une photo, un croquis ou simplement votre envie sur WhatsApp.' },
  { n: '02', title: 'Couleurs & mesures', text: 'On choisit ensemble le fil, les couleurs et on prend vos mesures.' },
  { n: '03', title: 'Le crochet', text: 'THED confectionne votre pièce à la main, maille après maille (7 à 14 jours).' },
  { n: '04', title: 'La livraison', text: 'Votre pièce unique vous est livrée, prête à être portée.' },
]

export default function CrochetPage() {
  const gallery = crochetProducts
    .flatMap((p) => (p.images ?? [p.image]).filter((img) => img.includes('lifestyle') || img.includes('detail')))
    .slice(0, 8)

  return (
    <div data-brand="crochet-by-thed" className="bg-cr-light">
      {/* Hero */}
      <section className="grain relative overflow-hidden">
        <div className="container-luxury grid items-center gap-12 pb-16 pt-8 lg:min-h-[80vh] lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:py-14">
          <div className="relative z-10">
            <Breadcrumb items={[{ label: 'Crochet by THED', href: '/crochet-by-thed' }]} />
            <Reveal className="mt-8">
              <PresentedBy />
            </Reveal>
            <Reveal delay={0.15} duration={1.2}>
              <BrandWordmark brand="crochet-by-thed" size="xl" className="mt-6 !text-[4.75rem] sm:!text-8xl lg:!text-[7.5rem]" />
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.32em] text-deep-black sm:text-sm">
                L’élégance faite à la main
              </p>
              <div className="stitch-line mt-6 w-40 text-champagne-gold" />
              <p className="mt-6 max-w-md text-base leading-relaxed text-warm-600 sm:text-lg">
                Des créations uniques confectionnées au crochet avec passion et précision, pour{' '}
                <strong className="font-semibold text-cr-earth">sublimer votre style</strong>.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link href="#boutique" className="btn-primary !bg-cr-deep">
                  Voir les créations <ArrowRight size={16} />
                </Link>
                <Link href="#sur-mesure" className="link-underline text-xs font-medium uppercase tracking-[0.2em] text-cr-earth">
                  Sur commande
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Collage d'arches, comme sur les affiches */}
          <div className="relative grid grid-cols-[1.25fr_1fr] gap-3 sm:gap-4">
            <Reveal direction="up" duration={1.3} className="row-span-2">
              <Parallax amount={30} className="relative aspect-[3/4.4] rounded-t-[999px] rounded-b-soft border border-champagne-gold/60">
                <Image
                  src="/images/hero/crochet-by-thed.png"
                  alt="Création Crochet by THED"
                  fill
                  priority
                  sizes="(max-width: 1024px) 55vw, 28vw"
                  className="object-cover"
                />
              </Parallax>
            </Reveal>
            <Reveal delay={0.15} duration={1.3}>
              <div className="relative aspect-[3/3.6] overflow-hidden rounded-t-[999px] rounded-b-soft border border-champagne-gold/60">
                <Image src="/images/gallery/crochet-lifestyle.png" alt="" fill sizes="25vw" className="object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.3} duration={1.3}>
              <div className="relative aspect-[3/3.6] overflow-hidden rounded-t-[999px] rounded-b-soft border border-champagne-gold/60">
                <Image src={crochetProducts[1]?.image ?? '/images/gallery/crochet-lifestyle.png'} alt="" fill sizes="25vw" className="object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.6} direction="none" className="absolute left-[52%] top-[46%] -translate-x-1/2">
              <span className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-champagne-gold bg-deep-black text-center text-[0.5625rem] font-medium uppercase leading-tight tracking-[0.14em] text-cream-white shadow-luxe sm:h-28 sm:w-28 sm:text-[0.625rem]">
                Fait main
                <br />
                avec amour
                <Heart size={12} className="mt-1 fill-champagne-gold text-champagne-gold" />
              </span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Atouts */}
      <section className="border-y border-champagne-gold/30 bg-cream-white py-14 lg:py-16">
        <RevealGroup className="container-luxury grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:divide-x lg:divide-champagne-gold/30">
          {features.map(({ icon: Icon, title, text }) => (
            <RevealItem key={title} className="text-center lg:px-6">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-deep-black text-champagne-gold">
                <Icon size={22} strokeWidth={1.4} />
              </span>
              <h3 className="mt-4 text-xs font-semibold uppercase tracking-[0.14em]">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-warm-500">{text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Boutique */}
      <section id="boutique" className="scroll-mt-24 py-20 lg:py-28">
        <div className="container-luxury">
          <Reveal className="mb-10">
            <p className="font-hand text-3xl text-cr-terracotta">prêt-à-porter</p>
            <h2 className="mt-1 font-display text-4xl sm:text-5xl">Les créations disponibles</h2>
          </Reveal>
          <BrandCatalog
            products={crochetProducts}
            noun={['création', 'créations']}
            filters={[
              { key: 'all', label: 'Tout' },
              { key: 'femme', label: 'Femme' },
              { key: 'homme', label: 'Homme' },
              { key: 'enfant', label: 'Enfant' },
              { key: 'accessoire', label: 'Accessoires' },
            ]}
          />
        </div>
      </section>

      {/* Sur-mesure */}
      <section id="sur-mesure" className="grain relative scroll-mt-24 overflow-hidden bg-cr-deep py-20 text-cream-white lg:py-28">
        <div className="container-luxury">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <Reveal>
              <span className="inline-flex rounded-full bg-champagne-gold px-4 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-deep-black">
                Sur commande
              </span>
              <h2 className="mt-6 font-display text-4xl leading-[1.1] sm:text-5xl">
                Votre style, <span className="text-champagne-gold">notre passion.</span>
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-cream-white/70">
                Une robe pour un mariage, un ensemble pour les vacances, une tenue de baptême : décrivez-nous votre
                pièce rêvée, on la crochète pour vous.
              </p>
              <a
                href={whatsappUrl('Bonjour Lady Queen, je souhaite commander une pièce Crochet by THED sur-mesure.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold mt-10"
              >
                Passez votre commande <ArrowRight size={16} />
              </a>
              <p className="mt-10 font-script text-5xl text-champagne-gold">Fait main</p>
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-cream-white/60">fait avec amour</p>
            </Reveal>

            <RevealGroup className="grid gap-4 sm:grid-cols-2" stagger={0.12}>
              {steps.map((s) => (
                <RevealItem key={s.n} className="rounded-soft border border-cream-white/10 bg-cream-white/[0.04] p-7">
                  <span className="font-display text-5xl italic text-champagne-gold">{s.n}</span>
                  <h3 className="mt-5 font-display text-xl">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream-white/60">{s.text}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Galerie */}
      <section id="galerie" className="scroll-mt-24 py-20 lg:py-28">
        <div className="container-luxury">
          <Reveal className="mb-12 text-center">
            <p className="font-hand text-3xl text-cr-terracotta">la galerie</p>
            <h2 className="mt-1 font-display text-4xl sm:text-5xl">Maille après maille</h2>
          </Reveal>
          <div className="columns-2 gap-3 sm:gap-5 lg:columns-4">
            {gallery.map((src, i) => (
              <Reveal key={src} delay={(i % 4) * 0.08} className="mb-3 break-inside-avoid sm:mb-5">
                <div
                  className={`group relative overflow-hidden rounded-soft ${i % 3 === 0 ? 'aspect-[3/4]' : 'aspect-square'}`}
                >
                  <Image
                    src={src}
                    alt="Réalisation Crochet by THED"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 text-center">
            <a
              href={whatsappUrl('Bonjour Lady Queen, j’ai vu une création Crochet by THED qui m’intéresse.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-cr-deep"
            >
              Une pièce vous plaît ? Écrivez-nous
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
