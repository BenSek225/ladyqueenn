import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MessageCircle, Sparkles, Truck, Crown as CrownIcon } from 'lucide-react'
import { HomeHero } from '@/components/home/home-hero'
import { BrandDoors } from '@/components/home/brand-doors'
import { Marquee } from '@/components/home/marquee'
import { ProductCard } from '@/components/product-card'
import { Parallax, Reveal, RevealGroup, RevealItem, ScrollWords } from '@/components/motion/reveal'
import { LadyQueenLogo } from '@/components/brand/logo'
import { sweetHairProducts } from '@/lib/data/sweet-hair-products'
import { fragranceProducts } from '@/lib/data/fragrance-products'
import { crochetProducts } from '@/lib/data/crochet-products'
import { brands } from '@/lib/brands'
import { WHATSAPP_NUMBER } from '@/lib/utils'

const services = [
  { icon: MessageCircle, title: 'Commande WhatsApp', text: 'Votre panier arrive directement chez nous, on confirme avec vous.' },
  { icon: Truck, title: 'Livraison rapide', text: 'À Abidjan dès 1 500 FCFA, partout en Côte d’Ivoire.' },
  { icon: Sparkles, title: 'Conseil personnalisé', text: 'Une question sur un soin, un parfum, une taille ? On vous guide.' },
  { icon: CrownIcon, title: 'Sélection exigeante', text: 'Des produits choisis et des pièces finies avec soin.' },
]

export default function HomePage() {
  const featured = [
    sweetHairProducts[0],
    fragranceProducts[0],
    crochetProducts[0],
    sweetHairProducts.find((p) => p.isKit) ?? sweetHairProducts[3],
    fragranceProducts[1],
    crochetProducts[1],
    fragranceProducts[2],
    crochetProducts[2],
  ].filter(Boolean)

  return (
    <>
      <HomeHero />

      <Marquee
        className="bg-deep-black py-5 font-display text-2xl italic text-cream-white sm:text-3xl"
        items={['Sweet-Hair', 'Fragrance', 'Crochet by THED', 'Beauty. Roots. Ritual.', 'Sweet-Hair', 'Fragrance', 'Crochet by THED', 'Beauty. Roots. Ritual.']}
      />

      {/* Les marques */}
      <section id="marques" className="scroll-mt-24 bg-cream-white py-20 lg:py-28">
        <div className="container-luxury">
          <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-2 lg:items-end">
            <Reveal>
              <p className="eyebrow-label mb-4">Une maison, trois marques</p>
              <h2 className="font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                Chaque marque a sa voix,
                <br />
                <em className="font-normal text-champagne-gold">toutes portent la couronne.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.15} className="lg:justify-self-end">
              <p className="max-w-md text-base leading-relaxed text-warm-600 lg:text-lg">
                Sweet-Hair prend soin de vos cheveux, Fragrance vous trouve le parfum qui vous ressemble, Crochet by THED
                habille avec des pièces faites main. Choisissez votre porte.
              </p>
            </Reveal>
          </div>
          <BrandDoors />
        </div>
      </section>

      {/* Incontournables */}
      <section id="incontournables" className="scroll-mt-24 bg-cream-light py-20 lg:py-28">
        <div className="container-luxury">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <p className="eyebrow-label mb-4">Les incontournables</p>
              <h2 className="font-display text-4xl sm:text-5xl">Nos pièces préférées</h2>
            </Reveal>
            <Reveal delay={0.1} className="flex flex-wrap gap-2">
              {brands.map((b) => (
                <Link key={b.slug} href={b.href} className="chip bg-cream-white">
                  {b.name}
                </Link>
              ))}
            </Reveal>
          </div>

          <RevealGroup className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-14">
            {featured.map((product, i) => (
              <RevealItem key={product.id}>
                <ProductCard product={product} priority={i < 4} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Manifeste */}
      <section className="grain bg-cream-white py-24 lg:py-40">
        <div className="container-luxury max-w-5xl text-center">
          <Reveal>
            <LadyQueenLogo tone="gold" className="mx-auto mb-10 w-40" />
          </Reveal>
          <ScrollWords
            className="font-display text-[1.75rem] leading-[1.25] sm:text-4xl lg:text-[3.25rem] lg:leading-[1.2]"
            text="Lady Queen est née d’une conviction : la beauté africaine mérite des rituels à sa hauteur. Des soins qui respectent nos textures, des parfums qui signent une présence, des pièces faites main qui racontent un savoir-faire."
          />
        </div>
      </section>

      {/* Inspiration */}
      <section className="overflow-hidden bg-deep-black py-20 text-cream-white lg:py-32">
        <div className="container-luxury grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow-label mb-6 text-champagne-gold">Notre inspiration</p>
            <h2 className="font-display text-4xl leading-[1.1] sm:text-5xl">
              Du karité récolté avec soin aux mains qui façonnent chaque maille.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-cream-white/65 lg:text-lg">
              Nous croyons aux histoires derrière les objets. Écrivez-nous pour un conseil, une commande spéciale ou
              simplement pour découvrir ce qui arrive bientôt.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-10"
            >
              Parler à une conseillère <ArrowRight size={16} />
            </a>
          </Reveal>

          <div className="grid grid-cols-3 gap-3 sm:gap-5">
            {[
              { src: '/images/gallery/sweet-hair-lifestyle.png', cls: 'mt-16', amount: 40 },
              { src: '/images/gallery/fragrance-lifestyle.png', cls: '', amount: 70 },
              { src: '/images/gallery/crochet-lifestyle.png', cls: 'mt-28', amount: 40 },
            ].map((img, i) => (
              <Reveal key={img.src} delay={i * 0.12} className={img.cls}>
                <Parallax amount={img.amount} className="relative aspect-[3/5] rounded-t-[999px] rounded-b-soft">
                  <Image src={img.src} alt="" fill sizes="(max-width: 1024px) 33vw, 18vw" className="object-cover" />
                </Parallax>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-b border-warm-200 bg-cream-white py-16 lg:py-20">
        <RevealGroup className="container-luxury grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, text }) => (
            <RevealItem key={title} className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-champagne-gold/50 text-gold-dark">
                <Icon size={20} strokeWidth={1.5} />
              </span>
              <div>
                <h3 className="font-display text-lg">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-warm-500">{text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
    </>
  )
}
