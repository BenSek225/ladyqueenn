'use client'

import { useEffect, useState } from 'react'
import { Minus, Plus, Trash2, X, ShoppingBag, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/store'
import { getUniverseName } from '@/lib/data/all-products'
import { toast } from '@/components/shared/toast'

interface CartDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, getTotalPrice, formatCartMessage } = useCart()
  const [removingItemId, setRemovingItemId] = useState<string | null>(null)

  // Empêcher le scroll du body quand le drawer est ouvert
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleRemoveItem = (itemId: string, itemName: string) => {
    // Animation de sortie
    setRemovingItemId(itemId)
    
    // Attendre la fin de l'animation avant de supprimer
    setTimeout(() => {
      removeItem(itemId)
      setRemovingItemId(null)
      toast.info('Retiré du panier', `${itemName} a été retiré`)
    }, 300)
  }

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
      <aside className="fixed right-0 top-0 z-50 h-full w-full sm:max-w-md bg-cream-white shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-5 border-b border-warm-200">
          <div>
            <p className="eyebrow-label mb-1 text-xs sm:text-sm">Votre sélection</p>
            <h2 className="font-display text-xl sm:text-2xl">
              Panier ({totalItems})
            </h2>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="p-2 hover:bg-warm-100 rounded-md transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Fermer le panier"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto px-4 sm:px-6 py-4 sm:py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-16 h-16 rounded-full bg-warm-100 flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-warm-400" />
              </div>
              <p className="text-warm-500 mb-2">Votre panier est vide</p>
              <p className="text-sm text-warm-400">Ajoutez des produits pour commencer</p>
            </div>
          ) : (
            <div className="space-y-6 sm:space-y-8">
              {volets.map((volet) => (
                <div key={volet}>
                  {/* Titre volet */}
                  <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-warm-500 mb-3 sm:mb-4">
                    {volet === 'sweet-hair' && 'Sweet-Hair'}
                    {volet === 'fragrance' && 'Fragrance'}
                    {volet === 'crochet-by-thed' && 'Crochet by THED'}
                    {volet === 'other' && 'Autres'}
                  </h3>

                  {/* Items du volet */}
                  <div className="space-y-3 sm:space-y-4">
                    {itemsByVolet[volet].map((item) => (
                      <div 
                        key={item.id} 
                        className={`flex gap-3 sm:gap-4 bg-white p-3 sm:p-4 rounded-soft transition-all duration-300
                          ${removingItemId === item.id 
                            ? 'opacity-0 -translate-x-full' 
                            : 'opacity-100 translate-x-0 animate-slide-in-left'
                          }`}
                      >
                        {/* Image */}
                        <div className="relative w-20 h-24 sm:w-20 sm:h-24 rounded overflow-hidden bg-warm-100 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          {/* Nom + Supprimer */}
                          <div className="flex justify-between gap-2 sm:gap-3">
                            <p className="text-sm sm:text-sm font-medium text-deep-black line-clamp-2">
                              {item.name}
                            </p>
                            <button
                              onClick={() => handleRemoveItem(item.id, item.name)}
                              className="text-warm-400 hover:text-red-600 hover:scale-110 transition-all flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center -m-2"
                              aria-label={`Supprimer ${item.name}`}
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>

                          {/* Prix + Quantité */}
                          <div className="flex items-center justify-between mt-2 gap-3">
                            {/* Contrôles quantité */}
                            <div className="flex items-center border border-warm-200 rounded overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2.5 sm:p-2 hover:bg-warm-100 transition-all hover:scale-110 active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center"
                                aria-label="Diminuer la quantité"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={16} />
                              </button>
                              <span className="px-3 sm:px-3 text-sm font-medium min-w-[2.5rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2.5 sm:p-2 hover:bg-warm-100 transition-all hover:scale-110 active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center"
                                aria-label="Augmenter la quantité"
                              >
                                <Plus size={16} />
                              </button>
                            </div>

                            {/* Prix unitaire */}
                            <span className="text-xs sm:text-sm font-mono font-bold text-champagne-gold whitespace-nowrap">
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
          <div className="border-t border-warm-200 px-4 sm:px-6 py-4 sm:py-6 bg-cream-light">
            {/* Total */}
            <div className="flex justify-between items-baseline mb-4 sm:mb-6">
              <span className="text-xs sm:text-sm uppercase tracking-wider text-warm-500">Total</span>
              <span className="font-display text-2xl sm:text-3xl font-bold text-deep-black">
                {getTotalPrice().toLocaleString('fr-FR')} <span className="text-lg sm:text-xl">FCFA</span>
              </span>
            </div>

            <div className="grid gap-3">
              <Link
                href="/commande"
                onClick={() => onOpenChange(false)}
                className="w-full flex items-center justify-center gap-3 bg-champagne-gold text-deep-black px-6 sm:px-8 py-4 rounded-soft font-medium hover:bg-gold-dark hover:text-cream-white hover:-translate-y-1 transition-all duration-300 min-h-[56px] text-sm sm:text-base"
              >
                Passer la commande
                <ArrowRight size={20} />
              </Link>
              <a
                href={`https://wa.me/2250710504007?text=${formatCartMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 bg-deep-black text-cream-white px-6 sm:px-8 py-4 rounded-soft font-medium hover:bg-warm-700 hover:-translate-y-1 transition-all duration-300 min-h-[56px] text-sm sm:text-base"
              >
                Commander via WhatsApp
                <ArrowRight size={20} />
              </a>
            </div>

            <p className="text-xs text-center text-warm-500 mt-3 sm:mt-4 px-2">
              Choisissez la livraison avec le formulaire ou envoyez directement votre sélection sur WhatsApp.
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

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </>
  )
}
