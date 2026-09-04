'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ArrowRight, ArrowLeft, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/store'
import { getUniverseName } from '@/lib/data/all-products'

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
    <main className="min-h-screen bg-cream-white py-12">
      <div className="container-luxury">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-sm text-warm-500 hover:text-champagne-gold transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Continuer mes achats
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="font-display text-4xl md:text-5xl mb-2">Votre panier</h1>
              <p className="text-lg text-warm-500">
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
                className="text-sm text-warm-500 hover:text-deep-black transition-colors"
              >
                Vider le panier
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          // Panier vide
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-warm-gray-100 flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 text-warm-gray-400" />
            </div>
            <h2 className="font-display text-2xl mb-3">Votre panier est vide</h2>
            <p className="text-warm-500 mb-8 max-w-md">
              Découvrez nos collections et ajoutez des produits à votre panier
            </p>
            <Link 
              href="/"
              className="btn-primary inline-flex items-center gap-3"
            >
              Découvrir nos univers
              <ArrowRight size={20} />
            </Link>
          </div>
        ) : (
          // Panier avec items
          <div className="grid lg:grid-cols-[1fr_400px] gap-12">
            {/* Liste des produits */}
            <div className="space-y-8">
              {volets.map((volet) => (
                <div key={volet} className="bg-white rounded-soft p-6 md:p-8">
                  {/* Titre volet */}
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-warm-500 mb-6 pb-4 border-b border-warm-gray-200">
                    {volet === 'sweet-hair' && 'Sweet-Hair'}
                    {volet === 'fragrance' && 'Fragrance'}
                    {volet === 'crochet-by-thed' && 'Crochet by THED'}
                    {volet === 'other' && 'Autres produits'}
                  </h2>

                  {/* Items du volet */}
                  <div className="space-y-6">
                    {itemsByVolet[volet].map((item) => (
                      <div key={item.id} className="flex gap-6 pb-6 border-b border-warm-gray-100 last:border-0 last:pb-0">
                        {/* Image */}
                        <div className="relative w-24 h-32 rounded overflow-hidden bg-warm-gray-100 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 flex flex-col justify-between">
                          {/* Nom produit */}
                          <div>
                            <h3 className="font-medium text-lg text-deep-black mb-1">
                              {item.name}
                            </h3>
                            <p className="text-sm text-warm-500">
                              Prix unitaire : {item.price.toLocaleString('fr-FR')} FCFA
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center justify-between mt-4">
                            {/* Contrôles quantité */}
                            <div className="flex items-center border border-warm-gray-200 rounded">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-warm-gray-100 transition-colors"
                                aria-label="Diminuer la quantité"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={16} />
                              </button>
                              <span className="px-4 text-base font-medium min-w-[3rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-warm-gray-100 transition-colors"
                                aria-label="Augmenter la quantité"
                              >
                                <Plus size={16} />
                              </button>
                            </div>

                            {/* Prix total + Supprimer */}
                            <div className="flex items-center gap-6">
                              <span className="font-mono text-lg font-bold text-champagne-gold">
                                {(item.price * item.quantity).toLocaleString('fr-FR')} FCFA
                              </span>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="p-2 text-warm-gray-400 hover:text-deep-black hover:bg-warm-gray-100 rounded transition-colors"
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
              <div className="bg-cream-light rounded-soft p-6 md:p-8 space-y-6">
                <h2 className="font-display text-2xl mb-6">Récapitulatif</h2>

                {/* Détail par volet */}
                <div className="space-y-3 pb-6 border-b border-warm-gray-200">
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
                      <div key={volet} className="flex justify-between text-sm">
                        <span className="text-warm-500">
                          {volet === 'sweet-hair' && 'Sweet-Hair'}
                          {volet === 'fragrance' && 'Fragrance'}
                          {volet === 'crochet-by-thed' && 'Crochet'}
                          {volet === 'other' && 'Autres'} ({voletCount})
                        </span>
                        <span className="font-medium">
                          {voletTotal.toLocaleString('fr-FR')} FCFA
                        </span>
                      </div>
                    )
                  })}
                </div>

                {/* Total */}
                <div className="flex justify-between items-baseline py-4 border-b border-warm-gray-300">
                  <span className="text-sm uppercase tracking-wider text-warm-500">Total</span>
                  <span className="font-display text-3xl font-bold text-deep-black">
                    {getTotalPrice().toLocaleString('fr-FR')} <span className="text-xl">FCFA</span>
                  </span>
                </div>

                {/* CTA WhatsApp */}
                <a
                  href={`https://wa.me/2250710504007?text=${formatCartMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-deep-black text-cream-white px-8 py-4 rounded-soft font-medium hover:bg-champagne-gold hover:text-deep-black transition-all duration-normal"
                >
                  Commander via WhatsApp
                  <ArrowRight size={20} />
                </a>

                <p className="text-xs text-center text-warm-500">
                  Vous serez redirigé vers WhatsApp pour finaliser votre commande avec notre équipe
                </p>

                {/* Infos supplémentaires */}
                <div className="pt-4 space-y-2 text-xs text-warm-500">
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
