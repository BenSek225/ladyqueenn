'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { ArrowRight, Heart, Scissors, Sparkles, MessageCircle } from 'lucide-react'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { ProductCard } from '@/components/product-card'
import { crochetProducts } from '@/lib/data/crochet-products'

export default function CrochetPage() {
  const [activeTab, setActiveTab] = useState<'boutique' | 'sur-mesure' | 'galerie'>('boutique')
  const tabsSectionRef = useRef<HTMLElement>(null)

  const handleTabChange = (tab: 'boutique' | 'sur-mesure' | 'galerie') => {
    setActiveTab(tab)
    requestAnimationFrame(() => tabsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  return (
    <main className="volet-crochet">
      {/* Hero Section - Lifestyle Artisanal */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero/crochet-by-thed.png"
            alt="Crochet by THED - Handmade Creations"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover"
          />
          {/* Overlay terracotta chaud */}
          <div className="absolute inset-0 bg-gradient-to-b from-cr-light/60 via-cr-terracotta/20 to-cream-white/90" />
        </div>

        {/* Content */}
        <div className="container-luxury text-center py-12 sm:py-16 lg:py-20">
          <p className="eyebrow-label text-cr-earth mb-6 animate-fade-in">
            FAIT À LA MAIN, PORTÉ AVEC INTENTION
          </p>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] mb-6 text-deep-black animate-slide-up [animation-delay:150ms]">
            Crochet
            <br />
            <span className="italic font-normal text-cr-earth">by THED</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-dark-gray max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed animate-slide-up [animation-delay:300ms]">
            Pièces intemporelles au crochet, confectionnées avec intention 
            et enracinées dans la tradition artisanale ivoirienne.
          </p>

          <Link 
            href="#products" 
            className="btn-primary bg-cr-earth hover:bg-cr-terracotta border-cr-earth inline-flex items-center gap-2 sm:gap-3 animate-scale-in [animation-delay:450ms]"
          >
            Découvrir nos créations
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container-luxury pt-6">
        <Breadcrumb items={[{ label: 'CROCHET BY THED', href: '/crochet-by-thed' }]} />
      </div>

      {/* Section Introduction */}
      <section className="py-16 lg:py-20 bg-cream-white">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Texte */}
            <div>
              <p className="eyebrow-label text-cr-earth mb-4">L'ARTISANAT COMME HÉRITAGE</p>
              
              <h2 className="font-display text-4xl md:text-5xl mb-6">
                Chaque maille raconte 
                <br />
                <span className="italic font-normal text-cr-terracotta">une histoire</span>
              </h2>
              
              <p className="text-lg text-warm-500 leading-relaxed mb-6">
                THED crée des pièces uniques au crochet, alliant savoir-faire traditionnel 
                et design contemporain. Chaque création est pensée pour traverser le temps 
                et accompagner vos moments précieux.
              </p>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 sm:mb-16">
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-cr-earth mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-deep-black">Fait main avec amour</p>
                    <p className="text-sm text-warm-500">Chaque pièce est unique</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Scissors className="w-5 h-5 text-cr-earth mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-deep-black">Personnalisable</p>
                    <p className="text-sm text-warm-500">Couleurs et tailles sur-mesure</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative aspect-[4/5] rounded-soft overflow-hidden">
              <Image
src="/images/gallery/crochet-lifestyle.png"
                alt="Artisanat crochet THED"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section ref={tabsSectionRef} className="py-3 sm:py-5 lg:py-6 bg-cr-light/95 backdrop-blur-sm sticky top-16 lg:top-20 z-30 border-b border-cr-terracotta/20">
        <div className="container-luxury px-3 sm:px-6">
          <div className="flex justify-center gap-2 sm:gap-3">
            <button
              onClick={() => handleTabChange('boutique')}
              className={`flex-1 sm:flex-none px-3 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-medium uppercase tracking-[0.08em] sm:tracking-wider transition-all duration-300 ${
                activeTab === 'boutique'
                  ? 'bg-cr-earth text-cream-white scale-105'
                  : 'bg-white text-cr-earth hover:bg-cr-earth/10 border border-cr-earth/20 hover:scale-105'
              }`}
            >
              Prêt-à-porter
            </button>
            <button
              onClick={() => handleTabChange('sur-mesure')}
              className={`flex-1 sm:flex-none px-3 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-medium uppercase tracking-[0.08em] sm:tracking-wider transition-all duration-300 ${
                activeTab === 'sur-mesure'
                  ? 'bg-cr-earth text-cream-white scale-105'
                  : 'bg-white text-cr-earth hover:bg-cr-earth/10 border border-cr-earth/20 hover:scale-105'
              }`}
            >
              Sur-mesure
            </button>
            <button
              onClick={() => handleTabChange('galerie')}
              className={`flex-1 sm:flex-none px-3 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-medium uppercase tracking-[0.08em] sm:tracking-wider transition-all duration-300 ${
                activeTab === 'galerie'
                  ? 'bg-cr-earth text-cream-white scale-105'
                  : 'bg-white text-cr-earth hover:bg-cr-earth/10 border border-cr-earth/20 hover:scale-105'
              }`}
            >
              Galerie
            </button>
          </div>
        </div>
      </section>

      {/* Section Prêt-à-porter */}
      {activeTab === 'boutique' && (
        <section id="products" className="py-20 lg:py-32 bg-cream-light">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl md:text-5xl mb-4">
                Nos créations prêtes à porter
              </h2>
              <p className="text-lg text-warm-500 max-w-2xl mx-auto">
                Pièces uniques disponibles immédiatement
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {crochetProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section Sur-mesure */}
      {activeTab === 'sur-mesure' && (
        <section className="py-20 lg:py-32 bg-cream-light">
          <div className="container-luxury max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl mb-6">
                Créons ensemble votre pièce unique
              </h2>
              <p className="text-lg text-warm-500 max-w-2xl mx-auto">
                Commandez une création sur-mesure adaptée à vos envies : 
                couleurs, taille, design personnalisé.
              </p>
            </div>

            {/* Process 4 étapes */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {/* Étape 1 */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cr-light mb-4">
                  <MessageCircle className="w-8 h-8 text-cr-earth" />
                </div>
                <h3 className="font-display text-lg mb-2">1. Contact</h3>
                <p className="text-sm text-warm-500">
                  Décrivez votre projet via WhatsApp
                </p>
              </div>

              {/* Étape 2 */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cr-light mb-4">
                  <Sparkles className="w-8 h-8 text-cr-earth" />
                </div>
                <h3 className="font-display text-lg mb-2">2. Design</h3>
                <p className="text-sm text-warm-500">
                  Choisissez couleurs, taille et style
                </p>
              </div>

              {/* Étape 3 */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cr-light mb-4">
                  <Scissors className="w-8 h-8 text-cr-earth" />
                </div>
                <h3 className="font-display text-lg mb-2">3. Confection</h3>
                <p className="text-sm text-warm-500">
                  THED confectionne votre pièce (7-14 jours)
                </p>
              </div>

              {/* Étape 4 */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cr-light mb-4">
                  <Heart className="w-8 h-8 text-cr-earth" />
                </div>
                <h3 className="font-display text-lg mb-2">4. Livraison</h3>
                <p className="text-sm text-warm-500">
                  Recevez votre création unique
                </p>
              </div>
            </div>

            {/* CTA Sur-mesure */}
            <div className="bg-cr-earth text-cream-white rounded-soft p-8 md:p-12 text-center">
              <h3 className="font-display text-3xl mb-4">
                Prêt à créer votre pièce sur-mesure ?
              </h3>
              <p className="text-lg text-cream-light mb-8 max-w-2xl mx-auto">
                Contactez THED pour discuter de votre projet. 
                Ensemble, nous donnerons vie à la pièce de vos rêves.
              </p>
              <a
                href="https://wa.me/2250710504007?text=Bonjour%2C%20je%20souhaite%20commander%20une%20pièce%20crochet%20sur-mesure"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-cream-white text-cr-earth px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium hover:bg-champagne-gold hover:text-deep-black hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2 sm:gap-3"
              >
                Commander sur-mesure
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Section Galerie */}
      {activeTab === 'galerie' && (
        <section className="py-20 lg:py-32 bg-cream-light">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl md:text-5xl mb-4">
                Galerie de réalisations
              </h2>
              <p className="text-lg text-warm-500 max-w-2xl mx-auto">
                Découvrez nos créations précédentes et laissez-vous inspirer
              </p>
            </div>

            {/* Grid Masonry-style */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div 
                  key={i} 
                  className={`relative rounded-soft overflow-hidden bg-warm-gray-100 hover:shadow-xl transition-all duration-normal ${
                    i % 3 === 0 ? 'aspect-[4/5]' : 'aspect-square'
                  }`}
                >
                  <Image
src="/images/hero/crochet-by-thed.png"
                    alt={`Création crochet ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* CTA Galerie */}
            <div className="text-center mt-12">
              <p className="text-sm text-warm-500 mb-4">
                Envie d'une pièce similaire ?
              </p>
              <a
                href="https://wa.me/2250710504007?text=Bonjour%2C%20j'ai%20vu%20une%20création%20dans%20votre%20galerie%20qui%20m'intéresse"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-cr-earth hover:text-cr-terracotta transition-colors"
              >
                Contactez-nous
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Section Valeurs */}
      <section className="py-20 lg:py-32 bg-cream-white">
        <div className="container-luxury max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-12">
            Pourquoi choisir Crochet by THED ?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-cr-light mb-4">
                <Heart className="w-7 h-7 text-cr-earth" />
              </div>
              <h3 className="font-display text-lg mb-2">Fait avec amour</h3>
              <p className="text-sm text-warm-500">
                Chaque maille est crochetée avec soin et passion
              </p>
            </div>

            <div>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-cr-light mb-4">
                <Sparkles className="w-7 h-7 text-cr-earth" />
              </div>
              <h3 className="font-display text-lg mb-2">Pièces uniques</h3>
              <p className="text-sm text-warm-500">
                Aucune création n'est identique, chacune est spéciale
              </p>
            </div>

            <div>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-cr-light mb-4">
                <svg className="w-7 h-7 text-cr-earth" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
              </div>
              <h3 className="font-display text-lg mb-2">Durabilité</h3>
              <p className="text-sm text-warm-500">
                Des créations conçues pour durer et se transmettre
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
