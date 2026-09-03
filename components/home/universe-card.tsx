import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface UniverseCardProps {
  title: string
  subtitle: string
  description: string
  image: string
  href: string
  accent: 'sage' | 'plum' | 'terracotta'
}

export function UniverseCard({ title, subtitle, description, image, href, accent }: UniverseCardProps) {
  const accentColors = {
    sage: 'group-hover:text-sh-olive',
    plum: 'group-hover:text-fr-plum',
    terracotta: 'group-hover:text-cr-earth',
  }

  const accentBorders = {
    sage: 'group-hover:border-sh-olive',
    plum: 'group-hover:border-fr-plum',
    terracotta: 'group-hover:border-cr-earth',
  }

  return (
    <Link href={href} className="group">
      <article className="bg-white rounded-soft overflow-hidden transition-all duration-slow hover:shadow-elevated hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-warm-gray-100">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-slower group-hover:scale-105"
          />
          {/* Overlay au hover */}
          <div className="absolute inset-0 bg-deep-black/0 group-hover:bg-deep-black/10 transition-colors duration-normal" />
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8">
          <p className="eyebrow-label mb-3">{subtitle}</p>
          
          <h2 className={`font-display text-2xl lg:text-3xl mb-4 text-deep-black transition-colors ${accentColors[accent]}`}>
            {title}
          </h2>
          
          <p className="text-sm lg:text-base text-warm-500 leading-relaxed mb-6">
            {description}
          </p>
          
          <div className={`inline-flex items-center gap-2 text-sm font-medium text-deep-black transition-all border-b-2 border-transparent pb-1 ${accentColors[accent]} ${accentBorders[accent]}`}>
            Découvrir
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </article>
    </Link>
  )
}
