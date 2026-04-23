"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../header/Logo'
import { FaFacebook, FaTiktok, FaGithub, FaLinkedin, FaYoutube, FaXTwitter, FaInstagram } from 'react-icons/fa6'
import flagSriLanka from '@/assets/flags/Flag_of_Sri_Lanka.svg'

const Footer = () => {
  const [footerData, setfooterData] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/layout-data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setfooterData(data?.footerData)
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }

    fetchData()
  }, [])

  const getSocialIcon = (link: string) => {
    if (link.includes('instagram')) return FaInstagram;
    if (link.includes('tiktok')) return FaTiktok;
    if (link.includes('github')) return FaGithub;
    if (link.includes('linkedin')) return FaLinkedin;
    if (link.includes('youtube')) return FaYoutube;
    if (link.includes('x.com') || link.includes('twitter')) return FaXTwitter;
    if (link.includes('facebook')) return FaFacebook;
    return FaInstagram;
  };

  return (
    <footer className='xl:pt-20 pb-6'>
      <div className='container'>
        {/* Lanka Badge Section */}
        <div className='py-8 mb-8 px-6 rounded-lg bg-gradient-to-r from-purple_blue/10 via-orange/10 to-purple_blue/10 dark:from-purple_blue/20 dark:via-orange/20 dark:to-purple_blue/20 border border-orange/20'>
          <div className='flex items-center justify-center gap-3 mb-3'>
            <Image
              src={flagSriLanka}
              alt='Sri Lanka Flag'
              width={24}
              height={17}
              className='rounded-sm shadow-sm'
            />
            <span className='font-bold text-dark_black dark:text-white'>HABB - Sri Lanka's Digital Engineering Partner</span>
          </div>
          <p className='text-center text-sm text-dark_black/70 dark:text-white/70'>
            Based in Sri Lanka | Delivering global-scale digital solutions
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16 border-b border-dark_black/10 dark:border-white/10'>
          <div className='flex flex-col gap-6 items-center text-center md:items-start md:text-left'>
            <Logo />
            <p className='opacity-60 text-sm'>{footerData?.brand?.tagline}</p>
            <div className='flex gap-4 items-center'>
              {footerData?.brand?.socialLinks?.map((item: any, index: any) => {
                const IconComponent = getSocialIcon(item.link);
                return (
                  <Link
                    key={index}
                    href={item.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={item.link}
                    className='text-dark_black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition'>
                    <IconComponent size={20} className='inline-block' />
                  </Link>
                )
              })}
            </div>
          </div>

          <div className='flex flex-col gap-4 items-center text-center md:items-start md:text-left'>
            <p className='font-medium'>{footerData?.sitemap?.name}</p>
            <ul className='flex flex-col gap-2 items-center md:items-start'>
              {footerData?.sitemap?.links.map((item: any, index: any) => {
                return (
                  <li key={index} className='text-dark_black/60 hover:text-black dark:text-white/60 dark:hover:text-white text-sm'>
                    <Link href={item.url}>{item.name}</Link>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className='flex flex-col gap-4 items-center text-center md:items-start md:text-left'>
            <p className='font-medium'>{footerData?.otherPages?.name}</p>
            <ul className='flex flex-col gap-2 items-center md:items-start'>
              {footerData?.otherPages?.links.map((item: any, index: any) => {
                return (
                  <li key={index} className='text-dark_black/60 hover:text-black dark:text-white/60 dark:hover:text-white text-sm'>
                    <Link href={item.url}>{item.name}</Link>
                  </li>
                )
              })}
            </ul>
            {footerData?.websites && (
              <div className='flex flex-col gap-2 mt-4 pt-4 border-t border-dark_black/10 dark:border-white/10 items-center md:items-start'>
                <p className='font-medium text-sm'>{footerData.websites.name}</p>
                <ul className='flex flex-col gap-2 items-center md:items-start'>
                  {footerData.websites.links.map((w: any, i: number) => (
                    <li key={i} className='text-dark_black/60 hover:text-black dark:text-white/60 dark:hover:text-white text-sm'>
                      <Link href={w.url} target='_blank'>{w.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className='flex flex-col gap-4 items-center text-center md:items-start md:text-left'>
            <p className='font-medium'>{footerData?.contactDetails?.name}</p>
            <p className='text-dark_black/60 dark:text-white/60 text-sm'>
              {footerData?.contactDetails?.address1}
            </p>
            <Link href={`mailto:${footerData?.contactDetails?.email}`} className='text-dark_black/60 hover:text-black dark:text-white/60 dark:hover:text-white text-sm'>
              {footerData?.contactDetails?.email}
            </Link>
            {footerData?.contactDetails?.phones ? (
              <div className='flex flex-col gap-1 items-center md:items-start'>
                {footerData.contactDetails.phones.map((p: string, i: number) => (
                  <Link key={i} href={`tel:${p.replace(/\s+/g, '')}`} className='text-dark_black/60 hover:text-black dark:text-white/60 dark:hover:text-white text-sm'>
                    {p}
                  </Link>
                ))}
              </div>
            ) : (
              <Link href={`tel:${footerData?.contactDetails?.phone}`} className='text-dark_black/60 hover:text-black dark:text-white/60 dark:hover:text-white text-sm'>
                {footerData?.contactDetails?.phone}
              </Link>
            )}
            <div className='pt-2'>
              <Link
                href='/signin'
                className='inline-flex text-sm font-medium text-purple hover:text-purple/80 dark:text-purple/80 dark:hover:text-purple'
              >
                Admin login
              </Link>
            </div>
          </div>
        </div>
        <div className='flex justify-center mt-8'>
          <p className='text-dark_black/60 dark:text-white/60'>
            {footerData?.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
