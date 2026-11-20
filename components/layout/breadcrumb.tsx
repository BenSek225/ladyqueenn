import Link from 'next/link'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: string
  href: string
}

export function Breadcrumb({ items, tone = 'light' }: { items: BreadcrumbItem[]; tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark'
  return (
    <nav aria-label="Fil d'Ariane" className="py-3">
      <ol
        className={cn(
          'flex flex-wrap items-center gap-2 text-[0.6875rem] uppercase tracking-[0.18em]',
          dark ? 'text-cream-white/50' : 'text-warm-500',
        )}
      >
        <li>
          <Link href="/" className="transition-colors hover:text-champagne-gold">
            Lady Queen
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.href} className="flex items-center gap-2">
              <span className="h-px w-4 bg-current opacity-50" />
              {isLast ? (
                <span className={cn('line-clamp-1', dark ? 'text-cream-white' : 'text-deep-black')}>{item.label}</span>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-champagne-gold">
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
