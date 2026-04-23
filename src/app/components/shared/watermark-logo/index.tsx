'use client'
import Image from 'next/image'
import { motion } from 'motion/react'

interface WatermarkLogoProps {
    opacity?: number
    scale?: number
    duration?: number
    rotate?: number
    size?: number
    grayscale?: boolean
    className?: string
}

export default function WatermarkLogo({
    opacity = 0.03,
    scale = 1,
    duration = 2,
    rotate = 0,
    size = 600,
    grayscale = true,
    className = ''
}: WatermarkLogoProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: scale * 0.9, rotate: rotate - 5 }}
            animate={{ opacity: opacity, scale: scale, rotate: rotate }}
            transition={{ duration: duration, ease: 'easeOut' }}
            className={`absolute flex items-center justify-center pointer-events-none -z-10 ${className}`}
        >
            <Image
                src='/images/logo/logo-bgremove.png'
                alt='HABB Watermark'
                width={size}
                height={size}
                priority={false}
                className={`h-auto select-none ${grayscale ? 'grayscale' : ''}`}
            />
        </motion.div>
    )
}
