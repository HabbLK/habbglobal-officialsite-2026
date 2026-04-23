"use client"
import { useEffect, useState } from 'react'
import Image from 'next/image'
import flagSriLanka from '@/assets/flags/Flag_of_Sri_Lanka.svg'
import flagGermany from '@/assets/flags/Flag_of_Germany_(RGB).svg.png'
import flagFrance from '@/assets/flags/Flag_of_France.svg.png'
import flagCanada from '@/assets/flags/Flag_of_Canada_(Pantone).svg'
import flagAustralia from '@/assets/flags/Flag_of_Australia_(converted).svg.png'
import flagSwitzerland from '@/assets/flags/Flag_of_Switzerland_(Pantone).svg'
import flagUK from '@/assets/flags/Flag_of_the_United_Kingdom_(1-2).svg'
import flagIndia from '@/assets/flags/Flag_of_India.svg'

function Brand() {
  const [brandList, setbrandList] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/page-data')
        if (!res.ok) throw new Error('Failed to fetch')

        const data = await res.json()
        setbrandList(data?.brandList || [])
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <section>
      <div className='2xl:py-20 py-11'>
        <div className='container'>
          <div className='gap-4'>
            <div className='flex justify-center text-center py-4 relative'>
              <p
                className='relative px-2 text-dark_black/60 dark:text-white/60
                    md:before:absolute md:before:right-[-150px] md:before:top-1/2 md:before:h-0.5 md:before:w-36 md:before:bg-linear-to-r md:before:from-gray-800 dark:md:before:from-gray-300 dark:md:before:opacity-100 md:before:opacity-10 md:before:to-transparent md:after:absolute md:after:left-[-150px] md:after:top-1/2 md:after:h-0.5 md:after:w-36 md:after:bg-linear-to-l md:after:from-gray-800 dark:md:after:from-gray-300 md:after:opacity-10 dark:md:after:opacity-100 md:after:to-transparent'>
                Loved by 48+ big and small brands around the worlds
              </p>
            </div>

            {/* Replace logo slider with running slogan and tech icons strip */}
            <div className='py-3 Xsm:py-7'>
              <div className='overflow-hidden'>
                <div className='animate-marquee-text text-sm md:text-base text-dark_black/80 dark:text-white/80' aria-hidden>
                  {[0, 1].map((i) => (
                    <span key={i} className='px-6 whitespace-nowrap'>
                      HABB — Empowering businesses with smart AI, digital marketing, cloud, and secure access systems · AI · Digital Marketing · Cloud · DevOps · Security · UX · IoT · Automation · Analytics · Integration · Open Source · Design · Growth
                    </span>
                  ))}
                </div>
              </div>

              <div className='mt-4 overflow-hidden relative'>
                <div className='marquee-icons-track py-6'>
                  {[
                    { src: flagSriLanka, alt: 'Sri Lanka' },
                    { src: flagUK, alt: 'United Kingdom' },
                    { src: flagGermany, alt: 'Germany' },
                    { src: flagFrance, alt: 'France' },
                    { src: flagCanada, alt: 'Canada' },
                    { src: flagAustralia, alt: 'Australia' },
                    { src: flagSwitzerland, alt: 'Switzerland' },
                    { src: flagIndia, alt: 'India' },
                    { src: flagSriLanka, alt: 'Sri Lanka' },
                    { src: flagUK, alt: 'United Kingdom' },
                    { src: flagGermany, alt: 'Germany' },
                    { src: flagFrance, alt: 'France' },
                    { src: flagCanada, alt: 'Canada' },
                    { src: flagAustralia, alt: 'Australia' },
                    { src: flagSwitzerland, alt: 'Switzerland' },
                    { src: flagIndia, alt: 'India' },
                  ].map((flag: any, i: number) => (
                    <div key={i} className='inline-flex flex-col items-center justify-center w-20 opacity-95 flex-shrink-0'>
                      <Image src={flag.src} alt={flag.alt} width={44} height={44} className='rounded-full object-cover shadow-sm' />
                    </div>
                  ))}
                </div>
              </div>

              <style>{`
                @keyframes marqueeText { 
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .animate-marquee-text { 
                  display: flex; 
                  width: max-content;
                  animation: marqueeText 16s linear infinite; 
                  align-items: center;
                  gap: 3rem;
                }

                @keyframes marqueeIcons { 
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .marquee-icons-track { 
                  display: inline-flex;
                  align-items: center;
                  gap: 2rem;
                  animation: marqueeIcons 20s linear infinite;
                  white-space: nowrap;
                }
                .marquee-icons-track > div { flex-shrink: 0; }
              `}</style>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  )
}

export default Brand
