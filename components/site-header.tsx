'use client'
import Link from 'next/link'
import { ShoppingBag, Menu, X, Globe2, Play, Camera, Mail, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/lib/store'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const count = useCart((s) => s.items.reduce((n, i) => n + i.quantity, 0))
  return <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
      <Link href="/" className="font-serif text-2xl italic tracking-tight">Lady Queenn</Link>
      <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.2em] md:flex">
        <Link href="/#boutique" className="hover:text-primary/60">Boutique</Link><Link href="/#journal" className="hover:text-primary/60">Journal</Link><Link href="/#contact" className="hover:text-primary/60">Contact</Link>
      </nav>
      <div className="flex items-center gap-4"><button aria-label="Ouvrir le panier" className="relative" onClick={() => window.dispatchEvent(new Event('open-cart'))}><ShoppingBag size={20} strokeWidth={1.5}/>{count > 0 && <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground">{count}</span>}</button><button className="md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X size={21}/> : <Menu size={21}/>}</button></div>
    </div>
    {open && <nav className="flex flex-col gap-5 border-t px-5 py-6 text-sm uppercase tracking-[0.18em] md:hidden"><Link onClick={() => setOpen(false)} href="/#boutique">Boutique</Link><Link onClick={() => setOpen(false)} href="/#journal">Journal</Link><Link onClick={() => setOpen(false)} href="/#contact">Contact</Link></nav>}
  </header>
} 

export function AnnouncementBar() { return <div className="bg-primary px-4 py-2 text-center text-[10px] uppercase tracking-[0.25em] text-primary-foreground">Livraison offerte à Abidjan dès 50 000 FCFA</div> }

export function Footer() { return <footer id="contact" className="bg-primary px-5 py-14 text-primary-foreground lg:px-8"><div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3"><div><p className="font-serif text-2xl italic text-brand-accent">Lady Queenn</p><p className="mt-4 max-w-xs text-sm leading-6 text-primary-foreground/65">Objets choisis, gestes transmis et beauté du quotidien.</p></div><div><p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/50">Nous écrire</p><div className="mt-4 flex flex-col gap-2 text-sm"><a className="underline underline-offset-4" href="https://wa.me/2250710504007">WhatsApp : +225 07 10 50 40 07</a><a className="underline underline-offset-4" href="tel:+2250556289835">+225 05 56 28 98 35</a><a className="underline underline-offset-4" href="mailto:ladyqueenn@gmail.com">ladyqueenn@gmail.com</a></div><div className="mt-6 flex items-center gap-4 text-brand-accent" aria-label="Réseaux sociaux"><a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><Globe2 size={18}/></a><a href="https://www.tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok"><Play size={18}/></a><a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Camera size={18}/></a><a href="https://wa.me/2250710504007" target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={18}/></a><a href="https://mail.google.com" target="_blank" rel="noreferrer" aria-label="Gmail"><Mail size={18}/></a></div></div><div><p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/50">Maison</p><p className="mt-4 text-sm leading-7 text-primary-foreground/65">Abidjan, Côte d’Ivoire<br/>Lun — Sam, 9h — 18h</p></div></div><div className="mx-auto mt-12 max-w-7xl border-t border-primary-foreground/15 pt-5 text-xs text-primary-foreground/45">© 2026 Lady Queenn. Tous droits réservés.</div></footer> }

export function SiteChrome({ children }: { children: React.ReactNode }) { return <><AnnouncementBar/><SiteHeader/>{children}<Footer/></> }

export function CartTrigger() { return null }
