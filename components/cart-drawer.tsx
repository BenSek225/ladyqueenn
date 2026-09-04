'use client'

import { useEffect } from 'react'
import { Minus, Plus, Trash2, X, ShoppingBag, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useCart } from '@/lib/store'
import { getUniverseName } from '@/lib/data/all-products'

interface CartDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, getTotalPrice, formatCartMessage } = useCart()

  // Empêcher le scroll du body quand le drawer est ouvert
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

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

  if (!open) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 z-50 bg-deep-black/60 backdrop-blur-sm animate-fade-in"
        onClick={() => onOpenChange(false)}
      />

      {/* Drawer */}
      <aside className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-cream-white shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-warm-gray-200">
          <div>
            <p className="eyebrow-label mb-1">Votre sélection</p>
            <h2 className="font-display text-2xl">
              Panier ({totalItems})
            </h2>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="p-2 hover:bg-warm-gray-100 rounded-md transition-colors"
            aria-label="Fermer le panier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-16 h-16 rounded-full bg-warm-gray-100 flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-warm-gray-400" />
              </div>
              <p className="text-warm-500 mb-2">Votre panier est vide</p>
              <p className="text-sm text-warm-gray-400">Ajoutez des produits pour commencer</p>
            </div>
          ) : (
            <div className="space-y-8">
              {volets.map((volet) => (
                <div key={volet}>
                  {/* Titre volet */}
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-warm-500 mb-4">
                    {volet === 'sweet-hair' && 'Sweet-Hair'}
                    {volet === 'fragrance' && 'Fragrance'}
                    {volet === 'crochet-by-thed' && 'Crochet by THED'}
                    {volet === 'other' && 'Autres'}
                  </h3>

                  {/* Items du volet */}
                  <div className="space-y-4">
                    {itemsByVolet[volet].map((item) => (
                      <div key={item.id} className="flex gap-4 bg-white p-4 rounded-soft">
                        {/* Image */}
                        <div className="relative w-20 h-24 rounded overflow-hidden bg-warm-gray-100 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 flex flex-col justify-between">
                          {/* Nom + Supprimer */}
                          <div className="flex justify-between gap-3">
                            <p className="text-sm font-medium text-deep-black line-clamp-2">
                              {item.name}
                            </p>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-warm-gray-400 hover:text-deep-black transition-colors"
                              aria-label={`Supprimer ${item.name}`}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          {/* Prix + Quantité */}
                          <div className="flex items-center justify-between mt-2">
                            {/* Contrôles quantité */}
                            <div className="flex items-center border border-warm-gray-200 rounded">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1.5 hover:bg-warm-gray-100 transition-colors"
                                aria-label="Diminuer la quantité"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={14} />
                              </button>
                              <span className="px-3 text-sm font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1.5 hover:bg-warm-gray-100 transition-colors"
                                aria-label="Augmenter la quantité"
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            {/* Prix unitaire */}
                            <span className="text-sm font-mono font-bold text-champagne-gold">
                              {(item.price * item.quantity).toLocaleString('fr-FR')} FCFA
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer avec Total et CTA */}
        {items.length > 0 && (
          <div className="border-t border-warm-gray-200 px-6 py-6 bg-cream-light">
            {/* Total */}
            <div className="flex justify-between items-baseline mb-6">
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

            <p className="text-xs text-center text-warm-500 mt-4">
              Vous serez redirigé vers WhatsApp pour finaliser votre commande
            </p>
          </div>
        )}
      </aside>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </>
  )
}
