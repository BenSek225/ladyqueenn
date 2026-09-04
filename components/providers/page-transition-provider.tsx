'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    // Déclencher la transition
    setIsTransitioning(true)
    
    // Retirer la classe après l'animation
    const timeout = setTimeout(() => {
      setIsTransitioning(false)
    }, 300)

    return () => clearTimeout(timeout)
  }, [pathname])

  return (
    <div className={`page-transition ${isTransitioning ? 'is-transitioning' : ''}`}>
      {children}
    </div>
  )
}
