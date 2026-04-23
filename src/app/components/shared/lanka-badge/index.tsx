import { motion } from 'motion/react'
import { Globe } from 'lucide-react'

export default function LankaBadge() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-dark_black/80 backdrop-blur-sm rounded-full border border-dark_black/20 dark:border-white/20 shadow-sm'
        >
            <Globe className="w-5 h-5 text-purple_blue" />
            <span className='text-sm font-semibold text-dark_black dark:text-white'>
                ENGINEERED GLOBALLY
            </span>
        </motion.div>
    )
}
