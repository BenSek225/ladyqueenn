import { ProductCardSkeletonGrid } from './product-card-skeleton'

export function PageLoadingState() {
  return (
    <main className="min-h-screen bg-cream-white">
      {/* Hero skeleton */}
      <div className="relative h-[70vh] bg-warm-200 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="space-y-6 text-center max-w-2xl px-4">
            <div className="h-4 w-48 bg-warm-300 rounded mx-auto" />
            <div className="space-y-3">
              <div className="h-16 bg-warm-300 rounded w-full" />
              <div className="h-16 bg-warm-300 rounded w-3/4 mx-auto" />
            </div>
            <div className="h-12 w-48 bg-warm-300 rounded mx-auto mt-8" />
          </div>
        </div>
      </div>
      
      {/* Content skeleton */}
      <div className="container-luxury py-24">
        <ProductCardSkeletonGrid count={6} />
      </div>
    </main>
  )
}

export function HeroSkeleton() {
  return (
    <section className="relative min-h-[70vh] bg-warm-200 animate-pulse">
      <div className="container-luxury h-full flex items-center justify-center py-24">
        <div className="space-y-6 text-center max-w-2xl">
          {/* Eyebrow */}
          <div className="h-4 w-40 bg-warm-300 rounded mx-auto" />
          
          {/* Titre */}
          <div className="space-y-3">
            <div className="h-12 md:h-20 bg-warm-300 rounded w-full" />
            <div className="h-12 md:h-20 bg-warm-300 rounded w-3/4 mx-auto" />
          </div>
          
          {/* Description */}
          <div className="space-y-2 max-w-xl mx-auto">
            <div className="h-3 bg-warm-300 rounded w-full" />
            <div className="h-3 bg-warm-300 rounded w-5/6 mx-auto" />
          </div>
          
          {/* CTA */}
          <div className="h-12 w-48 bg-warm-300 rounded mx-auto mt-8" />
        </div>
      </div>
    </section>
  )
}

export function ContentSkeleton() {
  return (
    <div className="container-luxury py-12">
      <div className="space-y-12">
        {/* Section header */}
        <div className="space-y-4">
          <div className="h-8 w-64 bg-warm-200 rounded animate-pulse" />
          <div className="h-4 w-96 bg-warm-200 rounded animate-pulse" />
        </div>
        
        {/* Content grid */}
        <ProductCardSkeletonGrid count={6} />
      </div>
    </div>
  )
}

export function DetailPageSkeleton() {
  return (
    <main className="min-h-screen bg-cream-white">
      <div className="container-luxury py-12">
        <div className="grid lg:grid-cols-[60%_40%] gap-12 animate-pulse">
          {/* Image skeleton */}
          <div>
            <div className="aspect-[4/5] bg-warm-200 rounded-lg mb-4" />
            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-20 aspect-square bg-warm-200 rounded" />
              ))}
            </div>
          </div>
          
          {/* Info skeleton */}
          <div className="space-y-6">
            <div className="h-4 w-24 bg-warm-200 rounded" />
            <div className="space-y-3">
              <div className="h-10 bg-warm-200 rounded w-3/4" />
              <div className="h-10 bg-warm-200 rounded w-1/2" />
            </div>
            <div className="h-8 w-32 bg-warm-200 rounded" />
            <div className="space-y-2">
              <div className="h-4 bg-warm-200 rounded w-full" />
              <div className="h-4 bg-warm-200 rounded w-5/6" />
              <div className="h-4 bg-warm-200 rounded w-4/5" />
            </div>
            <div className="h-12 bg-warm-200 rounded w-full mt-8" />
            <div className="h-12 bg-warm-200 rounded w-full" />
          </div>
        </div>
      </div>
    </main>
  )
}
