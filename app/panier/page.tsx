'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ArrowRight, ArrowLeft, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/store'
import { getUniverseName } from '@/lib/data/all-products'
import { EmptyState } from '@/components/shared/empty-state'

export default function PanierPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, formatCartMessage, clearCart } = useCart()

  // Grouper les items par volet
  const itemsByVolet = items.reduce((acc, item) => {
    const volet = item.volet || 'other'
    if (!acc[volet]) {
      acc[volet] = []
    }
    acc[volet].push(item)
    return acc
  }, {} as Record<string, typeof items>)

  const volets = Object.keys(itemsByVolet).sort()
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <main className="min-h-screen bg-cream-white py-8 sm:py-12">
      <div className="container-luxury px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-warm-500 hover:text-champagne-gold transition-colors mb-4 sm:mb-6 min-h-[44px]"
          >
            <ArrowLeft size={16} />
            Continuer mes achats
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl mb-2">Votre panier</h1>
              <p className="text-base sm:text-lg text-warm-500">
                {totalItems} {totalItems > 1 ? 'articles' : 'article'}
              </p>
            </div>

            {items.length > 0 && (
              <button
                onClick={() => {
                  if (confirm('Êtes-vous sûr de vouloir vider le panier ?')) {
                    clearCart()
                  }
                }}
                className="text-sm text-warm-500 hover:text-deep-black transition-colors min-h-[44px] self-start md:self-auto"
              >
                Vider le panier
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          // Panier vide
          <EmptyState
            icon={ShoppingBag}
            title="Votre panier est vide"
            description="Découvrez nos collections de soins naturels, parfums de luxe et créations artisanales. Commencez votre shopping dès maintenant !"
            action={{
              label: 'Découvrir nos univers',
              href: '/',
            }}
            secondaryAction={{
              label: 'Voir les nouveautés',
              href: '/#nouveautes',
            }}
          />
        ) : (
          // Panier avec items
          <div className="grid lg:grid-cols-[1fr_400px] gap-6 sm:gap-8 lg:gap-12">
            {/* Liste des produits */}
            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
              {volets.map((volet) => (
                <div key={volet} className="bg-white rounded-soft p-4 sm:p-6 md:p-8">
                  {/* Titre volet */}
                  <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-warm-500 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-warm-200">
                    {volet === 'sweet-hair' && 'Sweet-Hair'}
                    {volet === 'fragrance' && 'Fragrance'}
                    {volet === 'crochet-by-thed' && 'Crochet by THED'}
                    {volet === 'other' && 'Autres produits'}
                  </h2>

                  {/* Items du volet */}
                  <div className="space-y-4 sm:space-y-6">
                    {itemsByVolet[volet].map((item) => (
                      <div key={item.id} className="flex gap-3 sm:gap-4 md:gap-6 pb-4 sm:pb-6 border-b border-warm-100 last:border-0 last:pb-0">
                        {/* Image */}
                        <div className="relative w-20 h-28 sm:w-24 sm:h-32 rounded overflow-hidden bg-warm-100 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          {/* Nom produit */}
                          <div>
                            <h3 className="font-medium text-base sm:text-lg text-deep-black mb-1 line-clamp-2">
                              {item.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-warm-500">
                              Prix unitaire : {item.price.toLocaleString('fr-FR')} FCFA
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-3 sm:mt-4 gap-3 sm:gap-4">
                            {/* Contrôles quantité */}
                            <div className="flex items-center border border-warm-200 rounded">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2.5 sm:p-2 hover:bg-warm-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                                aria-label="Diminuer la quantité"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={16} />
                              </button>
                              <span className="px-3 sm:px-4 text-sm sm:text-base font-medium min-w-[3rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2.5 sm:p-2 hover:bg-warm-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                                aria-label="Augmenter la quantité"
                              >
                                <Plus size={16} />
                              </button>
                            </div>

                            {/* Prix total + Supprimer */}
                            <div className="flex items-center gap-3 sm:gap-6 w-full sm:w-auto justify-between sm:justify-start">
                              <span className="font-mono text-base sm:text-lg font-bold text-champagne-gold whitespace-nowrap">
                                {(item.price * item.quantity).toLocaleString('fr-FR')} FCFA
                              </span>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="p-2 text-warm-400 hover:text-deep-black hover:bg-warm-100 rounded transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                                aria-label={`Supprimer ${item.name}`}
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar Récapitulatif */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-cream-light rounded-soft p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
                <h2 className="font-display text-xl sm:text-2xl mb-4 sm:mb-6">Récapitulatif</h2>

                {/* Détail par volet */}
                <div className="space-y-2 sm:space-y-3 pb-4 sm:pb-6 border-b border-warm-200">
                  {volets.map((volet) => {
                    const voletTotal = itemsByVolet[volet].reduce(
                      (sum, item) => sum + item.price * item.quantity,
                      0
                    )
                    const voletCount = itemsByVolet[volet].reduce(
                      (sum, item) => sum + item.quantity,
                      0
                    )
                    return (
                      <div key={volet} className="flex justify-between text-xs sm:text-sm">
                        <span className="text-warm-500">
                          {volet === 'sweet-hair' && 'Sweet-Hair'}
                          {volet === 'fragrance' && 'Fragrance'}
                          {volet === 'crochet-by-thed' && 'Crochet'}
                          {volet === 'other' && 'Autres'} ({voletCount})
                        </span>
                        <span className="font-medium whitespace-nowrap ml-3">
                          {voletTotal.toLocaleString('fr-FR')} FCFA
                        </span>
                      </div>
                    )
                  })}
                </div>

                {/* Total */}
                <div className="flex justify-between items-baseline py-3 sm:py-4 border-b border-warm-300">
                  <span className="text-xs sm:text-sm uppercase tracking-wider text-warm-500">Total</span>
                  <span className="font-display text-2xl sm:text-3xl font-bold text-deep-black">
                    {getTotalPrice().toLocaleString('fr-FR')} <span className="text-lg sm:text-xl">FCFA</span>
                  </span>
                </div>

                {/* CTA WhatsApp */}
                <a
                  href={`https://wa.me/2250710504007?text=${formatCartMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 sm:gap-3 bg-deep-black text-cream-white px-6 sm:px-8 py-4 rounded-soft font-medium hover:bg-champagne-gold hover:text-deep-black transition-all duration-normal text-sm sm:text-base min-h-[56px]"
                >
                  Commander via WhatsApp
                  <ArrowRight size={20} />
                </a>

                <p className="text-xs text-center text-warm-500 px-2">
                  Vous serez redirigé vers WhatsApp pour finaliser votre commande avec notre équipe
                </p>

                {/* Infos supplémentaires */}
                <div className="pt-3 sm:pt-4 space-y-2 text-xs text-warm-500">
                  <p>✓ Livraison à Abidjan</p>
                  <p>✓ Paiement à la livraison</p>
                  <p>✓ Support client disponible</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
