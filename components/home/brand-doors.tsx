'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { brands } from '@/lib/brands'
import { cn } from '@/lib/utils'
import { BrandWordmark, SweetHairLogo } from '@/components/brand/logo'

const EASE = [0.16, 1, 0.3, 1] as const

const overlay: Record<string, string> = {
  'sweet-hair': 'from-sh-deep/90 via-sh-deep/30',
  fragrance: 'from-fr-night/95 via-fr-night/40',
  'crochet-by-thed': 'from-cr-deep/90 via-cr-deep/30',
}

/** Les trois marques présentées comme des portes qui s'ouvrent au survol. */
export function BrandDoors() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-3 lg:h-[82vh] lg:min-h-[620px] lg:flex-row" onMouseLeave={() => setActive(null)}>
      {brands.map((brand, i) => {
        const isActive = active === i
        return (
          <motion.div
            key={brand.slug}
            className="relative h-[72vh] min-h-[480px] overflow-hidden rounded-soft lg:h-auto lg:min-h-0"
            style={{ flexBasis: 0 }}
            animate={{ flexGrow: active === null ? 1 : isActive ? 1.9 : 0.75 }}
            transition={{ duration: 0.9, ease: EASE }}
            onMouseEnter={() => setActive(i)}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
          >
            <Link href={brand.href} className="group block h-full" aria-label={`Découvrir ${brand.name}`}>
              <Image
                src={brand.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={cn(
                  'object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
                  isActive ? 'scale-105' : 'scale-100',
                )}
              />
              <div className={cn('absolute inset-0 bg-gradient-to-t to-transparent', overlay[brand.slug])} />

              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-6 text-cream-white lg:p-8">
                <span className="font-mono text-xs tracking-[0.2em] text-cream-white/70">0{i + 1}</span>
                <span className="rounded-full border border-cream-white/30 px-3 py-1 text-[0.625rem] uppercase tracking-[0.2em] text-cream-white/85 backdrop-blur-sm">
                  {brand.category}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 text-cream-white lg:p-8">
                {brand.slug === 'sweet-hair' && <SweetHairLogo tone="light" className="mb-4 w-16 lg:w-20" />}
                <BrandWordmark
                  brand={brand.slug}
                  tone="light"
                  size="md"
                  className={brand.slug === 'fragrance' ? 'text-[2.1rem] sm:text-5xl' : 'text-[2.75rem] sm:text-5xl'}
                />

                <div
                  className={cn(
                    'grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
                    'grid-rows-[1fr] opacity-100',
                    active !== null && !isActive && 'lg:grid-rows-[0fr] lg:opacity-0',
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-cream-white/80">
                      {brand.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em]">
                      Entrer dans l’univers
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cream-white/40 transition-all duration-500 group-hover:border-champagne-gold group-hover:bg-champagne-gold group-hover:text-deep-black">
                        <ArrowRight size={15} />
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
