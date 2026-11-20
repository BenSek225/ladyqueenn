'use client'

import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import { whatsappLink } from '@/lib/order'
import { cn } from '@/lib/utils'

export function WhatsAppFloat() {
  const pathname = usePathname()
  if (pathname.startsWith('/commande')) return null
  if (pathname.split('/').filter(Boolean).length >= 2) return null

  return (
    <motion.a
      href={whatsappLink('Bonjour Lady Queen 👑, j’ai une question.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Nous écrire sur WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 200, damping: 15 }}
      className={cn(
        'group fixed bottom-5 right-5 z-30 items-center gap-3 rounded-full bg-[#1f7a4d] p-3.5 text-white shadow-[0_15px_40px_-10px_rgba(31,122,77,0.7)] sm:bottom-7 sm:right-7',
        'flex',
      )}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#1f7a4d] opacity-20 [animation-duration:2.5s]" />
      <svg viewBox="0 0 24 24" className="relative h-6 w-6 fill-current" aria-hidden>
        <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3ZM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.7 15.6 2.2 13.8 2.2 12 2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 6.9 2.9 1.8 1.8 2.9 4.3 2.9 6.9 0 5.4-4.4 9.8-9.8 9.8Zm8.3-18.1A11.7 11.7 0 0 0 12 .3C5.5.3.3 5.5.3 12c0 2.1.5 4.1 1.6 5.9L.2 23.8l6-1.6c1.7.9 3.7 1.4 5.7 1.4 6.5 0 11.7-5.2 11.7-11.7 0-3.1-1.2-6.1-3.3-8.2Z" />
      </svg>
      <span className="relative hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-500 group-hover:max-w-40 group-hover:pr-1 lg:inline">
        Une question ?
      </span>
    </motion.a>
  )
}
