'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Search, User, ShoppingBag, Menu, X, Sparkles, Droplet, Home } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCart } from '@/lib/store'
import { CartDrawer } from '@/components/cart-drawer'
import { SearchBar } from '@/components/search/search-bar'

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const items = useCart((state) => state.items)

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0)

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const navItems = [
    { 
      label: 'SWEET-HAIR', 
      href: '/sweet-hair', 
      universe: 'sweet-hair',
      icon: Sparkles,
      color: 'sh-olive',
      description: 'Soins capillaires naturels'
    },
    { 
      label: 'FRAGRANCE', 
      href: '/fragrance', 
      universe: 'fragrance',
      icon: Droplet,
      color: 'fr-plum',
      description: 'Parfums artisanaux'
    },
    { 
      label: 'CROCHET BY THED', 
      href: '/crochet-by-thed', 
      universe: 'crochet',
      icon: Home,
      color: 'cr-earth',
      description: 'Créations crochet'
    },
  ]

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-cream-white/95 backdrop-blur-sm border-b border-warm-200">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-2 group transition-opacity hover:opacity-70 relative z-50"
            >
              <Image
                src="/images/logo-lady-queenn.png"
                alt="Lady Queenn"
                width={180}
                height={56}
                priority
                className="w-36 h-auto lg:w-44 object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 lg:gap-12" aria-label="Navigation principale">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium tracking-[0.18em] uppercase text-deep-black hover:text-champagne-gold transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3 lg:gap-6 relative z-50">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:bg-warm-100 rounded-md transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Rechercher"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* User Button */}
              <Link
                href="/compte"
                className="hidden md:flex p-2 hover:bg-warm-100 rounded-md transition-colors min-w-[44px] min-h-[44px] items-center justify-center"
                aria-label="Mon compte"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-warm-100 rounded-md transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={`Panier - ${cartItemsCount} article${cartItemsCount > 1 ? 's' : ''}`}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-champagne-gold text-deep-black text-xs font-mono font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-warm-100 rounded-md transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-deep-black/60 backdrop-blur-sm z-40 md:hidden animate-fade-in"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Drawer */}
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-cream-white z-50 md:hidden animate-slide-in-right shadow-2xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-warm-200">
                <h2 className="font-display text-xl font-semibold">Menu</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-warm-100 rounded-md transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Fermer le menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto px-6 py-8" aria-label="Navigation mobile">
                <div className="space-y-2">
                  {navItems.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="group flex items-start gap-4 p-4 rounded-lg hover:bg-warm-100 transition-all duration-300 animate-slide-in-left min-h-[68px]"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-${item.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <Icon className={`w-6 h-6 text-${item.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-medium tracking-[0.12em] uppercase text-deep-black group-hover:text-champagne-gold transition-colors">
                            {item.label}
                          </h3>
                          <p className="text-sm text-warm-500 mt-1">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    )
                  })}
                </div>

                {/* Secondary Links */}
                <div className="mt-8 pt-8 border-t border-warm-200 space-y-2">
                  <Link
                    href="/compte"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-base font-medium text-deep-black hover:text-champagne-gold transition-colors rounded-lg hover:bg-warm-100 min-h-[52px]"
                  >
                    <User className="w-5 h-5" />
                    <span>Mon Compte</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => { setIsMenuOpen(false); setIsCartOpen(true) }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-base font-medium text-deep-black hover:text-champagne-gold transition-colors rounded-lg hover:bg-warm-100 min-h-[52px]"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Ouvrir le panier</span>
                    {cartItemsCount > 0 && (
                      <span className="ml-auto bg-champagne-gold text-deep-black text-xs font-mono font-semibold px-2 py-1 rounded-full">
                        {cartItemsCount}
                      </span>
                    )}
                  </button>
                </div>
              </nav>

              {/* Footer */}
              <div className="px-6 py-6 border-t border-warm-200 bg-warm-50">
                <p className="text-xs text-warm-500 text-center">
                  © 2024 Lady Queenn. Tous droits réservés.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Search Modal */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Cart Drawer */}
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  )
}
