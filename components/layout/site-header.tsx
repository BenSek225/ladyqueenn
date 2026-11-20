'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { ArrowUpRight, Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useCart } from '@/lib/store'
import { brands } from '@/lib/brands'
import { siteConfig } from '@/lib/data/navigation'
import { cn } from '@/lib/utils'
import { LadyQueenLogo } from '@/components/brand/logo'
import { SearchBar } from '@/components/search/search-bar'
import { CurrencySwitcher } from '@/components/layout/currency-switcher'

const CartDrawer = dynamic(() => import('@/components/cart-drawer').then((m) => ({ default: m.CartDrawer })), {
  ssr: false,
  loading: () => null,
})

const EASE = [0.16, 1, 0.3, 1] as const

const dotColor: Record<string, string> = {
  'sweet-hair': 'bg-sh-sage',
  fragrance: 'bg-fr-plum',
  'crochet-by-thed': 'bg-cr-terracotta',
}

export function SiteHeader() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const count = useCart((s) => s.items.reduce((n, i) => n + i.quantity, 0))
  const { scrollY } = useScroll()

  useEffect(() => setMounted(true), [])

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > 240 && y > prev && !menuOpen)
  })

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const cartCount = mounted ? count : 0

  return (
    <>
      {/* Bandeau maison */}
      <div className="bg-deep-black text-cream-white/80">
        <div className="container-luxury flex h-9 items-center justify-center gap-6 text-[0.6875rem] uppercase tracking-[0.2em]">
          <span className="hidden sm:inline">Livraison en Côte d’Ivoire & à l’international</span>
          <span className="hidden h-3 w-px bg-cream-white/25 sm:inline-block" />
          <span>Commande simple via WhatsApp</span>
        </div>
      </div>

      <motion.header
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.5, ease: EASE }}
        className={cn(
          'sticky top-0 z-40 w-full transition-[background-color,box-shadow,border-color] duration-500',
          scrolled
            ? 'border-b border-warm-200/80 bg-cream-white/85 shadow-[0_8px_30px_-20px_rgba(26,23,20,0.35)] backdrop-blur-xl'
            : 'border-b border-transparent bg-cream-white',
        )}
      >
        <div className="container-luxury">
          <div
            className={cn(
              'grid grid-cols-[1fr_auto_1fr] items-center transition-[height] duration-500',
              scrolled ? 'h-16 lg:h-[4.5rem]' : 'h-[4.5rem] lg:h-24',
            )}
          >
            {/* Gauche : navigation / menu mobile */}
            <div className="flex items-center">
              <button
                onClick={() => setMenuOpen(true)}
                className="-ml-2 flex h-11 w-11 items-center justify-center lg:hidden"
                aria-label="Ouvrir le menu"
              >
                <Menu className="h-6 w-6" strokeWidth={1.5} />
              </button>
              <nav className="hidden items-center gap-9 lg:flex" aria-label="Nos marques">
                {brands.map((b) => {
                  const active = pathname.startsWith(b.href)
                  return (
                    <Link
                      key={b.slug}
                      href={b.href}
                      className="group relative flex items-center gap-2 py-2 text-[0.75rem] font-medium uppercase tracking-[0.2em]"
                    >
                      <span
                        className={cn(
                          'h-1.5 w-1.5 rounded-full transition-transform duration-500',
                          dotColor[b.slug],
                          active ? 'scale-100' : 'scale-0 group-hover:scale-100',
                        )}
                      />
                      {b.name}
                      <span
                        className={cn(
                          'absolute -bottom-0.5 left-3.5 right-0 h-px origin-left bg-deep-black transition-transform duration-500',
                          active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                        )}
                      />
                    </Link>
                  )
                })}
              </nav>
            </div>

            {/* Centre : logo */}
            <Link href="/" aria-label="Lady Queen — accueil" className="transition-opacity hover:opacity-75">
              <LadyQueenLogo
                priority
                className={cn('transition-[width] duration-500', scrolled ? 'w-28 lg:w-32' : 'w-32 lg:w-44')}
              />
            </Link>

            {/* Droite : actions */}
            <div className="flex items-center justify-end gap-1">
              <CurrencySwitcher className="hidden sm:block" />
              <button
                onClick={() => setSearchOpen(true)}
                className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-warm-100"
                aria-label="Rechercher"
              >
                <Search className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => setCartOpen(true)}
                className="relative flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-warm-100"
                aria-label={`Panier, ${cartCount} article${cartCount > 1 ? 's' : ''}`}
              >
                <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: [1.35, 1], opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="absolute right-0.5 top-0.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-champagne-gold px-1 font-mono text-[0.625rem] font-semibold text-deep-black"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Menu mobile plein écran */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-deep-black text-cream-white lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: EASE }}
            data-lenis-prevent
          >
            <div className="container-luxury flex h-[4.5rem] items-center justify-between">
              <LadyQueenLogo tone="light" className="w-28" />
              <button
                onClick={() => setMenuOpen(false)}
                className="-mr-2 flex h-11 w-11 items-center justify-center"
                aria-label="Fermer le menu"
              >
                <X className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </div>

            <nav className="container-luxury flex flex-1 flex-col justify-center gap-2" aria-label="Menu mobile">
              <p className="eyebrow-label mb-4 text-champagne-gold">Nos marques</p>
              {[{ name: 'Accueil', href: '/', category: 'La maison Lady Queen', slug: 'home' }, ...brands].map(
                (b, i) => (
                  <motion.div
                    key={b.href}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.25 + i * 0.08, ease: EASE }}
                  >
                    <Link
                      href={b.href}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-end justify-between border-b border-cream-white/10 py-5"
                    >
                      <span>
                        <span className="block font-display text-4xl leading-none">{b.name}</span>
                        <span className="mt-2 block text-xs uppercase tracking-[0.2em] text-cream-white/50">
                          {b.category}
                        </span>
                      </span>
                      <ArrowUpRight className="mb-1 h-5 w-5 text-champagne-gold transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                ),
              )}
            </nav>

            <motion.div
              className="container-luxury flex items-center justify-between pb-8 pt-6 text-xs uppercase tracking-[0.18em] text-cream-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <a href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              <CurrencySwitcher tone="dark" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchBar isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  )
}
