import { Suspense } from 'react'
import { SearchPageContent } from './search-page-content'

export const metadata = {
  title: 'Recherche | Lady Queenn',
  description: 'Recherchez parmi nos produits de soin naturel, parfums de luxe et créations artisanales',
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageSkeleton />}>
      <SearchPageContent />
    </Suspense>
  )
}

function SearchPageSkeleton() {
  return (
    <main className="min-h-screen bg-cream-white">
      <div className="container-luxury py-12">
        <div className="h-8 w-64 bg-warm-200 animate-pulse rounded mb-8" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden">
              <div className="aspect-[4/5] bg-warm-200 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-warm-200 animate-pulse rounded w-3/4" />
                <div className="h-3 bg-warm-200 animate-pulse rounded w-full" />
                <div className="h-4 bg-warm-200 animate-pulse rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
