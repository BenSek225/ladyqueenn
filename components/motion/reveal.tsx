'use client'

import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

const EASE = [0.16, 1, 0.3, 1] as const

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

function offset(direction: Direction, distance: number) {
  switch (direction) {
    case 'up':
      return { y: distance }
    case 'down':
      return { y: -distance }
    case 'left':
      return { x: distance }
    case 'right':
      return { x: -distance }
    default:
      return {}
  }
}

/** Apparition au défilement, fiable à chaque navigation. */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 32,
  duration = 0.9,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  direction?: Direction
  distance?: number
  duration?: number
  as?: 'div' | 'section' | 'li' | 'article' | 'span'
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, ...offset(direction, distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Tag>
  )
}

const groupVariants: Variants = {
  hidden: {},
  show: (stagger: number) => ({ transition: { staggerChildren: stagger } }),
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

/** Conteneur qui fait apparaître ses enfants <RevealItem> en cascade. */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  stagger?: number
  as?: 'div' | 'ul'
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      variants={groupVariants}
      custom={stagger}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      {children}
    </Tag>
  )
}

export function RevealItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'li' | 'article'
}) {
  const Tag = motion[as]
  return (
    <Tag className={className} variants={itemVariants}>
      {children}
    </Tag>
  )
}

/** Titre dont chaque ligne monte derrière un masque. */
export function SplitLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  as = 'h1',
}: {
  lines: ReactNode[]
  className?: string
  lineClassName?: string
  delay?: number
  as?: 'h1' | 'h2' | 'p'
}) {
  const reduce = useReducedMotion()
  const Tag = as
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={cn('block', lineClassName)}
            initial={reduce ? false : { y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, delay: delay + i * 0.12, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/** Texte dont les mots s'éclairent au fil du défilement. */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  )
}

function Word({
  children,
  progress,
  range,
}: {
  children: ReactNode
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block whitespace-pre">
      {children}{' '}
    </motion.span>
  )
}

/** Légère parallaxe verticale (images). */
export function Parallax({
  children,
  className,
  amount = 60,
}: {
  children: ReactNode
  className?: string
  amount?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-amount, amount])
  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <motion.div
        style={{ y, height: `calc(100% + ${amount * 2}px)`, marginTop: -amount }}
        className="relative w-full"
      >
        {children}
      </motion.div>
    </div>
  )
}
