'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { SplitLines } from '@/components/motion/reveal'
import { brands } from '@/lib/brands'

const EASE = [0.16, 1, 0.3, 1] as const

export function HomeHero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '18%'])
  const cardY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '-60%'])

  return (
    <section ref={ref} className="grain relative overflow-hidden bg-cream-white">
      <div className="container-luxury grid items-center gap-10 pb-16 pt-10 lg:min-h-[calc(100vh-8.25rem)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-20 lg:pt-6">
        {/* Texte */}
        <div className="relative z-10 order-2 lg:order-1">
          <motion.p
            className="eyebrow-label mb-6 flex items-center gap-3 text-gold-dark"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            <span className="h-px w-10 bg-champagne-gold" />
            Maison ivoirienne · Abidjan
          </motion.p>

          <SplitLines
            delay={0.3}
            className="font-display text-[3.25rem] leading-[0.95] tracking-tight sm:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]"
            lines={[
              'Embrace',
              <>
                your <em className="font-normal text-champagne-gold">Queen</em>
              </>,
              'energy.',
            ]}
          />

          <motion.p
            className="mt-8 max-w-md text-base leading-relaxed text-warm-600 sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
          >
            Soins capillaires naturels, parfums de grandes maisons et pièces crochetées à la main. Trois marques, une
            même exigence d’élégance.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
          >
            <Link href="#marques" className="btn-primary">
              Découvrir nos marques <ArrowRight size={16} />
            </Link>
            <Link href="#incontournables" className="link-underline text-xs font-medium uppercase tracking-[0.2em]">
              Les incontournables
            </Link>
          </motion.div>

          <motion.ul
            className="mt-14 hidden gap-8 border-t border-warm-200 pt-6 sm:flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            {brands.map((b, i) => (
              <li key={b.slug}>
                <Link href={b.href} className="group block">
                  <span className="font-mono text-[0.625rem] text-warm-400">0{i + 1}</span>
                  <span className="mt-1 block font-display text-lg transition-colors group-hover:text-champagne-gold">
                    {b.name}
                  </span>
                  <span className="text-xs text-warm-500">{b.category}</span>
                </Link>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Image en arche */}
        <div className="relative order-1 lg:order-2">
          <motion.div
            className="relative mx-auto aspect-[4/5] w-full max-w-[34rem] overflow-hidden rounded-t-[999px] rounded-b-soft bg-warm-200 lg:aspect-[4/5.4]"
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            animate={{ clipPath: 'inset(0% 0 0 0)' }}
            transition={{ duration: 1.4, delay: 0.1, ease: EASE }}
          >
            <motion.div className="absolute inset-0" style={{ y: imageY }}>
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.25 }}
                animate={{ scale: 1.05 }}
                transition={{ duration: 2.2, ease: EASE }}
              >
                <Image
                  src="/images/hero/home.png"
                  alt="Lady Queen — Embrace your Queen energy"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-[70%_center]"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Médaillon tournant */}
          <motion.div
            className="absolute -left-2 bottom-10 hidden h-32 w-32 items-center justify-center sm:flex lg:-left-12"
            style={{ y: cardY }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.1, ease: EASE }}
          >
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-[spin_22s_linear_infinite]">
              <defs>
                <path id="circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
              </defs>
              <text className="fill-deep-black text-[8px] uppercase">
                <textPath href="#circle" textLength="236" lengthAdjust="spacing">
                  Beauty · Roots · Ritual · Lady Queen ·
                </textPath>
              </text>
            </svg>
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-deep-black text-champagne-gold">
              <Crown />
            </span>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#marques"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.625rem] uppercase tracking-[0.3em] text-warm-500 lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        Défiler
        <ArrowDown size={14} className="animate-bounce" />
      </motion.a>
    </section>
  )
}

export function Crown({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 24" fill="currentColor" className={className} aria-hidden>
      <path d="M2 8.5 9 14l7-11 7 11 7-5.5-3 13.5H5L2 8.5Z" opacity="0.9" />
      <circle cx="2" cy="7.5" r="1.8" />
      <circle cx="16" cy="2.2" r="2" />
      <circle cx="30" cy="7.5" r="1.8" />
      <rect x="5" y="20" width="22" height="2.6" rx="1" />
    </svg>
  )
}
