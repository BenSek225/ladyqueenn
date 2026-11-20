'use client'

import { useEffect, useState } from 'react'

/** Vrai une fois le composant monté côté navigateur (évite les écarts d'hydratation avec le panier). */
export function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}
