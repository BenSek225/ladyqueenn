'use client'

import { useState, useMemo } from 'react'
import { FilterOptions, getPriceRange, getCategoriesByVolet } from '@/lib/utils/search'
import { Product, Volet } from '@/lib/types'
import { ChevronDown, X } from 'lucide-react'

interface SearchFiltersProps {
  initialProducts: Product[]
  onFilterChange: (filters: FilterOptions) => void
  currentFilters: FilterOptions
}

export function SearchFilters({ initialProducts, onFilterChange, currentFilters }: SearchFiltersProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['volet', 'price']))
  
  const priceRange = useMemo(() => getPriceRange(initialProducts), [initialProducts])
  
  const [localPriceRange, setLocalPriceRange] = useState({
    min: priceRange.min,
    max: priceRange.max,
  })
  
  const toggleSection = (section: string) => {
    setOpenSections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(section)) {
        newSet.delete(section)
      } else {
        newSet.add(section)
      }
      return newSet
    })
  }
  
  const handleVoletChange = (volet: Volet) => {
    const currentVolets = currentFilters.volet || []
    const newVolets = currentVolets.includes(volet)
      ? currentVolets.filter(v => v !== volet)
      : [...currentVolets, volet]
    
    onFilterChange({ volet: newVolets.length > 0 ? newVolets : undefined })
  }
  
  const handleCategoryChange = (category: string) => {
    const currentCategories = currentFilters.category || []
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category]
    
    onFilterChange({ category: newCategories.length > 0 ? newCategories : undefined })
  }
  
  const handlePriceChange = () => {
    onFilterChange({
      priceRange: {
        min: localPriceRange.min,
        max: localPriceRange.max,
      }
    })
  }
  
  const handleBadgeChange = (badge: string) => {
    const currentBadges = currentFilters.badges || []
    const newBadges = currentBadges.includes(badge)
      ? currentBadges.filter(b => b !== badge)
      : [...currentBadges, badge]
    
    onFilterChange({ badges: newBadges.length > 0 ? newBadges : undefined })
  }
  
  const clearFilters = () => {
    setLocalPriceRange({ min: priceRange.min, max: priceRange.max })
    onFilterChange({})
  }
  
  const hasActiveFilters = useMemo(() => {
    return (
      (currentFilters.volet && currentFilters.volet.length > 0) ||
      (currentFilters.category && currentFilters.category.length > 0) ||
      (currentFilters.badges && currentFilters.badges.length > 0) ||
      (currentFilters.priceRange && (
        currentFilters.priceRange.min !== priceRange.min ||
        currentFilters.priceRange.max !== priceRange.max
      ))
    )
  }, [currentFilters, priceRange])
  
  const voletOptions: Array<{ value: Volet; label: string; color: string }> = [
    { value: 'sweet-hair', label: 'Sweet-Hair', color: 'sh-olive' },
    { value: 'fragrance', label: 'Fragrance', color: 'fr-plum' },
    { value: 'crochet-by-thed', label: 'Crochet by THED', color: 'cr-earth' },
  ]
  
  const badgeOptions = [
    { value: 'nouveau', label: 'Nouveau' },
    { value: 'promo', label: 'En promotion' },
    { value: 'coup-de-coeur', label: 'Coup de cœur' },
    { value: 'limité', label: 'Édition limitée' },
  ]
  
  // Obtenir les catégories disponibles selon les volets sélectionnés
  const availableCategories = useMemo(() => {
    const selectedVolets = currentFilters.volet || ['sweet-hair', 'fragrance', 'crochet-by-thed'] as Volet[]
    const categories = new Set<string>()
    
    selectedVolets.forEach(volet => {
      getCategoriesByVolet(volet).forEach(cat => categories.add(cat))
    })
    
    return Array.from(categories)
  }, [currentFilters.volet])
  
  return (
    <div className="bg-white rounded-lg border border-warm-200 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-warm-200">
        <h2 className="font-display text-xl">Filtres</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-warm-500 hover:text-gold-champagne transition-colors flex items-center gap-1"
          >
            <X size={16} />
            Effacer
          </button>
        )}
      </div>
      
      {/* Univers */}
      <div>
        <button
          onClick={() => toggleSection('volet')}
          className="w-full flex items-center justify-between pb-3 border-b border-warm-200"
        >
          <span className="font-medium">Univers</span>
          <ChevronDown
            size={20}
            className={`transition-transform ${openSections.has('volet') ? 'rotate-180' : ''}`}
          />
        </button>
        
        {openSections.has('volet') && (
          <div className="pt-4 space-y-3">
            {voletOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={currentFilters.volet?.includes(option.value) || false}
                  onChange={() => handleVoletChange(option.value)}
                  className="w-4 h-4 rounded border-warm-300 text-gold-champagne focus:ring-gold-champagne"
                />
                <span className="text-sm group-hover:text-gold-champagne transition-colors">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
      
      {/* Catégories */}
      {availableCategories.length > 0 && (
        <div>
          <button
            onClick={() => toggleSection('category')}
            className="w-full flex items-center justify-between pb-3 border-b border-warm-200"
          >
            <span className="font-medium">Catégorie</span>
            <ChevronDown
              size={20}
              className={`transition-transform ${openSections.has('category') ? 'rotate-180' : ''}`}
            />
          </button>
          
          {openSections.has('category') && (
            <div className="pt-4 space-y-3">
              {availableCategories.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={currentFilters.category?.includes(category) || false}
                    onChange={() => handleCategoryChange(category)}
                    className="w-4 h-4 rounded border-warm-300 text-gold-champagne focus:ring-gold-champagne"
                  />
                  <span className="text-sm group-hover:text-gold-champagne transition-colors capitalize">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Prix */}
      <div>
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between pb-3 border-b border-warm-200"
        >
          <span className="font-medium">Prix</span>
          <ChevronDown
            size={20}
            className={`transition-transform ${openSections.has('price') ? 'rotate-180' : ''}`}
          />
        </button>
        
        {openSections.has('price') && (
          <div className="pt-4 space-y-4">
            <div className="space-y-2">
              <label className="block text-sm text-warm-500">
                Min: {localPriceRange.min} FCFA
              </label>
              <input
                type="range"
                min={priceRange.min}
                max={priceRange.max}
                step={500}
                value={localPriceRange.min}
                onChange={(e) => setLocalPriceRange(prev => ({
                  ...prev,
                  min: Number(e.target.value)
                }))}
                onMouseUp={handlePriceChange}
                onTouchEnd={handlePriceChange}
                className="w-full accent-gold-champagne"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm text-warm-500">
                Max: {localPriceRange.max} FCFA
              </label>
              <input
                type="range"
                min={priceRange.min}
                max={priceRange.max}
                step={500}
                value={localPriceRange.max}
                onChange={(e) => setLocalPriceRange(prev => ({
                  ...prev,
                  max: Number(e.target.value)
                }))}
                onMouseUp={handlePriceChange}
                onTouchEnd={handlePriceChange}
                className="w-full accent-gold-champagne"
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Badges */}
      <div>
        <button
          onClick={() => toggleSection('badges')}
          className="w-full flex items-center justify-between pb-3 border-b border-warm-200"
        >
          <span className="font-medium">Tags</span>
          <ChevronDown
            size={20}
            className={`transition-transform ${openSections.has('badges') ? 'rotate-180' : ''}`}
          />
        </button>
        
        {openSections.has('badges') && (
          <div className="pt-4 space-y-3">
            {badgeOptions.map((badge) => (
              <label
                key={badge.value}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={currentFilters.badges?.includes(badge.value) || false}
                  onChange={() => handleBadgeChange(badge.value)}
                  className="w-4 h-4 rounded border-warm-300 text-gold-champagne focus:ring-gold-champagne"
                />
                <span className="text-sm group-hover:text-gold-champagne transition-colors">
                  {badge.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
      
      {/* Stock */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={currentFilters.inStock || false}
            onChange={(e) => onFilterChange({ inStock: e.target.checked || undefined })}
            className="w-4 h-4 rounded border-warm-300 text-gold-champagne focus:ring-gold-champagne"
          />
          <span className="text-sm group-hover:text-gold-champagne transition-colors">
            En stock uniquement
          </span>
        </label>
      </div>
    </div>
  )
}
