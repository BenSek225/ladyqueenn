import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Droplet, Sparkles, Heart, Leaf } from 'lucide-react'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { ProductCard } from '@/components/product-card'
import { sweetHairProducts } from '@/lib/data/sweet-hair-products'

export const metadata = {
  title: 'Sweet-Hair — Soins Capillaires Naturels | Lady Queenn',
  description: 'Soins biologiques formulés avec des ingrédients naturels pour des cheveux nourris, forts et resplendissants.',
}

export default function SweetHairPage() {
  return (
    <main className="volet-sweet-hair">
      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/placeholder.jpg"
            alt="Sweet-Hair Natural Hair Care"
            fill
            priority
            quality={90}
            className="object-cover"
          />
          {/* Overlay vert sauge subtil */}
          <div className="absolute inset-0 bg-gradient-to-b from-sh-light/60 via-sh-light/40 to-cream-white" />
        </div>

        {/* Content */}
        <div className="container-luxury text-center px-6 py-20">
          <p className="eyebrow-label text-sh-olive mb-6 animate-fade-in">
            SOIN NATUREL & LUXUEUX
          </p>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6 text-deep-black animate-slide-up" style={{ animationDelay: '150ms' }}>
            Lady Queenn
            <br />
            <span className="italic font-normal text-sh-olive">Sweet-Hair</span>
          </h1>

          <p className="text-base md:text-lg text-dark-gray max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '300ms' }}>
            Des soins biologiques, formulés avec des ingrédients naturels d'Ivoire 
            pour des cheveux nourris, forts et resplendissants.
          </p>

          <Link 
            href="#products" 
            className="btn-primary bg-sh-olive hover:bg-sh-sage border-sh-olive inline-flex items-center gap-3 animate-scale-in" 
            style={{ animationDelay: '450ms' }}
          >
            Découvrir nos rituels
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container-luxury pt-6">
        <Breadcrumb items={[{ label: 'CHEVEUX', href: '/cheveux' }]} />
      </div>

      {/* Section Bénéfices */}
      <section className="py-16 lg:py-20 bg-cream-white">
        <div className="container-luxury">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl mb-4">
              Pourquoi choisir Sweet-Hair ?
            </h2>
            <p className="text-warm-500 max-w-2xl mx-auto">
              Quatre promesses pour sublimer vos cheveux naturellement
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Bénéfice 1 */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sh-light mb-6 transition-all duration-normal group-hover:scale-110 group-hover:bg-sh-sage/30">
                <Leaf className="w-8 h-8 text-sh-olive" />
              </div>
              <h3 className="font-display text-xl mb-3">100% Naturel</h3>
              <p className="text-sm text-warm-500 leading-relaxed">
                Ingrédients biologiques et huiles végétales pures d'Afrique
              </p>
            </div>

            {/* Bénéfice 2 */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sh-light mb-6 transition-all duration-normal group-hover:scale-110 group-hover:bg-sh-sage/30">
                <Sparkles className="w-8 h-8 text-sh-olive" />
              </div>
              <h3 className="font-display text-xl mb-3">Pousse Accélérée</h3>
              <p className="text-sm text-warm-500 leading-relaxed">
                Stimule la croissance et renforce les racines
              </p>
            </div>

            {/* Bénéfice 3 */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sh-light mb-6 transition-all duration-normal group-hover:scale-110 group-hover:bg-sh-sage/30">
                <Droplet className="w-8 h-8 text-sh-olive" />
              </div>
              <h3 className="font-display text-xl mb-3">Hydratation Intense</h3>
              <p className="text-sm text-warm-500 leading-relaxed">
                Nourrit en profondeur et apporte volume et brillance
              </p>
            </div>

            {/* Bénéfice 4 */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sh-light mb-6 transition-all duration-normal group-hover:scale-110 group-hover:bg-sh-sage/30">
                <Heart className="w-8 h-8 text-sh-olive" />
              </div>
              <h3 className="font-display text-xl mb-3">Réparation Totale</h3>
              <p className="text-sm text-warm-500 leading-relaxed">
                Traite les problèmes du cuir chevelu et répare les cheveux abîmés
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Produits */}
      <section id="products" className="py-20 lg:py-32 bg-cream-light">
        <div className="container-luxury">
          <div className="text-center mb-12">
            <p className="eyebrow-label mb-3">Notre Gamme</p>
            <h2 className="font-display text-4xl md:text-5xl mb-4">
              Les essentiels Sweet-Hair
            </h2>
            <p className="text-lg text-warm-500 max-w-2xl mx-auto">
              Huile, shampoing et pommade pour un rituel capillaire complet
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {sweetHairProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Section Kit Highlight */}
      <section className="py-20 lg:py-32 bg-sh-olive text-cream-white">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-champagne-gold text-deep-black px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
              Offre Spéciale
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
              Kit Complet Sweet-Hair
            </h2>

            <p className="text-lg md:text-xl mb-4 leading-relaxed">
              Huile 60ml + Shampoing 250ml + Pommade
            </p>

            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-3xl md:text-4xl font-mono font-bold">5 000 FCFA</span>
              <span className="text-xl text-cream-light line-through">6 000 FCFA</span>
            </div>

            <p className="text-base text-cream-light mb-10 max-w-2xl mx-auto">
              Économisez 1 000 FCFA avec notre kit complet. 
              Tout ce dont vos cheveux ont besoin pour un rituel de soin optimal.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#products" 
                className="bg-cream-white text-sh-olive px-8 py-4 rounded-soft font-medium hover:bg-champagne-gold hover:text-deep-black transition-all duration-normal inline-flex items-center justify-center gap-3"
              >
                Commander le kit
                <ArrowRight size={20} />
              </Link>
              <a
                href="https://wa.me/2250710504007?text=Bonjour%2C%20je%20souhaite%20commander%20le%20Kit%20Sweet-Hair%20complet"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-cream-white text-cream-white px-8 py-4 rounded-soft font-medium hover:bg-cream-white hover:text-sh-olive transition-all duration-normal inline-flex items-center justify-center gap-3"
              >
                Commander via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section Rituels (Optionnel) */}
      <section className="py-20 lg:py-32 bg-cream-white">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl text-center mb-12">
              Comment utiliser Sweet-Hair ?
            </h2>

            <div className="space-y-8">
              {/* Étape 1 */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sh-light flex items-center justify-center">
                  <span className="font-display text-xl text-sh-olive">1</span>
                </div>
                <div>
                  <h3 className="font-display text-xl mb-2">Préparez vos cheveux</h3>
                  <p className="text-warm-500 leading-relaxed">
                    Appliquez l'huile Sweet-Hair sur cheveux secs ou humides, 
                    en massant le cuir chevelu pour stimuler la circulation.
                  </p>
                </div>
              </div>

              {/* Étape 2 */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sh-light flex items-center justify-center">
                  <span className="font-display text-xl text-sh-olive">2</span>
                </div>
                <div>
                  <h3 className="font-display text-xl mb-2">Lavez en douceur</h3>
                  <p className="text-warm-500 leading-relaxed">
                    Utilisez le shampoing Sweet-Hair pour nettoyer en profondeur 
                    tout en préservant les huiles naturelles.
                  </p>
                </div>
              </div>

              {/* Étape 3 */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sh-light flex items-center justify-center">
                  <span className="font-display text-xl text-sh-olive">3</span>
                </div>
                <div>
                  <h3 className="font-display text-xl mb-2">Coiffez et protégez</h3>
                  <p className="text-warm-500 leading-relaxed">
                    Appliquez la pommade Sweet-Hair pour définir vos boucles, 
                    sceller l'hydratation et protéger contre les agressions extérieures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
