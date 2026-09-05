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
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-black/20 via-transparent to-cream-white/90" />
        </div>

        {/* Content */}
        <div className="container-luxury text-center py-12 sm:py-16 lg:py-20">
          <p className="eyebrow-label text-champagne-gold mb-4 sm:mb-6 animate-fade-in text-xs sm:text-sm">
            BEAUTY. ROOTS. RITUAL.
          </p>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl leading-[0.95] mb-6 sm:mb-8 text-deep-black animate-slide-up [animation-delay:150ms]">
            Embrace Your
            <br />
            <span className="italic font-normal text-champagne-gold">Queenn Energy</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-dark-gray max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed animate-slide-up [animation-delay:300ms]">
            Soins naturels, parfums intemporels et pièces artisanales qui célèbrent 
            l'élégance africaine et le luxe conscient.
          </p>

          <Link 
            href="#universes" 
            className="btn-primary inline-flex items-center gap-2 sm:gap-3 text-sm sm:text-base animate-scale-in [animation-delay:450ms]"
          >
            Découvrir nos univers
            <ArrowRight size={18} className="sm:w-5 sm:h-5" />
          </Link>
        </div>

        {/* Scroll Indicator - Hidden on mobile */}
        <div className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-champagne-gold rounded-full flex justify-center p-2">
            <div className="w-1.5 h-1.5 bg-champagne-gold rounded-full" />
          </div>
        </div>
      </section>

      {/* Section 3 Univers */}
      <section id="universes" className="py-12 sm:py-16 lg:py-32 bg-cream-white">
        <div className="container-luxury">
          <div className="text-center mb-12 sm:mb-16 reveal-fade-up">
            <p className="eyebrow-label mb-3 sm:mb-4">Nos Collections</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6">
              Trois univers du raffinement
            </h2>
            <p className="text-base sm:text-lg text-warm-500 max-w-2xl mx-auto">
              Chaque volet raconte une histoire d'authenticité, de savoir-faire et d'excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
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
              subtitle="PIÈCES ARTISANALES"
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
        <div className="container-luxury">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 gap-4 sm:gap-6 reveal-fade-up">
            <div>
              <p className="eyebrow-label mb-2 sm:mb-3">Nouveautés</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">
                Nos dernières créations
              </h2>
            </div>
            <Link 
              href="#boutique" 
              className="text-xs sm:text-sm font-medium uppercase tracking-wider text-deep-black hover:text-champagne-gold transition-all duration-300 inline-flex items-center gap-2 py-2 group"
            >
              Voir tout
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Section Inspiration (Editorial) */}
      <section className="py-12 sm:py-16 lg:py-32 bg-deep-black text-cream-white">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="reveal-fade-right">
              <p className="eyebrow-label text-champagne-gold mb-4 sm:mb-6">NOTRE INSPIRATION</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 leading-tight">
                Du karité récolté avec soin aux mains qui façonnent chaque pièce
              </h2>
              <p className="text-base sm:text-lg text-warm-200 leading-relaxed mb-6 sm:mb-8">
                Nous croyons aux histoires derrière les objets. Découvrez nos inspirations, 
                nos artisans et les rituels qui nous accompagnent au quotidien.
              </p>
              <a 
                href="https://wa.me/2250710504007" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm uppercase tracking-wider text-champagne-gold hover:text-soft-gold transition-all duration-300 py-2 group"
              >
                Parler à un conseiller
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 reveal-fade-left">
              <div className="space-y-3 sm:space-y-4">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src="/images/gallery/sweet-hair-lifestyle.png"
                    alt="Inspiration Lady Queenn"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
                  <Image
                    src="/images/gallery/crochet-lifestyle.png"
                    alt="Artisanat Lady Queenn"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-8">
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
                  <Image
                    src="/images/gallery/fragrance-lifestyle.png"
                    alt="Matières naturelles"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src="/images/gallery/sweet-hair-lifestyle.png"
                    alt="Savoir-faire"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
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
