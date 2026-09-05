/**
 * Validation pour le formulaire de commande
 */

export interface CheckoutFormData {
  name: string
  phone: string
  city: string
  commune?: string
  quarter: string
  address: string
}

interface ValidationResult {
  valid: boolean
  error?: string
}

export function validateCheckoutForm(data: CheckoutFormData) {
  const errors: Record<string, ValidationResult> = {}
  
  // Validation nom
  errors.name = data.name.trim().length >= 2
    ? { valid: true }
    : { valid: false, error: 'Le nom doit contenir au moins 2 caractères' }
  
  // Validation téléphone (format ivoirien)
  const phoneRegex = /^[\d\s\-\+\(\)]{8,15}$/
  errors.phone = phoneRegex.test(data.phone)
    ? { valid: true }
    : { valid: false, error: 'Numéro de téléphone invalide' }
  
  // Validation ville
  errors.city = data.city.trim().length > 0
    ? { valid: true }
    : { valid: false, error: 'Veuillez sélectionner une ville' }
  
  // Validation quartier
  errors.quarter = data.quarter.trim().length >= 2
    ? { valid: true }
    : { valid: false, error: 'Le quartier doit contenir au moins 2 caractères' }
  
  const allValid = Object.values(errors).every((result) => result.valid)
  
  return {
    valid: allValid,
    errors,
  }
}
