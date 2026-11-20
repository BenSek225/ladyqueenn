'use client'

import { motion, useReducedMotion } from 'motion/react'

/** Halos de lumière prune et rose qui flottent lentement derrière le hero Fragrance. */
export function FragranceGlow() {
  const reduce = useReducedMotion()
  const float = (x: number[], y: number[], duration: number) =>
    reduce ? {} : { animate: { x, y }, transition: { duration, repeat: Infinity, repeatType: 'mirror' as const, ease: 'easeInOut' as const } }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full bg-fr-plum/50 blur-[120px]"
        {...float([0, 120, -40], [0, 60, -30], 18)}
      />
      <motion.div
        className="absolute right-[-10rem] top-1/3 h-[28rem] w-[28rem] rounded-full bg-fr-rose/25 blur-[120px]"
        {...float([0, -90, 30], [0, -70, 40], 22)}
      />
      <motion.div
        className="absolute bottom-[-12rem] left-1/3 h-[26rem] w-[26rem] rounded-full bg-champagne-gold/15 blur-[120px]"
        {...float([0, 60, -80], [0, -40, 20], 26)}
      />
    </div>
  )
}
