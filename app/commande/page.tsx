'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react'
import { useCart } from '@/lib/store'
import { useDelivery } from '@/lib/hooks/use-delivery'
import { validateCheckoutForm } from '@/lib/utils/validation'
import { generateOrderMessage, generateWhatsAppLink } from '@/lib/utils/whatsapp'
import { ABIDJAN_ZONES, DELIVERY_CITIES } from '@/lib/data/delivery-zones'
import type { CheckoutFormData } from '@/lib/utils/validation'

export default function CommandePage() {
  const items = useCart((state) => state.items)
  const subtotal = useCart((state) => state.getTotalPrice())
  const delivery = useDelivery()
  
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    phone: '',
    city: '',
    commune: '',
    quarter: '',
    address: '',
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  
  const total = subtotal + delivery.fee

  // Gestion des changements
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value
    setFormData((prev) => ({ ...prev, city, commune: '' }))
    delivery.setCity(city)
    delivery.setCommune('')
    if (errors.city) {
      setErrors((prev) => ({ ...prev, city: '' }))
    }
  }

  const handleCommuneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const commune = e.target.value
    setFormData((prev) => ({ ...prev, commune }))
    delivery.setCommune(commune)
    if (errors.commune) {
      setErrors((prev) => ({ ...prev, commune: '' }))
    }
  }

  // Soumission
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    // Validation
    const validation = validateCheckoutForm(formData)
    if (!validation.valid) {
      const newErrors: Record<string, string> = {}
      Object.entries(validation.errors).forEach(([key, result]) => {
        if (!result.valid && result.error) {
          newErrors[key] = result.error
        }
      })
      setErrors(newErrors)
      return
    }
    
    // Vérifier panier
    if (items.length === 0) {
      setErrors({ general: 'Votre panier est vide.' })
      return
    }
    
    // Vérifier commune Abidjan
    if (delivery.isAbidjan && !formData.commune) {
      setErrors({ commune: 'Veuillez sélectionner votre commune' })
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const message = generateOrderMessage(items, delivery.fee, formData)
      const whatsappUrl = generateWhatsAppLink(message)
      
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
      setSubmitted(true)
    } catch (error) {
      console.error('Erreur:', error)
      setErrors({ general: 'Une erreur est survenue. Veuillez réessayer.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Panier vide
  if (items.length === 0) {
    return (
      <main className="min-h-[70vh] bg-cream-light px-4 py-20">
        <div className="container-luxury max-w-xl text-center">
          <p className="eyebrow-label text-champagne-gold mb-4">Votre commande</p>
          <h1 className="font-display text-4xl mb-4">Votre panier est vide</h1>
          <p className="text-warm-500 mb-8">Ajoutez un produit avant de passer commande.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-deep-black text-cream-white px-6 py-3 rounded-lg font-medium hover:bg-champagne-gold hover:text-deep-black transition-all duration-300">
            Découvrir la sélection <ArrowRight size={18} />
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-cream-light py-8 sm:py-12 lg:py-20">
      <div className="container-luxury max-w-6xl">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-warm-500 hover:text-deep-black transition-colors duration-300 mb-8 sm:mb-10 py-2"
        >
          <ArrowLeft size={16} /> Continuer mes achats
        </Link>
        
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start">
          {/* Formulaire */}
          <section>
            <p className="eyebrow-label text-champagne-gold mb-4">Finaliser votre sélection</p>
            <h1 className="font-display text-4xl md:text-5xl mb-4">Passer la commande</h1>
            <p className="text-warm-500 leading-relaxed mb-8">
              Renseignez vos coordonnées. Nous confirmerons ensuite votre commande et sa livraison sur WhatsApp.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6 bg-cream-white p-5 sm:p-6 lg:p-8 rounded-lg border border-warm-200">
              {/* Informations client */}
              <div className="space-y-5">
                <h2 className="font-display text-2xl">Vos informations</h2>
                
                <label className="block">
                  <span className="text-sm font-medium text-deep-black mb-2 block">Nom complet *</span>
                  <input 
                    required 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-warm-200 bg-white px-4 py-3 outline-none focus:border-champagne-gold focus:ring-2 focus:ring-champagne-gold/20 transition-all duration-300" 
                    placeholder="Votre nom" 
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </label>
                
                <label className="block">
                  <span className="text-sm font-medium text-deep-black mb-2 block">Téléphone *</span>
                  <input 
                    required 
                    name="phone" 
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-warm-200 bg-white px-4 py-3 outline-none focus:border-champagne-gold focus:ring-2 focus:ring-champagne-gold/20 transition-all duration-300" 
                    placeholder="07 10 50 40 07" 
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </label>
              </div>
              
              {/* Livraison */}
              <div className="space-y-5">
                <h2 className="font-display text-2xl">Livraison</h2>
                
                {/* Ville */}
                <label className="block">
                  <span className="text-sm font-medium text-deep-black mb-2 block">Ville *</span>
                  <select 
                    value={formData.city}
                    onChange={handleCityChange}
                    required
                    className="w-full rounded-lg border border-warm-200 bg-white px-4 py-3 outline-none focus:border-champagne-gold focus:ring-2 focus:ring-champagne-gold/20 transition-all duration-300"
                  >
                    <option value="">Sélectionner une ville</option>
                    {DELIVERY_CITIES.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                </label>
                
                {/* Commune (Abidjan uniquement) */}
                {delivery.isAbidjan && (
                  <label className="block">
                    <span className="text-sm font-medium text-deep-black mb-2 block">Commune *</span>
                    <select 
                      value={formData.commune}
                      onChange={handleCommuneChange}
                      required
                      className="w-full rounded-lg border border-warm-200 bg-white px-4 py-3 outline-none focus:border-champagne-gold focus:ring-2 focus:ring-champagne-gold/20 transition-all duration-300"
                    >
                      <option value="">Sélectionner une commune</option>
                      {ABIDJAN_ZONES.flatMap((zone) =>
                        zone.communes.map((commune) => (
                          <option key={commune} value={commune}>
                            {commune} ({zone.price.toLocaleString('fr-FR')} FCFA)
                          </option>
                        ))
                      )}
                    </select>
                    <p className="mt-1 text-xs text-warm-500">Le tarif de livraison sera calculé automatiquement</p>
                    {errors.commune && <p className="mt-1 text-sm text-red-600">{errors.commune}</p>}
                  </label>
                )}
                
                {/* Frais de livraison */}
                {delivery.fee > 0 && (
                  <div className="rounded-lg border border-champagne-gold/30 bg-champagne-gold/5 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Frais de livraison</span>
                      <span className="text-lg font-bold text-champagne-gold">
                        {delivery.fee.toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-warm-500">
                      {delivery.isAbidjan && formData.commune
                        ? `Zone : ${formData.commune}, Abidjan`
                        : `Livraison vers ${formData.city || 'votre ville'}`}
                    </p>
                  </div>
                )}
                
                <label className="block">
                  <span className="text-sm font-medium text-deep-black mb-2 block">Quartier *</span>
                  <input 
                    required 
                    name="quarter"
                    value={formData.quarter}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-warm-200 bg-white px-4 py-3 outline-none focus:border-champagne-gold focus:ring-2 focus:ring-champagne-gold/20 transition-all duration-300" 
                    placeholder="Angré, Cocody" 
                  />
                  {errors.quarter && <p className="mt-1 text-sm text-red-600">{errors.quarter}</p>}
                </label>
                
                <label className="block">
                  <span className="text-sm font-medium text-deep-black mb-2 block">Adresse / précisions</span>
                  <textarea 
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full rounded-lg border border-warm-200 bg-white px-4 py-3 outline-none focus:border-champagne-gold focus:ring-2 focus:ring-champagne-gold/20 transition-all duration-300" 
                    placeholder="Près de la pharmacie centrale..." 
                  />
                  <p className="mt-1 text-xs text-warm-500">Détails pour faciliter la livraison</p>
                </label>
              </div>
              
              {/* Erreur générale */}
              {errors.general && (
                <div className="rounded-lg border border-red-600 bg-red-50 p-4">
                  <p className="text-sm text-red-600">{errors.general}</p>
                </div>
              )}
              
              {/* Bouton */}
              <button 
                type="submit" 
                disabled={isSubmitting || items.length === 0}
                className="w-full flex items-center justify-center gap-2 sm:gap-3 bg-deep-black text-cream-white px-6 py-3 sm:py-4 rounded-lg font-medium hover:bg-champagne-gold hover:text-deep-black hover:-translate-y-1 transition-all duration-300 min-h-[56px] bouncy-hover glow-on-hover group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  'Préparation...'
                ) : (
                  <>
                    <MessageCircle size={19} className="transition-transform group-hover:scale-110" />
                    {submitted ? 'Commande envoyée ✓' : 'Confirmer et commander sur WhatsApp'}
                    {!submitted && <ArrowRight size={16} />}
                  </>
                )}
              </button>
              
              <p className="text-center text-xs text-warm-500">
                En continuant, vous serez redirigé vers WhatsApp pour finaliser votre commande.
              </p>
            </form>
          </section>
          
          {/* Récapitulatif */}
          <aside className="lg:sticky lg:top-28 bg-cream-white border border-warm-200 rounded-lg p-5 sm:p-6 lg:p-8">
            <p className="eyebrow-label text-warm-500 mb-5">Récapitulatif</p>
            
            <div className="space-y-3 pb-6 border-b border-warm-200">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between gap-4 text-sm">
                  <span className="flex-1">
                    {item.name} 
                    <span className="text-warm-400 ml-1">× {item.quantity}</span>
                  </span>
                  <span className="font-mono font-semibold whitespace-nowrap text-champagne-gold">
                    {(item.price * item.quantity).toLocaleString('fr-FR')} F
                  </span>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 py-6 text-sm border-b border-warm-200">
              <div className="flex justify-between">
                <span className="text-warm-500">Sous-total</span>
                <span className="font-mono">{subtotal.toLocaleString('fr-FR')} FCFA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-warm-500">Livraison</span>
                <span className="font-mono">{delivery.fee.toLocaleString('fr-FR')} FCFA</span>
              </div>
            </div>
            
            <div className="flex justify-between items-baseline pt-5">
              <span className="font-medium text-deep-black">Total</span>
              <strong className="font-display text-2xl sm:text-3xl text-deep-black">
                {total.toLocaleString('fr-FR')} 
                <small className="font-sans text-sm text-warm-500 ml-1">FCFA</small>
              </strong>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
