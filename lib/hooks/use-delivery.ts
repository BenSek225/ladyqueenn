import { useState, useMemo } from 'react'
import { getDeliveryFee } from '@/lib/data/delivery-zones'

export function useDelivery() {
  const [city, setCity] = useState('')
  const [commune, setCommune] = useState('')
  
  const isAbidjan = useMemo(
    () => city.toLowerCase().trim() === 'abidjan',
    [city]
  )
  
  const fee = useMemo(
    () => getDeliveryFee(city, commune),
    [city, commune]
  )
  
  return {
    city,
    commune,
    isAbidjan,
    fee,
    setCity,
    setCommune,
  }
}
