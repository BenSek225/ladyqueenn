import { ButtonHTMLAttributes, forwardRef } from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon'
  size?: 'sm' | 'md' | 'lg'
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  isLoading?: boolean
  ripple?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      icon: Icon,
      iconPosition = 'right',
      isLoading = false,
      ripple = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variantClasses = {
      primary: 'bg-deep-black text-cream-white hover:bg-champagne-gold hover:text-deep-black hover:-translate-y-1 hover:shadow-xl active:translate-y-0 focus-visible:ring-champagne-gold disabled:hover:translate-y-0',
      secondary: 'bg-transparent text-deep-black border-2 border-deep-black hover:bg-deep-black hover:text-cream-white hover:-translate-y-1 hover:shadow-lg active:translate-y-0 focus-visible:ring-deep-black disabled:hover:translate-y-0',
      ghost: 'bg-transparent text-deep-black hover:text-champagne-gold hover:gap-3 focus-visible:ring-champagne-gold',
      icon: 'w-12 h-12 rounded-full bg-deep-black text-cream-white hover:bg-champagne-gold hover:text-deep-black hover:scale-110 hover:shadow-lg active:scale-100 focus-visible:ring-champagne-gold disabled:hover:scale-100',
    }
    
    const sizeClasses = {
      sm: variant === 'icon' ? 'w-10 h-10' : 'px-4 py-2 text-sm',
      md: variant === 'icon' ? 'w-12 h-12' : 'px-6 py-3 text-base',
      lg: variant === 'icon' ? 'w-14 h-14' : 'px-8 py-4 text-lg',
    }
    
    const rippleClass = ripple ? 'btn-ripple' : ''
    
    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          rippleClass,
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            {Icon && iconPosition === 'left' && <Icon size={20} />}
            {children}
            {Icon && iconPosition === 'right' && <Icon size={20} />}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
