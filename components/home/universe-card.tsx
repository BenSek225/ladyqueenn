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
      <article className="bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-warm-100">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Overlay au hover */}
          <div className="absolute inset-0 bg-deep-black/0 group-hover:bg-deep-black/5 transition-all duration-300" />
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <p className="eyebrow-label mb-2 sm:mb-3">{subtitle}</p>
          
          <h3 className={`font-display text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4 text-deep-black transition-colors duration-300 ${accentColors[accent]}`}>
            {title}
          </h3>
          
          <p className="text-sm sm:text-base text-warm-500 leading-relaxed mb-6">
            {description}
          </p>
          
          <div className={`inline-flex items-center gap-2 text-sm font-medium text-deep-black transition-all duration-300 border-b-2 border-transparent pb-1 ${accentColors[accent]} ${accentBorders[accent]}`}>
            Découvrir
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-2" />
          </div>
        </div>
      </article>
    </Link>
  )
}
