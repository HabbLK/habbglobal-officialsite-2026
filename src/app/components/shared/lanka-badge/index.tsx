import Image from 'next/image'
import { motion } from 'motion/react'
import flagSriLanka from '@/assets/flags/Flag_of_Sri_Lanka.svg'

export default function LankaBadge() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-dark_black/80 backdrop-blur-sm rounded-full border border-dark_black/20 dark:border-white/20 shadow-sm'
        >
            <Image
                src={flagSriLanka}
                alt='Sri Lanka Flag'
                width={24}
                height={16}
                className='rounded-sm object-cover shadow-sm'
            />
            <span className='text-sm font-semibold text-dark_black dark:text-white'>
                SRI LANKA ENGINEERED
            </span>
        </motion.div>
    )
}
