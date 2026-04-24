"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../header/Logo'
import { FaFacebook, FaTiktok, FaGithub, FaLinkedin, FaYoutube, FaXTwitter, FaInstagram } from 'react-icons/fa6'
import { Globe } from 'lucide-react'

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
            <Globe className="w-6 h-6 text-purple_blue" />
            <span className='font-bold text-dark_black dark:text-white'>HABB GLOBAL (PVT) LTD - Your Digital Engineering Partner</span>
          </div>
          <p className='text-center text-sm text-dark_black/70 dark:text-white/70'>
            Connecting Talent Globally | Delivering world-class digital solutions
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
            {/* Websites section removed as requested */}
          </div>

          <div className='flex flex-col gap-4 items-center text-center md:items-start md:text-left'>
            <p className='font-medium'>{footerData?.contactDetails?.name}</p>
            <p className='text-dark_black/60 dark:text-white/60 text-sm'>
              {footerData?.contactDetails?.address1}
            </p>
            <Link href={`mailto:${footerData?.contactDetails?.email}`} className='text-dark_black/60 hover:text-black dark:text-white/60 dark:hover:text-white text-sm'>
              {footerData?.contactDetails?.email}
            </Link>
            <div className='flex flex-col gap-1 items-center md:items-start'>
              <Link href={'tel:+94701111484'} className='text-dark_black/60 hover:text-black dark:text-white/60 dark:hover:text-white text-sm'>+94 70 1111 484</Link>
              <Link href={'tel:+41799239772'} className='text-dark_black/60 hover:text-black dark:text-white/60 dark:hover:text-white text-sm'>+41 79 9239 772</Link>
              <Link href={'tel:+94774704219'} className='text-dark_black/60 hover:text-black dark:text-white/60 dark:hover:text-white text-sm'>+94 77 4704 219</Link>
              <Link href={'tel:+94701111055'} className='text-dark_black/60 hover:text-black dark:text-white/60 dark:hover:text-white text-sm'>+94 70 1111 055</Link>
            </div>
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
