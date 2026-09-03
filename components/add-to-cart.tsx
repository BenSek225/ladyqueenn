'use client'
import { ShoppingBag } from 'lucide-react'
import { Product } from '@/lib/products'
import { useCart } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
export function AddToCart({ product }: { product: Product }) { const add = useCart(s=>s.addItem); return <button disabled={!product.stock} onClick={()=>{add({id:product.id,name:product.name,price:product.price,image:product.image}); window.dispatchEvent(new Event('open-cart'))}} className="flex w-full items-center justify-center gap-3 bg-primary py-4 text-xs uppercase tracking-widest text-primary-foreground disabled:opacity-40"><ShoppingBag size={16}/> Ajouter au panier — {formatPrice(product.price)}</button> }
