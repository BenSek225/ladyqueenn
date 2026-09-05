/**
 * Utilitaires pour génération de messages WhatsApp
 */

import type { CheckoutFormData } from './validation'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export function generateOrderMessage(
  items: CartItem[],
  deliveryFee: number,
  formData: CheckoutFormData
): string {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal + deliveryFee
  
  const itemsList = items
    .map(
      (item) =>
        `- ${item.name} x${item.quantity} : ${(item.price * item.quantity).toLocaleString('fr-FR')} FCFA`
    )
    .join('\n')
  
  const locationDetails = formData.commune
    ? `${formData.commune}, ${formData.city}`
    : formData.city
  
  const message = `Bonjour Lady Queenn ! Je souhaite confirmer ma commande.

📦 *COMMANDE*
${itemsList}

👤 *CLIENT*
Nom : ${formData.name}
Téléphone : ${formData.phone}

📍 *LIVRAISON*
Ville : ${locationDetails}
Quartier : ${formData.quarter}
${formData.address ? `Adresse : ${formData.address}` : ''}

💰 *MONTANT*
Sous-total : ${subtotal.toLocaleString('fr-FR')} FCFA
Livraison : ${deliveryFee.toLocaleString('fr-FR')} FCFA
*TOTAL : ${total.toLocaleString('fr-FR')} FCFA*`

  return message
}

export function generateWhatsAppLink(message: string): string {
  const phoneNumber = '2250710504007'
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
}
