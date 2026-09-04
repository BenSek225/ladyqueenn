'use client'

import { useEffect } from 'react'
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { useToast, Toast as ToastType } from '@/lib/stores/toast-store'

function ToastItem({ toast }: { toast: ToastType }) {
  const removeToast = useToast((state) => state.removeToast)
  
  const icons = {
    success: <CheckCircle2 size={20} />,
    error: <AlertCircle size={20} />,
    info: <Info size={20} />,
    warning: <AlertTriangle size={20} />,
  }
  
  const styles = {
    success: 'bg-green-50 border-green-200 text-green-900',
    error: 'bg-red-50 border-red-200 text-red-900',
    info: 'bg-blue-50 border-blue-200 text-blue-900',
    warning: 'bg-amber-50 border-amber-200 text-amber-900',
  }
  
  const iconColors = {
    success: 'text-green-600',
    error: 'text-red-600',
    info: 'text-blue-600',
    warning: 'text-amber-600',
  }
  
  return (
    <div
      className={`
        flex items-start gap-3 p-4 rounded-lg border shadow-xl
        ${styles[toast.type]}
        animate-slide-in-right
      `}
      role="alert"
    >
      {/* Icône */}
      <div className={`flex-shrink-0 ${iconColors[toast.type]}`}>
        {icons[toast.type]}
      </div>
      
      {/* Contenu */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm mb-0.5">
          {toast.title}
        </p>
        {toast.message && (
          <p className="text-sm opacity-90">
            {toast.message}
          </p>
        )}
      </div>
      
      {/* Bouton fermer */}
      <button
        onClick={() => removeToast(toast.id)}
        className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Fermer"
      >
        <X size={16} />
      </button>
    </div>
  )
}

export function ToastContainer() {
  const toasts = useToast((state) => state.toasts)
  
  if (toasts.length === 0) return null
  
  return (
    <div
      className="fixed top-4 right-4 z-[200] flex flex-col gap-3 max-w-sm w-full pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} />
        </div>
      ))}
    </div>
  )
}

// Hook pour utiliser facilement les toasts
export { useToast, toast } from '@/lib/stores/toast-store'
