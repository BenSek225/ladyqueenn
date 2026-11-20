import { cn } from '@/lib/utils'

/** Bandeau défilant infini. */
export function Marquee({
  items,
  className,
  separator = '✦',
}: {
  items: string[]
  className?: string
  separator?: string
}) {
  const row = (hidden?: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 sm:px-10">{item}</span>
          <span className="text-[0.5em] text-champagne-gold">{separator}</span>
        </span>
      ))}
    </div>
  )
  return (
    <div className={cn('flex overflow-hidden whitespace-nowrap', className)}>
      <div className="flex animate-marquee">
        {row()}
        {row(true)}
      </div>
    </div>
  )
}
