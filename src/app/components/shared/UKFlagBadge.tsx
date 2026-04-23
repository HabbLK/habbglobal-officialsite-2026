import Image from 'next/image'
import flagSriLanka from '@/assets/flags/Flag_of_Sri_Lanka.svg'

export default function UKFlagBadge({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-dark_black/80 border border-purple_blue/30 shadow-sm ${className}`}>
      <Image
        src={flagSriLanka}
        alt="Sri Lanka Flag"
        width={24}
        height={16}
        className="rounded-sm"
      />
      <span className="text-xs font-bold text-dark_black dark:text-white tracking-wide uppercase">Sri Lanka Engineered</span>
    </span>
  )
}
