'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { searchProducts, getSearchSuggestions } from '@/lib/utils/search'
import { SearchResults } from './search-results'

interface SearchBarProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Focus input quand le modal s'ouvre
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])
  
  // Recherche avec debounce
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([])
      setShowResults(false)
      return
    }
    
    const timer = setTimeout(() => {
      const newSuggestions = getSearchSuggestions(query, 5)
      setSuggestions(newSuggestions)
      setShowResults(true)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [query])
  
  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])
  
  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim().length < 2) return
    
    setQuery(searchQuery)
    setShowResults(true)
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }
  
  if (!isOpen) return null
  
  const results = query.length >= 2 ? searchProducts(query) : []
  
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-deep-black/60 backdrop-blur-sm z-[100] animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-x-0 top-0 z-[101] animate-slide-down">
        <div className="bg-cream-white border-b border-warm-200 shadow-xl">
          <div className="container-luxury py-6">
            {/* Barre de recherche */}
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-500" size={24} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher un produit, une catégorie..."
                  className="w-full pl-14 pr-14 py-4 bg-white border-2 border-warm-200 rounded-lg text-lg focus:border-gold-champagne focus:outline-none transition-colors"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-500 hover:text-deep-black transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* Suggestions rapides */}
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-warm-200 overflow-hidden z-10">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setQuery(suggestion)
                        handleSearch(suggestion)
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-warm-100 transition-colors flex items-center gap-3"
                    >
                      <Search size={16} className="text-warm-400" />
                      <span>{suggestion}</span>
                    </button>
                  ))}
                </div>
              )}
            </form>
            
            {/* Résultats */}
            {showResults && query.length >= 2 && (
              <div className="mt-8">
                <SearchResults results={results} onClose={onClose} />
              </div>
            )}
            
            {/* Message si aucun résultat */}
            {showResults && query.length >= 2 && results.length === 0 && (
              <div className="mt-8 text-center py-12">
                <p className="text-warm-500 text-lg mb-2">Aucun résultat trouvé</p>
                <p className="text-warm-400 text-sm">
                  Essayez avec d'autres mots-clés ou parcourez nos univers
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
