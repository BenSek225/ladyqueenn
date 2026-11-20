import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Confirmation } from './confirmation'

export const metadata: Metadata = {
  title: 'Confirmation de commande | Lady Queen',
  robots: { index: false },
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] bg-cream-light" />}>
      <Confirmation />
    </Suspense>
  )
}
