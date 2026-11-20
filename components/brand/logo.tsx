import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Volet } from '@/lib/types'

type LogoTone = 'dark' | 'light' | 'gold'

/** Logo officiel Lady Queen (script + couronne dorée), décliné en 3 couleurs. */
export function LadyQueenLogo({
  tone = 'dark',
  className,
  priority = false,
}: {
  tone?: LogoTone
  className?: string
  priority?: boolean
}) {
  return (
    <Image
      src={`/images/brand/logo-lady-queen-${tone}.png`}
      alt="Lady Queen"
      width={1476}
      height={471}
      priority={priority}
      className={cn('h-auto w-36 select-none', className)}
    />
  )
}

/** Signature « Lady Queen vous présente » utilisée au-dessus des marques. */
export function PresentedBy({ tone = 'dark', className }: { tone?: LogoTone; className?: string }) {
  return (
    <div className={cn('inline-flex flex-col items-center gap-1.5', className)}>
      <LadyQueenLogo tone={tone} className="w-28 sm:w-32" />
      <span
        className={cn(
          'flex items-center gap-3 text-[0.625rem] font-medium uppercase tracking-[0.32em]',
          tone === 'light' ? 'text-cream-white/80' : 'text-warm-600',
        )}
      >
        <span className="h-px w-6 bg-current opacity-50" />
        vous présente
        <span className="h-px w-6 bg-current opacity-50" />
      </span>
    </div>
  )
}

/**
 * Nom de marque typographique. Sweet-Hair a un logo graphique ;
 * Fragrance et Crochet by THED sont portées par leur nom.
 */
export function BrandWordmark({
  brand,
  tone = 'dark',
  size = 'md',
  className,
}: {
  brand: Volet
  tone?: 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}) {
  const light = tone === 'light'
  const scale = {
    sm: 'text-3xl',
    md: 'text-5xl',
    lg: 'text-6xl sm:text-7xl',
    xl: 'text-6xl sm:text-8xl lg:text-9xl',
  }[size]

  if (brand === 'crochet-by-thed') {
    return (
      <span className={cn('inline-flex flex-col items-start leading-none', scale, className)}>
        <span className="flex items-end">
          <span className={cn('font-script', light ? 'text-cr-light' : 'text-cr-earth')} style={{ fontSize: '1em' }}>
            Crochet
          </span>
          <span
            className={cn('font-script -ml-1 mb-[-0.15em]', light ? 'text-cream-white/80' : 'text-cr-earth')}
            style={{ fontSize: '0.5em' }}
          >
            by
          </span>
        </span>
        <span
          className={cn('font-display font-bold tracking-tight', light ? 'text-cream-white' : 'text-deep-black')}
          style={{ fontSize: '0.92em', marginTop: '-0.12em', marginLeft: '0.18em' }}
        >
          THED
        </span>
      </span>
    )
  }

  if (brand === 'fragrance') {
    return (
      <span
        className={cn(
          'inline-block font-brand uppercase leading-none tracking-[0.14em]',
          light ? 'text-cream-white' : 'text-fr-night',
          scale,
          className,
        )}
        data-brand="fragrance"
      >
        Fragrance
      </span>
    )
  }

  return (
    <span
      className={cn(
        'inline-block font-brand leading-none tracking-tight',
        light ? 'text-cream-white' : 'text-sh-deep',
        scale,
        className,
      )}
      data-brand="sweet-hair"
    >
      Sweet-Hair
    </span>
  )
}

export function SweetHairLogo({ tone = 'dark', className }: { tone?: 'dark' | 'light'; className?: string }) {
  return (
    <Image
      src={`/images/brand/logo-sweet-hair-${tone}.png`}
      alt="Sweet-Hair"
      width={272}
      height={346}
      className={cn('h-auto w-24 select-none', className)}
    />
  )
}
