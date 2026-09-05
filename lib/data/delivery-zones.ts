/**
 * Zones et tarifs de livraison pour Côte d'Ivoire
 */

export interface DeliveryZone {
  name: string
  communes: string[]
  price: number
}

export interface DeliveryCity {
  name: string
  isAbidjan: boolean
  price?: number
}

// Zones de livraison Abidjan
export const ABIDJAN_ZONES: DeliveryZone[] = [
  {
    name: 'Zone 1',
    communes: ['Cocody', 'Plateau', 'Marcory', 'Treichville'],
    price: 2000,
  },
  {
    name: 'Zone 2',
    communes: ['Yopougon', 'Abobo', 'Adjamé', 'Attécoubé'],
    price: 1500,
  },
  {
    name: 'Zone 3',
    communes: ['Anyama', 'Bingerville', 'Songon', 'Port-Bouët'],
    price: 2500,
  },
]

// Villes de Côte d'Ivoire (hors Abidjan)
export const DELIVERY_CITIES: DeliveryCity[] = [
  { name: 'Abidjan', isAbidjan: true },
  { name: 'Yamoussoukro', isAbidjan: false, price: 3000 },
  { name: 'Bouaké', isAbidjan: false, price: 3000 },
  { name: 'Daloa', isAbidjan: false, price: 3000 },
  { name: 'Korhogo', isAbidjan: false, price: 3000 },
  { name: 'San-Pédro', isAbidjan: false, price: 3000 },
  { name: 'Man', isAbidjan: false, price: 3000 },
  { name: 'Gagnoa', isAbidjan: false, price: 3000 },
  { name: 'Divo', isAbidjan: false, price: 3000 },
  { name: 'Abengourou', isAbidjan: false, price: 3000 },
  { name: 'Grand-Bassam', isAbidjan: false, price: 3000 },
  { name: 'Autre ville', isAbidjan: false, price: 3000 },
]

// Fonction pour obtenir le tarif selon la commune
export function getDeliveryFee(city: string, commune?: string): number {
  const normalizedCity = city.toLowerCase().trim()
  
  if (normalizedCity === 'abidjan' && commune) {
    // Chercher la zone qui contient la commune
    const zone = ABIDJAN_ZONES.find((z) =>
      z.communes.some((c) => c.toLowerCase() === commune.toLowerCase())
    )
    return zone ? zone.price : 2500 // Par défaut zone 3
  }
  
  // Ville hors Abidjan
  const deliveryCity = DELIVERY_CITIES.find(
    (c) => c.name.toLowerCase() === normalizedCity
  )
  return deliveryCity?.price || 3000 // Par défaut "Autre ville"
}
