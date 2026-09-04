import { create } from 'zustand'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
}

interface ToastStore {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  clearAll: () => void
}

export const useToast = create<ToastStore>((set) => ({
  toasts: [],
  
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration || 3000,
    }
    
    set((state) => ({
      toasts: [...state.toasts, newToast],
    }))
    
    // Auto-remove après la durée spécifiée
    if (newToast.duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }))
      }, newToast.duration)
    }
  },
  
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }))
  },
  
  clearAll: () => {
    set({ toasts: [] })
  },
}))

// Helpers pour utilisation simplifiée
export const toast = {
  success: (title: string, message?: string, duration?: number) => {
    useToast.getState().addToast({ type: 'success', title, message, duration })
  },
  error: (title: string, message?: string, duration?: number) => {
    useToast.getState().addToast({ type: 'error', title, message, duration })
  },
  info: (title: string, message?: string, duration?: number) => {
    useToast.getState().addToast({ type: 'info', title, message, duration })
  },
  warning: (title: string, message?: string, duration?: number) => {
    useToast.getState().addToast({ type: 'warning', title, message, duration })
  },
}
