'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'

interface RevealSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  threshold?: number
  animation?: 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right' | 'scale-up'
}

export function RevealSection({
  children,
  className = '',
  delay = 0,
  threshold = 0.1,
  animation = 'fade-up',
}: RevealSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
          // Une fois visible, on arrête d'observer
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current)
          }
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [delay, threshold])

  const animationClasses = {
    'fade-up': 'reveal-fade-up',
    'fade-in': 'reveal-fade-in',
    'fade-left': 'reveal-fade-left',
    'fade-right': 'reveal-fade-right',
    'scale-up': 'reveal-scale-up',
  }

  return (
    <div
      ref={sectionRef}
      className={`reveal-section ${animationClasses[animation]} ${
        isVisible ? 'is-visible' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
