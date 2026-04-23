'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import StarRating from '../../shared/star-rating'
import { TextGenerateEffect } from '@/app/components/ui/text-generate-effect'
import LankaBadge from '../../shared/lanka-badge'
import WatermarkLogo from '../../shared/watermark-logo'

type AvatarItem = { image: string }
type PageData = { avatarList?: AvatarItem[] }

function HeroSection() {
    const ref = useRef<HTMLDivElement | null>(null)
    const [avatarList, setAvatarList] = useState<PageData | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/page-data')
                if (!res.ok) throw new Error('Failed to fetch')
                const data = await res.json()
                setAvatarList(data)
            } catch (error) {
                console.error('Error fetching services:', error)
            }
        }

        fetchData()
    }, [])

    const bottomAnimation = {
        initial: { y: '20%', opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 1, delay: 0.8 },
    }

    return (
        <section className='min-h-screen relative flex items-center justify-center pt-20 overflow-hidden'>
            {/* Watermark Background Logo */}
            <WatermarkLogo size={1000} opacity={0.04} duration={2.5} />

            <div className='relative w-full py-10 md:py-14 before:absolute before:w-full before:h-full before:bg-linear-to-r before:from-blue_gradient before:via-white before:to-yellow_gradient before:rounded-full before:top-24 before:blur-3xl before:-z-20 dark:before:from-dark_blue_gradient dark:before:via-black dark:before:to-dark_yellow_gradient dark:before:rounded-full dark:before:blur-3xl dark:before:-z-20'>
                <div className='container relative z-10'>
                    <div ref={ref} className='flex flex-col items-center gap-8'>
                        {/* Lanka Badge */}
                        <LankaBadge />
                        {/* ---------------- heading text --------------- */}
                        <div className='relative flex flex-col text-center items-center gap-4'>
                            <h1 className='leading-tight'>
                                <TextGenerateEffect words="Your Success, Engineered in Sri Lanka" />
                                <TextGenerateEffect
                                    words="Delivered Globally"
                                    delay={0.8}
                                    className="italic font-normal instrument-font"
                                />
                            </h1>
                            <p className='max-w-2xl text-dark_black/60 dark:text-white/60'>
                                HABB is a Sri Lanka-based digital engineering partner specialising in designing and building secure, scalable products — web, mobile, cloud and AI. With a focus on reliability, performance and rapid time-to-market, we deliver production-ready software solutions to clients worldwide.
                            </p>
                        </div>

                        <motion.div
                            {...bottomAnimation}
                            className='flex flex-col items-center justify-center gap-4'>
                            <div className='flex flex-col items-center justify-center gap-8 w-full sm:flex-row'>
                                {/* ----------- Get started Link -------------- */}
                                <div className='flex gap-4 w-full max-w-2xl justify-center'>
                                    <Link
                                        href='/contact'
                                        className='group bg-purple_blue text-white font-medium flex items-center justify-center py-3 px-6 rounded-full w-full md:w-auto border border-purple_blue transition-all duration-200 ease-in-out hover:bg-transparent hover:text-purple_blue'>
                                        <span className='transform transition-transform duration-200 ease-in-out group-hover:translate-x-2'>
                                            Connect with Our Team
                                        </span>
                                    </Link>

                                    <Link
                                        href='/#work'
                                        className='hidden md:inline-flex items-center justify-center py-3 px-6 rounded-full w-full md:w-auto border border-dark_black text-dark_black/80 dark:text-white/80 bg-white/0 hover:bg-dark_black/5'>
                                        View our services
                                    </Link>
                                </div>
                                <svg
                                    width='40'
                                    height='40'
                                    viewBox='0 0 40 40'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='transform transition-transform duration-200 ease-in-out group-hover:-translate-x-44 group-hover:rotate-45'>
                                    <rect
                                        width='40'
                                        height='40'
                                        rx='20'
                                        className='fill-white transition-colors duration-200 ease-in-out group-hover:fill-purple_blue'
                                    />
                                    <path
                                        d='M15.832 15.3334H24.1654V23.6667'
                                        className='stroke-[#1B1D1E] transition-colors duration-200 ease-in-out group-hover:stroke-white'
                                        strokeWidth='1.66667'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M15.832 23.6667L24.1654 15.3334'
                                        className='stroke-[#1B1D1E] transition-colors duration-500 ease-in-out group-hover:stroke-white'
                                        strokeWidth='1.66667'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>

                                {/* --------------- avatar division -------------- */}
                                <div className='flex items-center gap-7 flex-wrap justify-center'>
                                    <ul className='avatar flex flex-row items-center'>
                                        {avatarList?.avatarList?.map((items, index) => (
                                            <li key={items.image ?? index} className='-mr-2 z-1 avatar-hover:ml-2'>
                                                <Image
                                                    src={items.image}
                                                    alt='Image'
                                                    width={44}
                                                    height={44}
                                                    quality={100}
                                                    className='rounded-full border-2 border-white'
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                    {/* -------------- Star rating division --------------- */}
                                    <div className='gap-1 flex flex-col items-start'>
                                        <div>
                                            <StarRating count={4} color='#F59E0B' />
                                        </div>
                                        <p className='text-sm font-normal text-dark_black/60 dark:text-white/60'>
                                            Trusted by industry partners worldwide
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
