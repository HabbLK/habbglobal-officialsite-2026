'use client'

import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'

const COOKIE_KEY = 'habb_cookie_consent'

const CookieConsent = () => {
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY)
    if (!consent) {
      // Small delay so it slides in after page load
      const timer = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    dismiss('accepted')
  }

  const handleDecline = () => {
    dismiss('declined')
  }

  const dismiss = (value: string) => {
    setClosing(true)
    setTimeout(() => {
      localStorage.setItem(COOKIE_KEY, value)
      setVisible(false)
      setClosing(false)
    }, 400)
  }

  if (!visible) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[100] px-4 pb-4 sm:px-6 sm:pb-6 transition-all duration-500 ${closing
        ? 'translate-y-full opacity-0'
        : 'translate-y-0 opacity-100'
        }`}
    >
      {/* Card */}
      <div className='mx-auto max-w-2xl rounded-2xl border border-dark_black/[0.06] dark:border-white/[0.08] bg-white/80 dark:bg-dark_black/80 backdrop-blur-2xl shadow-2xl overflow-hidden'>

        {/* Accent bar */}
        <div className='h-1 w-full bg-gradient-to-r from-purple_blue via-green to-purple_blue' />

        <div className='p-5 sm:p-6'>
          {/* Header */}
          <div className='flex items-start gap-3 mb-3'>
            <div className='flex-shrink-0 w-10 h-10 rounded-xl bg-purple_blue/10 dark:bg-purple_blue/20 flex items-center justify-center'>
              <Icon icon='solar:shield-check-bold' className='w-5 h-5 text-purple_blue' />
            </div>
            <div className='flex-1 min-w-0'>
              <h3 className='text-sm sm:text-base font-bold text-dark_black dark:text-white leading-tight'>
                We value your privacy
              </h3>
              <p className='text-xs sm:text-sm text-dark_black/60 dark:text-white/60 mt-1 leading-relaxed'>
                We use cookies to enhance your browsing experience, analyse site traffic, and personalise content. By clicking &quot;Accept All&quot;, you consent to our use of cookies.{' '}
                <Link
                  href='/privacy-policy'
                  className='text-purple_blue hover:underline underline-offset-2 font-medium'
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className='flex items-center gap-3 mt-4'>
            <button
              onClick={handleAccept}
              className='flex-1 sm:flex-none px-6 py-2.5 text-sm font-bold text-white bg-purple_blue rounded-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] shadow-md shadow-purple_blue/20 hover:shadow-purple_blue/30'
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className='flex-1 sm:flex-none px-6 py-2.5 text-sm font-semibold text-dark_black/70 dark:text-white/70 bg-dark_black/5 dark:bg-white/5 border border-dark_black/10 dark:border-white/10 rounded-xl transition-all duration-300 hover:bg-dark_black/10 dark:hover:bg-white/10 hover:text-dark_black dark:hover:text-white'
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
