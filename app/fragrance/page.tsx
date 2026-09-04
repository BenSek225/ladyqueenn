'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { ProductCard } from '@/components/product-card'
import { fragranceProducts } from '@/lib/data/fragrance-products'

export default function FragrancePage() {
  const [filter, setFilter] = useState<'all' | 'homme' | 'femme' | 'mixte'>('all')

  const filteredProducts = filter === 'all' 
    ? fragranceProducts 
    : fragranceProducts.filter(p => p.gender === filter)

  return (
    <main className="volet-fragrance">
      {/* Hero Section - Luxe & Dramatique */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-deep-black">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/gallery/fragrance-lifestyle.png"
            alt="Fragrance - Luxury Fragrances"
            fill
            priority
            quality={90}
            className="object-cover opacity-60"
          />
          {/* Overlay prune/rose dramatique */}
          <div className="absolute inset-0 bg-gradient-to-b from-fr-plum/70 via-fr-plum/40 to-deep-black/90" />
        </div>

        {/* Content */}
        <div className="container-luxury text-center px-6 py-20 text-cream-white">
          <p className="eyebrow-label text-fr-rose mb-6 animate-fade-in">
            PARFUMS DE LUXE
          </p>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6 animate-slide-up" style={{ animationDelay: '150ms' }}>
            Lady Queenn
            <br />
            <span className="italic font-normal text-champagne-gold">Fragrance</span>
          </h1>

          <p className="text-base md:text-lg text-cream-light max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '300ms' }}>
            Des fragrances inspirées par l'héritage africain, créées pour sublimer 
            votre signature olfactive et raconter votre histoire.
          </p>

          <Link 
            href="#products" 
            className="bg-champagne-gold text-deep-black px-8 py-4 rounded-soft font-medium hover:bg-soft-gold transition-all duration-normal inline-flex items-center gap-3 animate-scale-in" 
            style={{ animationDelay: '450ms' }}
          >
            Découvrir nos parfums
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Déco flottante */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream-white to-transparent" />
      </section>

      {/* Breadcrumb */}
      <div className="container-luxury pt-6">
        <Breadcrumb items={[{ label: 'FRAGRANCE', href: '/fragrance' }]} />
      </div>

      {/* Section Introduction */}
      <section className="py-16 lg:py-20 bg-cream-white">
        <div className="container-luxury text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-fr-plum mb-6">
            <Sparkles className="w-5 h-5" />
            <span className="eyebrow-label">L'ART DU PARFUM</span>
            <Sparkles className="w-5 h-5" />
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl mb-6">
            Une signature olfactive unique
          </h2>
          
          <p className="text-lg text-warm-500 leading-relaxed">
            Nos parfums sont sélectionnés avec soin parmi les plus grandes maisons 
            de luxe internationales. Chaque fragrance raconte une histoire, 
            évoque une émotion, sublime votre présence.
          </p>
        </div>
      </section>

      {/* Section Filtres & Produits */}
      <section id="products" className="py-20 lg:py-32 bg-fr-light/30">
        <div className="container-luxury">
          {/* Filtres - Tabs élégants */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-soft text-sm font-medium uppercase tracking-wider transition-all duration-normal ${
                filter === 'all'
                  ? 'bg-fr-plum text-cream-white'
                  : 'bg-white text-fr-plum hover:bg-fr-plum/10 border border-fr-plum/20'
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setFilter('homme')}
              className={`px-6 py-3 rounded-soft text-sm font-medium uppercase tracking-wider transition-all duration-normal ${
                filter === 'homme'
                  ? 'bg-fr-plum text-cream-white'
                  : 'bg-white text-fr-plum hover:bg-fr-plum/10 border border-fr-plum/20'
              }`}
            >
              Homme
            </button>
            <button
              onClick={() => setFilter('femme')}
              className={`px-6 py-3 rounded-soft text-sm font-medium uppercase tracking-wider transition-all duration-normal ${
                filter === 'femme'
                  ? 'bg-fr-plum text-cream-white'
                  : 'bg-white text-fr-plum hover:bg-fr-plum/10 border border-fr-plum/20'
              }`}
            >
              Femme
            </button>
            <button
              onClick={() => setFilter('mixte')}
              className={`px-6 py-3 rounded-soft text-sm font-medium uppercase tracking-wider transition-all duration-normal ${
                filter === 'mixte'
                  ? 'bg-fr-plum text-cream-white'
                  : 'bg-white text-fr-plum hover:bg-fr-plum/10 border border-fr-plum/20'
              }`}
            >
              Mixte
            </button>
          </div>

          {/* Compteur */}
          <p className="text-center text-sm text-warm-500 mb-8">
            {filteredProducts.length} {filteredProducts.length > 1 ? 'parfums' : 'parfum'} {filter !== 'all' && `- ${filter}`}
          </p>

          {/* Grille Produits */}
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Section Storytelling - L'Inspiration */}
      <section className="py-20 lg:py-32 bg-deep-black text-cream-white">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative aspect-[4/5] rounded-soft overflow-hidden">
              <Image
src="/images/hero/fragrance.png"
                alt="L'art du parfum Lady Queenn"
                fill
                className="object-cover"
              />
            </div>

            {/* Texte */}
            <div>
              <p className="eyebrow-label text-fr-rose mb-6">NOTRE SÉLECTION</p>
              
              <h2 className="font-display text-4xl md:text-5xl mb-6 leading-tight">
                Des maisons de luxe 
                <br />
                <span className="italic font-normal text-champagne-gold">aux notes ivoiriennes</span>
              </h2>
              
              <p className="text-lg text-cream-light leading-relaxed mb-6">
                Nous travaillons avec les plus prestigieuses maisons de parfumerie 
                pour vous offrir des fragrances d'exception. Chaque flacon est une 
                invitation au voyage, une célébration de l'élégance intemporelle.
              </p>
              
              <p className="text-base text-warm-300 leading-relaxed mb-8">
                Disponibilité variable selon les arrivages. 
                Contactez-nous pour connaître nos références du moment : 
                Andolacy, Tom Ford, Creed, et bien d'autres marques de prestige.
              </p>

              <a
                href="https://wa.me/2250710504007?text=Bonjour%2C%20je%20souhaite%20des%20informations%20sur%20vos%20parfums%20disponibles"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm uppercase tracking-wider text-champagne-gold hover:text-soft-gold transition-colors"
              >
                Demander conseil
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section Engagements */}
      <section className="py-16 lg:py-20 bg-fr-light/50">
        <div className="container-luxury">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-fr-plum/10 mb-4">
                <Sparkles className="w-7 h-7 text-fr-plum" />
              </div>
              <h3 className="font-display text-lg mb-2">Authenticité garantie</h3>
              <p className="text-sm text-warm-500">
                Tous nos parfums sont 100% authentiques et proviennent de sources officielles
              </p>
            </div>

            <div>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-fr-plum/10 mb-4">
                <svg className="w-7 h-7 text-fr-plum" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-display text-lg mb-2">Longue tenue</h3>
              <p className="text-sm text-warm-500">
                Des concentrations Eau de Parfum pour une signature olfactive qui dure
              </p>
            </div>

            <div>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-fr-plum/10 mb-4">
                <svg className="w-7 h-7 text-fr-plum" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display text-lg mb-2">Conseil personnalisé</h3>
              <p className="text-sm text-warm-500">
                Nous vous aidons à trouver la fragrance qui vous correspond parfaitement
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
