'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Leaf, Heart, Sparkles, Package, ArrowLeft } from 'lucide-react'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { ProductCard } from '@/components/product-card'
import { AddToCart } from '@/components/add-to-cart'
import type { Product } from '@/lib/types'
import { getSimilarProducts, getUniverseName, getVoletPath } from '@/lib/data/all-products'

interface ProductDetailLayoutProps {
  product: Product
}

export function ProductDetailLayout({ product }: ProductDetailLayoutProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients' | 'usage'>('details')
  
  const images = product.images?.length ? product.images : [product.image]
  const detailText = product.longDescription || product.description
  const similarProducts = getSimilarProducts(product.id, product.volet, 4)

  // Définir le volet URL et nom
  const voletPath = getVoletPath(product.volet)
  const voletName = product.volet === 'sweet-hair' ? 'SWEET-HAIR' : 
                    product.volet === 'fragrance' ? 'FRAGRANCE' : 'CROCHET BY THED'
  const universeName = getUniverseName(product.volet)

  // Couleurs accent par volet
  const accentClass = product.volet === 'sweet-hair' ? 'text-sh-olive border-sh-olive' :
                      product.volet === 'fragrance' ? 'text-fr-plum border-fr-plum' :
                      'text-cr-earth border-cr-earth'
  
  const badgeClass = product.volet === 'sweet-hair' ? 'bg-sh-light text-sh-olive' :
                     product.volet === 'fragrance' ? 'bg-fr-light text-fr-plum' :
                     'bg-cr-light text-cr-earth'

  return (
    <main className="bg-cream-white">
      {/* Breadcrumb */}
      <div className="container-luxury pt-6">
        <Link 
          href={voletPath}
          className="inline-flex items-center gap-2 text-sm text-warm-500 hover:text-champagne-gold transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          Retour à {voletName}
        </Link>
        <Breadcrumb 
          items={[
            { label: voletName, href: voletPath },
            { label: product.name.toUpperCase(), href: `${voletPath}/${product.slug}` }
          ]} 
        />
      </div>

      {/* Layout Principal 60/40 */}
      <section className="container-luxury py-8 sm:py-12">
        <div className="grid lg:grid-cols-[58%_42%] gap-12 lg:gap-16">
          {/* Colonne Images (60%) */}
          <div className="space-y-4">
            {/* Image principale */}
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-warm-100 group">
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                priority
                quality={90}
                className="object-cover"
              />
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className={`inline-block px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider ${badgeClass}`}>
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Miniatures */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative aspect-square w-20 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                      i === selectedImage 
                        ? `border-champagne-gold shadow-gold-soft scale-105` 
                        : 'border-warm-200 hover:border-warm-300'
                    }`}
                  >
                    <Image 
                      src={img} 
                      alt={`${product.name} ${i + 1}`} 
                      fill 
                      className="object-cover" 
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Colonne Info (40%) */}
          <div className="space-y-8">
            {/* Eyebrow */}
            <p className={`eyebrow-label ${accentClass}`}>
              {universeName}
            </p>

            {/* Titre */}
            <h1 className="font-display text-4xl md:text-5xl leading-tight">
              {product.name}
            </h1>

            {/* Prix */}
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-3xl font-bold text-champagne-gold">
                {product.price.toLocaleString('fr-FR')} FCFA
              </span>
              {product.oldPrice && (
                <span className="text-xl text-warm-500 line-through">
                  {product.oldPrice.toLocaleString('fr-FR')} FCFA
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-base text-warm-500 leading-relaxed">
              {product.description}
            </p>

            {/* Variantes (si applicable - Fragrance genre) */}
            {product.gender && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-deep-black">Fragrance</p>
                <div className="inline-block px-3 py-2 bg-warm-gray-100 rounded text-sm capitalize">
                  {product.gender === 'homme' ? '👨 Homme' : 
                   product.gender === 'femme' ? '👩 Femme' : 
                   '⚧ Mixte'}
                </div>
              </div>
            )}

            {/* Variantes disponibles */}
            {('sizes' in product && product.sizes?.length) || ('colors' in product && product.colors?.length) ? (
              <div className="space-y-4 border-y border-warm-gray-200 py-5">
                {'sizes' in product && product.sizes?.length ? <div><p className="text-sm font-medium mb-2">Tailles</p><div className="flex flex-wrap gap-2">{product.sizes.map((size) => <span key={size} className="border border-warm-gray-200 px-3 py-1.5 text-sm rounded">{size}</span>)}</div></div> : null}
                {'colors' in product && product.colors?.length ? <div><p className="text-sm font-medium mb-2">Couleurs</p><div className="flex flex-wrap gap-2">{product.colors.map((color) => <span key={color} className="border border-warm-gray-200 px-3 py-1.5 text-sm rounded">{color}</span>)}</div></div> : null}
              </div>
            ) : null}

            {/* Actions */}
            <div className="space-y-3 pt-4">
              <AddToCart product={product} className="w-full" />
              
              <a
                href={`https://wa.me/2250710504007?text=Bonjour%2C%20je%20souhaite%20commander%20${encodeURIComponent(product.name)}%20à%20${product.price}%20FCFA`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-deep-black text-deep-black rounded-lg font-medium hover:bg-deep-black hover:text-cream-white hover:-translate-y-1 transition-all duration-300"
              >
                Commander via WhatsApp
                <ArrowRight size={20} />
              </a>
            </div>

            {/* USPs */}
            <div className="pt-6 space-y-3 border-t border-warm-gray-200">
              <div className="flex items-center gap-3 text-sm text-dark-gray">
                <Leaf className="w-5 h-5 text-champagne-gold" />
                <span>Ingrédients d'origine naturelle</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-dark-gray">
                <Heart className="w-5 h-5 text-champagne-gold" />
                <span>Fabrication artisanale</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-dark-gray">
                <Package className="w-5 h-5 text-champagne-gold" />
                <span>Livraison à Abidjan</span>
              </div>
              {product.badge === 'nouveau' && (
                <div className="flex items-center gap-3 text-sm text-dark-gray">
                  <Sparkles className="w-5 h-5 text-champagne-gold" />
                  <span>Nouveauté de la collection</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sections Tabs - Détails / Ingrédients / Utilisation */}
      <section className="border-y border-warm-gray-200 bg-cream-light">
        <div className="container-luxury py-16">
          {/* Tabs Navigation */}
          <div className="flex justify-center gap-2 sm:gap-3 mb-10 sm:mb-12 flex-wrap">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'details'
                  ? 'bg-deep-black text-cream-white scale-105'
                  : 'bg-white text-deep-black hover:bg-warm-gray-100 hover:scale-105'
              }`}
            >
              Détails
            </button>
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'ingredients'
                  ? 'bg-deep-black text-cream-white scale-105'
                  : 'bg-white text-deep-black hover:bg-warm-gray-100 hover:scale-105'
              }`}
            >
              Composition
            </button>
            <button
              onClick={() => setActiveTab('usage')}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'usage'
                  ? 'bg-deep-black text-cream-white scale-105'
                  : 'bg-white text-deep-black hover:bg-warm-gray-100 hover:scale-105'
              }`}
            >
              Utilisation
            </button>
          </div>

          {/* Tabs Content */}
          <div className="max-w-3xl mx-auto">
            {activeTab === 'details' && (
              <div className="space-y-6">
                <h3 className="font-display text-2xl">À propos de ce produit</h3>
                <p className="text-warm-500 leading-relaxed whitespace-pre-line">
                  {detailText}
                </p>
                <div className="space-y-3">
                  <p className="text-sm"><strong>Catégorie :</strong> {product.category}</p>
                  <p className="text-sm"><strong>Univers :</strong> {universeName}</p>
                  {product.gender && (
                    <p className="text-sm capitalize"><strong>Pour :</strong> {product.gender}</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="space-y-6">
                <h3 className="font-display text-2xl">Composition</h3>
                <p className="text-warm-500 leading-relaxed">
                  Nos produits sont formulés avec des ingrédients soigneusement sélectionnés 
                  pour leur qualité et leur efficacité.
                </p>
                {'ingredients' in product && product.ingredients?.length ? (
                  <ul className="grid sm:grid-cols-2 gap-3 text-sm text-warm-500">
                    {product.ingredients.map((ingredient) => <li key={ingredient}>✓ {ingredient}</li>)}
                  </ul>
                ) : product.volet === 'sweet-hair' && (
                  <ul className="space-y-2 text-sm text-warm-500">
                    <li>✓ Huiles végétales biologiques</li>
                    <li>✓ Beurre de karité naturel</li>
                    <li>✓ Extraits de plantes africaines</li>
                    <li>✓ Sans parabènes ni sulfates</li>
                  </ul>
                )}
                {product.volet === 'fragrance' && (
                  <p className="text-sm text-warm-500">
                    Eau de Parfum authentique. Notes de tête, cœur et fond composées 
                    par les plus grands parfumeurs.
                  </p>
                )}
                {product.volet === 'crochet-by-thed' && (
                  <ul className="space-y-2 text-sm text-warm-500">
                    <li>✓ Fil 100% coton ou acrylique premium</li>
                    <li>✓ Confection manuelle au crochet</li>
                    <li>✓ Finitions soignées</li>
                    <li>✓ Entretien facile</li>
                  </ul>
                )}
              </div>
            )}

            {activeTab === 'usage' && (
              <div className="space-y-6">
                <h3 className="font-display text-2xl">Mode d'emploi</h3>
                {'usage' in product && product.usage ? (
                  <p className="text-sm text-warm-500 leading-relaxed whitespace-pre-line">{product.usage}</p>
                ) : product.volet === 'sweet-hair' && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Application</h4>
                      <p className="text-sm text-warm-500 leading-relaxed">
                        Appliquez une petite quantité sur cheveux secs ou humides. 
                        Massez le cuir chevelu pour stimuler la circulation.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Fréquence</h4>
                      <p className="text-sm text-warm-500 leading-relaxed">
                        Utilisez 2 à 3 fois par semaine pour des résultats optimaux.
                      </p>
                    </div>
                  </div>
                )}
                {product.volet === 'fragrance' && (
                  <div className="space-y-4">
                    <p className="text-sm text-warm-500 leading-relaxed">
                      Vaporisez sur les points de pulsation : poignets, cou, derrière les oreilles. 
                      La chaleur naturelle de ces zones diffusera la fragrance tout au long de la journée.
                    </p>
                    <p className="text-sm text-warm-500 leading-relaxed">
                      <strong>Astuce :</strong> Ne frottez pas vos poignets l'un contre l'autre, 
                      cela altère les notes de tête du parfum.
                    </p>
                  </div>
                )}
                {product.volet === 'crochet-by-thed' && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Entretien</h4>
                      <p className="text-sm text-warm-500 leading-relaxed">
                        Lavage à la main à l'eau tiède recommandé. 
                        Séchage à plat pour préserver la forme.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Conservation</h4>
                      <p className="text-sm text-warm-500 leading-relaxed">
                        Ranger à plat ou suspendu. Éviter l'exposition prolongée au soleil direct.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Produits Similaires */}
      {similarProducts.length > 0 && (
        <section className="py-20 lg:py-32 bg-cream-white">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl md:text-5xl mb-4">
                Vous aimerez aussi
              </h2>
              <p className="text-lg text-warm-500">
                D'autres créations de la collection {universeName}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {similarProducts.map((similar) => (
                <ProductCard key={similar.id} product={similar} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
