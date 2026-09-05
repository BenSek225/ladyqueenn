import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { UniverseCard } from '@/components/home/universe-card'
import { ProductCard } from '@/components/product-card'
import { sweetHairProducts } from '@/lib/data/sweet-hair-products'
import { fragranceProducts } from '@/lib/data/fragrance-products'
import { crochetProducts } from '@/lib/data/crochet-products'

export default function HomePage() {
  // Sélectionner 6 produits récents (2 de chaque univers)
  const featuredProducts = [
    ...sweetHairProducts.slice(0, 2),
    ...fragranceProducts.slice(0, 2),
    ...crochetProducts.slice(0, 2),
  ]

  return (
    <main>
      {/* Hero Section - Embrace Your Queenn Energy */}
      <section className="relative min-h-[80vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero/home.png"
            alt="Lady Queenn - Embrace Your Queenn Energy"
            fill
            priority
            quality={90}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-black/40 via-transparent to-cream-white/80" />
        </div>

        {/* Content */}
        <div className="container-luxury text-center px-4 sm:px-6 py-16 sm:py-20">
          <p className="eyebrow-label text-champagne-gold mb-4 sm:mb-6 animate-fade-in text-xs sm:text-sm">
            BEAUTY. ROOTS. RITUAL.
          </p>

          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-9xl leading-[0.95] mb-6 sm:mb-8 text-deep-black animate-slide-up" style={{ animationDelay: '150ms' }}>
            Embrace Your
            <br />
            <span className="italic font-normal text-champagne-gold">Queenn Energy</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-dark-gray max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed animate-slide-up px-4" style={{ animationDelay: '300ms' }}>
            Soins naturels, parfums intemporels et pièces artisanales qui célèbrent 
            l'élégance africaine et le luxe conscient.
          </p>

          <Link 
            href="#universes" 
            className="btn-primary inline-flex items-center gap-2 sm:gap-3 text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 animate-scale-in min-h-[48px]" 
            style={{ animationDelay: '450ms' }}
          >
            Découvrir nos univers
            <ArrowRight size={18} className="sm:w-5 sm:h-5" />
          </Link>
        </div>

        {/* Scroll Indicator - Hidden on mobile */}
        <div className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-champagne-gold rounded-full flex justify-center p-2">
            <div className="w-1.5 h-1.5 bg-champagne-gold rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Section 3 Univers */}
      <section id="universes" className="py-12 sm:py-16 lg:py-32 bg-cream-white">
        <div className="container-luxury px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <p className="eyebrow-label mb-3 sm:mb-4">Nos Collections</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 px-4">
              Trois univers du raffinement
            </h2>
            <p className="text-base sm:text-lg text-warm-500 max-w-2xl mx-auto px-4">
              Chaque volet raconte une histoire d'authenticité, de savoir-faire et d'excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <UniverseCard
              title="Sweet-Hair"
              subtitle="SOINS CAPILLAIRES NATURELS"
              description="Nourrir, hydrater et célébrer vos textures naturelles avec des soins végétaux d'exception."
              image="/images/hero/sweet-hair.png"
              href="/sweet-hair"
              accent="sage"
            />
            <UniverseCard
              title="Fragrance"
              subtitle="PARFUMS DE LUXE"
              description="Des fragrances inspirées par l'héritage africain, créées pour sublimer votre signature olfactive."
              image="/images/hero/fragrance.png"
              href="/fragrance"
              accent="plum"
            />
            <UniverseCard
              title="Crochet by THED"
              subtitle="CRÉATIONS ARTISANALES"
              description="Pièces intemporelles au crochet, confectionnées avec intention et enracinées dans la tradition."
              image="/images/hero/crochet-by-thed.png"
              href="/crochet-by-thed"
              accent="terracotta"
            />
          </div>
        </div>
      </section>

      {/* Section Nouveautés */}
      <section className="py-12 sm:py-16 lg:py-32 bg-cream-light">
        <div className="container-luxury px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 gap-4 sm:gap-6">
            <div>
              <p className="eyebrow-label mb-2 sm:mb-3">Nouveautés</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">
                Nos dernières créations
              </h2>
            </div>
            <Link 
              href="#boutique" 
              className="text-xs sm:text-sm font-medium uppercase tracking-wider text-deep-black hover:text-champagne-gold transition-colors inline-flex items-center gap-2 min-h-[44px]"
            >
              Voir tout
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Section Inspiration (Editorial) */}
      <section className="py-12 sm:py-16 lg:py-32 bg-deep-black text-cream-white">
        <div className="container-luxury px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <p className="eyebrow-label text-champagne-gold mb-4 sm:mb-6">NOTRE INSPIRATION</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 leading-tight">
                Du karité récolté avec soin aux mains qui façonnent chaque pièce
              </h2>
              <p className="text-base sm:text-lg text-warm-300 leading-relaxed mb-6 sm:mb-8">
                Nous croyons aux histoires derrière les objets. Découvrez nos inspirations, 
                nos artisans et les rituels qui nous accompagnent au quotidien.
              </p>
              <a 
                href="https://wa.me/2250710504007" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm uppercase tracking-wider text-champagne-gold hover:text-soft-gold transition-colors min-h-[44px]"
              >
                Parler à un conseiller
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-3 sm:space-y-4">
                <div className="relative aspect-square rounded-soft overflow-hidden">
                  <Image
                    src="/images/gallery/sweet-hair-lifestyle.png"
                    alt="Inspiration Lady Queenn"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[4/5] rounded-soft overflow-hidden">
                  <Image
                    src="/images/gallery/crochet-lifestyle.png"
                    alt="Artisanat Lady Queenn"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-8">
                <div className="relative aspect-[4/5] rounded-soft overflow-hidden">
                  <Image
                    src="/images/gallery/crochet-lifestyle.png"
                    alt="Matières naturelles"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-soft overflow-hidden">
                  <Image
                    src="/images/gallery/crochet-lifestyle.png"
                    alt="Savoir-faire"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
