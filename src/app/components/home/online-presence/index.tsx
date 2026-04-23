'use client'
import { Icon } from '@iconify/react/dist/iconify.js'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { TextGenerateEffect } from '@/app/components/ui/text-generate-effect'

function OnlinePresence() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [onlinePresenceList, setOnlinePresenceList] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/page-data')
        if (!res.ok) throw new Error('Failed to fetch')

        const data = await res.json()
        setOnlinePresenceList(data?.onlinePresenceList)
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }
    fetchData()
  }, [])

  const bottomAnimation = (index: number) => ({
    initial: { y: 50, opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 },
    transition: { duration: 0.8, delay: 0.4 + index * 0.2, },
  })

  return (
    <section id='work'>
      <div ref={ref} className='2xl:py-20 py-11'>
        <div className='container'>
          <div className='flex flex-col justify-center items-center gap-10 md:gap-20'>
            <div className='max-w-2xl text-center'>
              <h2>
                <TextGenerateEffect words="Services by HABB" duration={0.5} />
                <TextGenerateEffect
                  words="HABB DIGI · HABB AI · HABBGate"
                  delay={1.2}
                  className="italic font-normal instrument-font"
                />
              </h2>
              <p className='mt-6 text-sm opacity-80'>
                HABB DIGI — digital marketing services to grow your brand online. HABB AI —
                AI-driven products and solutions. HABBGate — secure access control systems for
                buildings and events. Below are quick overviews; replace the images with
                your assets when ready.
              </p>

              <div className='mt-8 grid sm:grid-cols-3 gap-6'>
                <div className='p-4 rounded-2xl border border-dark_black/10 dark:border-white/10'>
                  <div className='h-40 w-full overflow-hidden rounded-lg mb-4'>
                    <Image src='/images/home/onlinePresence/habb-digi-placeholder.jpeg' alt='HABB DIGI' width={600} height={300} className='object-cover w-full h-full' />
                  </div>
                  <h4 className='font-semibold'>HABB DIGI</h4>
                  <p className='text-sm mt-2 opacity-80'>Full-service digital marketing: SEO, paid ads, social media and content to drive growth.</p>
                </div>

                <div className='p-4 rounded-2xl border border-dark_black/10 dark:border-white/10'>
                  <div className='h-40 w-full overflow-hidden rounded-lg mb-4'>
                    <Image src='/images/home/onlinePresence/habb-ai-placeholder.jpeg' alt='HABB AI' width={600} height={300} className='object-cover w-full h-full' />
                  </div>
                  <h4 className='font-semibold'>HABB AI</h4>
                  <p className='text-sm mt-2 opacity-80'>AI products and integrations: automation, personalization and predictive analytics.</p>
                </div>

                <Link href='https://www.habbgate.com' target='_blank' rel='noopener noreferrer' className='block p-4 rounded-2xl border border-dark_black/10 dark:border-white/10' aria-label='Open HABBGate website (opens in new tab)'>
                  <div className='h-40 w-full overflow-hidden rounded-lg mb-4'>
                    <Image src='/images/home/onlinePresence/habbgate-placeholder.jpeg' alt='HABBGate' width={600} height={300} className='object-cover w-full h-full' />
                  </div>
                  <h4 className='font-semibold'>HABBGate</h4>
                  <p className='text-sm mt-2 opacity-80'>Access control hardware & software for secure entry, attendance and visitor management.</p>
                </Link>
              </div>
            </div>
            {/* <div className='grid md:grid-cols-2 gap-x-6 gap-y-8 w-full'>
              {onlinePresenceList?.map((items: any, index: number) => (
                <motion.div
                  key={index}
                  className='group flex flex-col gap-6 cursor-pointer'
                  {...bottomAnimation(index)}
                >
                  <div className='relative'>
                    <Image
                      src={items.image}
                      alt={items.title}
                      width={625}
                      height={410}
                      className='rounded-2xl'
                    />
                    <Link
                      href={'https://www.framer.com/@wrap-pixel/'}
                      target='_blank'
                      className='absolute top-0 left-0 bg-black/50 w-full h-full rounded-2xl hidden group-hover:flex'
                    >
                      <span className='flex justify-end p-5 w-full'>
                        <Icon
                          icon='icon-park-solid:circle-right-up'
                          width='50'
                          height='50'
                          style={{ color: '#fbfbfb' }}
                        />
                      </span>
                    </Link>
                  </div>

                  <div className='flex flex-col items-start gap-4'>
                    <h3 className='group-hover:text-purple_blue text-2xl'>
                      {items.title}
                    </h3>
                    <div className='flex gap-3'>
                      {items.tag?.map((tag: any, idx: number) => (
                        <p
                          key={idx}
                          className='text-sm border border-dark_black/10 dark:border-white/50 w-fit py-1.5 px-4 rounded-full hover:bg-dark_black hover:text-white'
                        >
                          {tag}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OnlinePresence
