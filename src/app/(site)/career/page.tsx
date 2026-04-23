'use client'
import Link from 'next/link'
import { motion } from 'motion/react'
import { TextGenerateEffect } from '@/app/components/ui/text-generate-effect'
import { useEffect, useState } from 'react'
import WatermarkLogo from '@/app/components/shared/watermark-logo'

type Career = {
  id?: string
  title: string
  department?: string
  location?: string
  employmentType?: string
  summary: string
  applyLink?: string
  tags?: string[]
  image?: string // Added missing 'image' property
}

export default function CareerPage() {
  const fadeInUp = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6 },
  }

  const [careers, setCareers] = useState<Career[]>([])

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await fetch('/api/careers')
        if (!res.ok) throw new Error('Failed to load careers')
        const data = await res.json()
        setCareers(data || [])
      } catch (error) {
        console.error(error)
      }
    }

    fetchCareers()
  }, [])

  return (
    <main className="min-h-screen relative overflow-hidden">
      <WatermarkLogo size={1200} opacity={0.02} rotate={-10} className="-left-40 top-20" />
      <div className='relative w-full pt-44 2xl:pb-20 pb-10 before:absolute before:w-full before:h-full before:bg-linear-to-r before:from-blue_gradient before:via-white before:to-yellow_gradient before:rounded-full before:top-24 before:blur-3xl before:-z-10 dark:before:from-dark_blue_gradient dark:before:via-black dark:before:to-dark_yellow_gradient dark:before:rounded-full dark:before:blur-3xl dark:before:-z-10'>
        <div className="container relative z-10">
          <motion.div {...fadeInUp} className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 mt-20">
              <TextGenerateEffect words="Join Our" />
              <TextGenerateEffect
                words="Team"
                delay={0.5}
                className="italic font-normal instrument-font"
              />
            </h1>
            <p className="text-xl text-dark_black/70 dark:text-white/70 max-w-2xl mx-auto">
              Be part of an innovative journey where ideas become intelligent solutions. We're looking for passionate individuals ready to make an impact.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {careers.map((job, index) => (
            <motion.div
              key={job.id || job.title}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 * index }}
              className="group p-8 rounded-3xl bg-white dark:bg-white/5 border border-dark_black/10 dark:border-white/10 hover:shadow-2xl transition-all duration-300"
            >
              {/* Poster image above content */}
              {job.image ? (
                <div className="mb-6 w-full overflow-hidden rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center">
                  <img src={job.image} alt={job.title} className="w-full rounded-xl object-contain max-h-80" />
                </div>
              ) : (
                <div className="mb-6 w-full h-40 rounded-xl bg-gradient-to-br from-purple to-blue flex items-center justify-center">
                  <span className="text-white text-3xl font-semibold">{job.title?.[0] || 'H'}</span>
                </div>
              )}

              <div className="mb-4">
                <h2 className="text-2xl font-bold">{job.title}</h2>
                <p className="text-sm text-dark_black/60 dark:text-white/60 mt-1">{job.department || 'HABB'}</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {job.employmentType && (
                  <span className="px-4 py-1.5 bg-orange/10 text-orange rounded-full text-sm font-medium border border-orange/20">
                    {job.employmentType}
                  </span>
                )}
                {job.location && (
                  <span className="px-4 py-1.5 bg-blue/10 text-blue rounded-full text-sm font-medium border border-blue/20">
                    {job.location}
                  </span>
                )}
                {(job.tags || []).map((tag) => (
                  <span key={tag} className="px-4 py-1.5 bg-pink/10 text-pink rounded-full text-sm font-medium border border-pink/20">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-dark_black/80 dark:text-white/80 mb-8 leading-relaxed">
                {job.summary}
              </p>

              <div className="pt-6 border-t border-dark_black/10 dark:border-white/10">
                <Link
                  href={job.applyLink || '#'}
                  target="_blank"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-purple_blue bg-purple_blue text-white font-medium transition-all duration-200 ease-in-out hover:bg-transparent hover:text-purple_blue"
                >
                  Apply Now
                  <svg
                    className="w-5 h-5 transition-transform duration-200 ease-in-out group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
