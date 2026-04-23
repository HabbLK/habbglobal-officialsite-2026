import React from 'react'
import { motion } from 'motion/react'

export default function UKBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-dark_black/80 backdrop-blur-sm rounded-full border border-dark_black/20 dark:border-white/20 shadow-sm'
    >
      <svg
        width='20'
        height='12'
        viewBox='0 0 60 30'
        className='rounded-sm'
      >
        {/* Union Jack */}
        <rect width='60' height='30' fill='#0d2f5f' />
        <path d='M0 0L60 30M60 0L0 30' stroke='#fff' strokeWidth='6' />
        <path d='M30 0v30M0 15h60' stroke='#c8102e' strokeWidth='4' />
        <path d='M30 0v30M0 15h60' stroke='#fff' strokeWidth='2' />
      </svg>
      <span className='text-sm font-semibold text-dark_black dark:text-white'>
        UK ENGINEERED
      </span>
    </motion.div>
  )
}
