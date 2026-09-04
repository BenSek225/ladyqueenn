export function ProductCardSkeleton() {
  return (
    <article className="bg-white rounded-lg overflow-hidden border border-warm-200 animate-pulse">
      {/* Image skeleton - Ratio 4:5 */}
      <div className="relative aspect-[4/5] bg-warm-200" />
      
      {/* Info skeleton */}
      <div className="p-4 space-y-3">
        {/* Eyebrow */}
        <div className="h-3 w-20 bg-warm-200 rounded" />
        
        {/* Titre */}
        <div className="space-y-2">
          <div className="h-5 bg-warm-200 rounded w-3/4" />
          <div className="h-5 bg-warm-200 rounded w-1/2" />
        </div>
        
        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 bg-warm-200 rounded w-full" />
          <div className="h-3 bg-warm-200 rounded w-4/5" />
        </div>
        
        {/* Prix */}
        <div className="h-6 w-32 bg-warm-200 rounded mt-4" />
      </div>
    </article>
  )
}

export function ProductCardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}
