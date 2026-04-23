'use client'
import { motion, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import SingleCreativeMind from './SingleCreativeMind'
import { TextGenerateEffect } from '@/app/components/ui/text-generate-effect'

function CreativeMind() {
  const ref = useRef(null)
  const inView = useInView(ref)
  const [creativeMindList, setcreativeMindList] = useState<any>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/page-data')
        if (!res.ok) throw new Error('Failed to fetch')

        const data = await res.json()
        setcreativeMindList(data?.creativeMindList)
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }

    fetchData()
  }, [])

  const displayedList = showAll ? creativeMindList : creativeMindList?.slice(0, 8);

  const bottomAnimation = (index: any) => ({
    initial: { y: '5%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.4, delay: 0.1 + (index % 8) * 0.1 },
  })
  return (
    <section id='team'>
      <div ref={ref} className='2xl:py-20 py-11'>
        <div className='container'>
          <div className='flex flex-col justify-center items-center gap-10 md:gap-20'>
            <div className='max-w-32 text-center'>
              <h2>
                <TextGenerateEffect words="Meet the creative minds behind" duration={0.5} />
                <TextGenerateEffect
                  words="our success"
                  delay={1}
                  className="italic font-normal instrument-font"
                />
              </h2>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8'>
              {displayedList?.map((item: any, index: any) => {
                return (
                  <motion.div {...bottomAnimation(index)} key={index}>
                    <SingleCreativeMind key={index} creativemind={item} />
                  </motion.div>
                )
              })}
            </div>
            {creativeMindList && creativeMindList.length > 8 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className='group relative inline-flex items-center justify-center px-8 py-3.5 overflow-hidden font-medium text-base rounded-full transition duration-300 ease-out bg-purple_blue hover:shadow-xl hover:shadow-purple_blue/30 text-white'
              >
                <span className='absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple group-hover:translate-x-0 ease'>
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d={showAll ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'} />
                  </svg>
                </span>
                <span className='relative w-full text-center transition-all duration-300 transform group-hover:translate-x-full ease'>
                  {showAll ? 'Show Less' : `Show More (${creativeMindList.length - 8} more)`}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CreativeMind
