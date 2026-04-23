// "use client"
// import React, { useEffect, useRef, useState } from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { TextGenerateEffect } from '@/app/components/ui/text-generate-effect'

// const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6'

// export const Subscription = () => {
//   const [events, setEvents] = useState<any[]>([])

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const res = await fetch('/api/page-data')
//         if (!res.ok) throw new Error('Failed to fetch events')
//         const data = await res.json()
//         setEvents(data?.events || [])
//       } catch (err) {
//         console.error(err)
//       }
//     }

//     fetchEvents()
//   }, [])

//   return (
//     <section id='events' className='scroll-mt-50'>
//       <div className='2xl:py-12 py-6'>
//         <div className='container'>
//           <div className='flex flex-col gap-10 md:gap-20'>
//             <div className='max-w-2xl text-center mx-auto'>
//               <h2>
//                 <TextGenerateEffect words='Latest HABB events & highlights' />
//                 <TextGenerateEffect
//                   words='community, showcases and milestones'
//                   delay={0.9}
//                   className='italic font-normal instrument-font'
//                 />
//               </h2>
//               </div>

//             <Carousel events={events} />
//           </div>
//         </div>
//       </div>
//     </section>
//   )

//     function Carousel({ events }: { events: any[] }) {
//       const containerRef = useRef<HTMLDivElement | null>(null)
//       const [paused, setPaused] = useState(false)

//       useEffect(() => {
//         const el = containerRef.current
//         if (!el) return
//         const interval = setInterval(() => {
//           if (paused) return
//           const maxScroll = el.scrollWidth - el.clientWidth
//           if (el.scrollLeft >= maxScroll - 1) {
//             el.scrollTo({ left: 0, behavior: 'smooth' })
//           } else {
//             // scroll roughly one card width ahead
//             el.scrollBy({ left: Math.floor(el.clientWidth * 0.8), behavior: 'smooth' })
//           }
//         }, 3000)

//         return () => clearInterval(interval)
//       }, [paused])

//       return (
//         <div
//           className='relative'
//           onMouseEnter={() => setPaused(true)}
//           onMouseLeave={() => setPaused(false)}
//         >
//           <div
//             ref={containerRef}
//             className='flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth py-2 no-scrollbar'
//             style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' as any }}
//           >
//             {events.map((ev, idx) => (
//               <article
//                 key={idx}
//                 className='snap-start flex-shrink-0 rounded-2xl overflow-hidden border border-border dark:border-white/10 w-[80%] sm:w-[60%] md:w-[45%] lg:w-[33%] bg-white dark:bg-[#0b0b0b] shadow-sm hover:shadow-md transform hover:-translate-y-1 transition'
//               >
//                 <Link href={ev.link} target='_blank' rel='noopener noreferrer' className='block'>
//                   <div className='h-36 w-full relative'>
//                     <Image src={ev.image || FALLBACK_IMAGE} alt={ev.title} fill style={{ objectFit: 'cover' }} />
//                     <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />
//                   </div>
//                   <div className='p-6'>
//                     <h3 className='text-lg font-semibold mb-2 text-dark_black dark:text-white'>{ev.title}</h3>
//                     <p className='text-sm text-dark_black/70 dark:text-white/60 mb-4'>{ev.description}</p>
//                     <span className='text-sm text-primary dark:text-primary-300'>Read more →</span>
//                   </div>
//                 </Link>
//               </article>
//             ))}
//           </div>
//         </div>
//       )
//     }
// }

// export default Subscription
