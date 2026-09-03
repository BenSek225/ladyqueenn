'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Product } from '@/lib/products'
import { useCart } from '@/lib/store'
import { formatPrice, badgeLabel } from '@/lib/utils'

export function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.addItem)
  return <article className="group"><Link href={`/produit/${product.slug}`}><div className="relative aspect-[4/5] overflow-hidden bg-secondary"><Image src={product.image} alt={product.name} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw"/>{product.badge && <span className="absolute left-3 top-3 bg-background px-2 py-1 text-[10px] uppercase tracking-widest">{badgeLabel(product.badge)}</span>}<button aria-label={`Ajouter ${product.name}`} onClick={(e) => { e.preventDefault(); add({ id: product.id, name: product.name, price: product.price, image: product.image }) }} className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-2 items-center justify-center bg-primary text-primary-foreground opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100"><Plus size={18}/></button></div></Link><div className="flex items-start justify-between gap-3 pt-4"><div><p className="text-xs uppercase tracking-widest text-muted-foreground">{product.category}</p><Link href={`/produit/${product.slug}`} className="mt-1 block text-sm hover:underline">{product.name}</Link></div><div className="text-right text-sm"><p>{formatPrice(product.price)}</p>{product.oldPrice && <p className="text-xs text-muted-foreground line-through">{formatPrice(product.oldPrice)}</p>}</div></div></article>
}
