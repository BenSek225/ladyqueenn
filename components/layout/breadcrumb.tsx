import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Fil d'Ariane" className="py-4">
      <ol className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-warm-gray-500">
        <li>
          <Link 
            href="/" 
            className="hover:text-champagne-gold transition-colors"
          >
            ACCUEIL
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.href} className="flex items-center gap-2">
              <ChevronRight className="w-3 h-3" />
              {isLast ? (
                <span className="text-deep-black font-semibold">
                  {item.label}
                </span>
              ) : (
                <Link 
                  href={item.href}
                  className="hover:text-champagne-gold transition-colors"
                >
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
