import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    href: string
  }
  secondaryAction?: {
    label: string
    href: string
  }
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      {/* Icône */}
      <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-warm-100 rounded-full">
        <Icon className="w-10 h-10 text-warm-400" strokeWidth={1.5} />
      </div>
      
      {/* Titre */}
      <h2 className="font-display text-2xl md:text-3xl text-deep-black mb-3">
        {title}
      </h2>
      
      {/* Description */}
      <p className="text-warm-500 max-w-md mb-8 leading-relaxed">
        {description}
      </p>
      
      {/* Actions */}
      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-3">
          {action && (
            <Link href={action.href} className="btn-primary">
              {action.label}
            </Link>
          )}
          {secondaryAction && (
            <Link href={secondaryAction.href} className="btn-secondary">
              {secondaryAction.label}
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
