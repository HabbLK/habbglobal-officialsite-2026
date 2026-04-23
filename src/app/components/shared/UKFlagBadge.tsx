import { Globe } from 'lucide-react'

export default function UKFlagBadge({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-dark_black/80 border border-purple_blue/30 shadow-sm ${className}`}>
      <Globe className="w-5 h-5 text-purple_blue" />
      <span className="text-xs font-bold text-dark_black dark:text-white tracking-wide uppercase">Globally Engineered</span>
    </span>
  )
}
