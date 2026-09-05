'use client'

import { useEffect } from 'react'

export function RevealProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement
          
          // Ajouter délai staggered pour les éléments dans la même section
          const delay = index * 150
          
          setTimeout(() => {
            element.style.animationDelay = '0ms'
            element.style.animationFillMode = 'forwards'
            
            if (element.classList.contains('reveal-fade-up')) {
              element.style.animation = 'revealFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            } else if (element.classList.contains('reveal-fade-left')) {
              element.style.animation = 'revealFadeLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            } else if (element.classList.contains('reveal-fade-right')) {
              element.style.animation = 'revealFadeRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }
          }, delay)
        }
      })
    }, observerOptions)

    // Observer tous les éléments avec classes reveal
    const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-fade-left, .reveal-fade-right')
    revealElements.forEach(el => revealObserver.observe(el))

    return () => revealObserver.disconnect()
  }, [])

  return <>{children}</>
}