'use client'

import Link from 'next/link'
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/lib/store'
import { CartDrawer } from '@/components/cart-drawer'
import { SearchBar } from '@/components/search/search-bar'

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const items = useCart((state) => state.items)

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const navItems = [
    { label: 'CHEVEUX', href: '/cheveux', universe: 'sweet-hair' },
    { label: 'CORPS', href: '/corps', universe: 'fragrance' },
    { label: 'MAISON', href: '/maison', universe: 'crochet' },
  ]

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-cream-white/95 backdrop-blur-sm border-b border-warm-gray-200">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-2 group transition-opacity hover:opacity-70"
            >
              <span className="text-2xl" aria-label="Couronne Lady Queenn">👑</span>
              <span className="font-display font-semibold text-lg lg:text-xl tracking-tight">
                Lady Queenn
              </span>
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
            <div className="flex items-center gap-4 lg:gap-6">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:bg-warm-gray-100 rounded-md transition-colors"
                aria-label="Rechercher"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* User Button */}
              <Link
                href="/compte"
                className="hidden md:block p-2 hover:bg-warm-gray-100 rounded-md transition-colors"
                aria-label="Mon compte"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-warm-gray-100 rounded-md transition-colors"
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
                className="md:hidden p-2 hover:bg-warm-gray-100 rounded-md transition-colors"
                aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>



        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-warm-gray-200 bg-cream-white">
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4" aria-label="Navigation mobile">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base font-medium tracking-[0.18em] uppercase text-deep-black hover:text-champagne-gold transition-colors py-2"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/compte"
                onClick={() => setIsMenuOpen(false)}
                className="text-base font-medium tracking-[0.18em] uppercase text-deep-black hover:text-champagne-gold transition-colors py-2 border-t border-warm-gray-200 mt-2 pt-4"
              >
                MON COMPTE
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Search Modal */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Cart Drawer */}
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  )
}
