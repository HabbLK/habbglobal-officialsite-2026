'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { Icon } from '@iconify/react/dist/iconify.js'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import HeaderLink from './Navigation/HeaderLink'
import Logo from './Logo'
import MobileHeader from './Navigation/MobileHeader'
import ThemeToggler from './ThemeToggle'

const Header = () => {
  const { data: session } = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuData, setMenuData] = useState<any[]>([]);
  const [user, setUser] = useState<{ user: any } | null>(null)
  const [sticky, setSticky] = useState(false)
  const pathname = usePathname()
  const hasMounted = useRef(false);

  const handleScroll = () => {
    setSticky(window.scrollY >= 80)
  }

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Run only once on initial mount
    if (!hasMounted.current) {
      hasMounted.current = true;

      const fetchData = async () => {
        try {
          const res = await fetch('/api/layout-data');
          if (!res.ok) throw new Error('Failed to fetch');
          const data = await res.json();
          setMenuData(data?.headerData);
        } catch (error) {
          console.error('Error fetching services:', error);
        }
      };

      fetchData();
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const handleSignOut = () => {
    localStorage.removeItem('user')
    signOut()
    setUser(null)
  }

  return (
    <>
      <header className={`fixed top-0 z-[70] w-full transition-all duration-300 ${sticky
        ? 'py-3 bg-white/70 dark:bg-dark_black/70 backdrop-blur-xl border-b border-white/20 dark:border-white/5 shadow-premium_card'
        : 'py-6 bg-transparent'
        }`}>
        <div className='container'>
          <nav className='flex items-center justify-between'>
            {/* Logo */}
            <div className='flex items-center'>
              <Logo />
            </div>

            {/* Navigation Menu */}
            <div className='hidden lg:flex items-center'>
              <ul className='flex items-center gap-1 xl:gap-2'>
                {menuData?.map((item, index) => (
                  <HeaderLink key={index} item={item} />
                ))}
              </ul>
            </div>

            {/* Actions (Contact, Theme, User) */}
            <div className='flex items-center gap-2 xl:gap-6'>
              {/* ---------------------SignUp SignIn Button-----------------  */}
              {user?.user || session?.user ? (
                <div className='hidden lg:flex items-center gap-6'>
                  <button
                    onClick={() => handleSignOut()}
                    className='text-sm font-bold text-dark_black/70 dark:text-white/70 hover:text-dark_black dark:hover:text-white transition-colors'>
                    Sign Out
                  </button>
                  <div className='relative group'>
                    <Image
                      src='/images/home/avatar_1.jpg'
                      alt='Image'
                      width={40}
                      height={40}
                      quality={100}
                      className='rounded-full border-2 border-purple_blue/20 cursor-pointer transition-transform group-hover:scale-110'
                    />
                    <p className='absolute w-fit text-sm text-center z-10 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 bg-white dark:bg-dark_black text-dark_black dark:text-white p-2 min-w-32 rounded-xl shadow-2xl top-full left-1/2 transform -translate-x-1/2 mt-4 border border-dark_black/5 dark:border-white/5'>
                      {user?.user || session?.user?.name}
                    </p>
                  </div>
                </div>
              ) : (
                <div className='flex items-center gap-4'>
                  <Link
                    href={'/contact'}
                    className='hidden lg:flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white bg-purple_blue rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-md shadow-purple_blue/20'>
                    Contact Us
                  </Link>
                </div>
              )}

              {/* ---------------------Light/Dark Mode button-------------------- */}
              <div className='bg-dark_black/5 dark:bg-white/5 p-1.5 rounded-full'>
                <ThemeToggler />
              </div>

              {/* Mobile Menu Toggle */}
              <div className='lg:hidden'>
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className='p-2 text-dark_black dark:text-white bg-dark_black/5 dark:bg-white/5 rounded-full transition-colors hover:bg-dark_black/10'
                  aria-label='Toggle menu'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'>
                    <path
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeMiterlimit='10'
                      strokeWidth='2'
                      d='M4.5 12h15m-15 5.77h15M4.5 6.23h15'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </nav>
        </div>

      </header>

      {/* ------------------------- Mobile Fullscreen Nav ------------------------- */}
      <div
        className={`lg:hidden fixed inset-0 z-[90] transition-all duration-500 ${sidebarOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
          }`}>

        {/* Background */}
        <div className='absolute inset-0 bg-white/[0.97] dark:bg-dark_black/[0.97] backdrop-blur-2xl' />

        {/* Decorative blobs */}
        <div className='absolute top-0 right-0 w-72 h-72 bg-purple_blue/[0.07] dark:bg-purple_blue/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3' />
        <div className='absolute bottom-0 left-0 w-56 h-56 bg-purple_blue/[0.04] dark:bg-purple_blue/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4' />

        {/* Content wrapper */}
        <div className='relative h-full flex flex-col'>

          {/* Top bar */}
          <div className='flex items-center justify-between px-6 py-5'>
            <div className='flex items-center gap-3'>
              <Image
                src="/images/logo/logo.png"
                alt="HABB logo"
                width={100}
                height={30}
                quality={100}
                className="h-auto w-[90px] dark:hidden"
              />
              <Image
                src="/images/logo/DarkModeLogo.png"
                alt="HABB logo dark"
                width={100}
                height={30}
                quality={100}
                className="h-auto w-[90px] hidden dark:block"
              />
              <div className='flex items-center gap-2 bg-purple_blue/10 border border-purple_blue/20 rounded-full px-3.5 py-1.5'>
                <div className='w-1.5 h-1.5 rounded-full bg-purple_blue animate-pulse' />
                <span className='text-xs font-bold text-purple_blue uppercase tracking-widest'>Menu</span>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className='w-10 h-10 flex items-center justify-center rounded-full bg-dark_black/5 dark:bg-white/5 border border-dark_black/10 dark:border-white/10 text-dark_black/60 dark:text-white/60 hover:text-dark_black dark:hover:text-white hover:bg-dark_black/10 dark:hover:bg-white/10 transition-all duration-300'
              aria-label='Close mobile menu'>
              <Icon icon='solar:close-circle-linear' width='22' height='22' />
            </button>
          </div>

          {/* Divider */}
          <div className='mx-6 h-px bg-gradient-to-r from-transparent via-dark_black/10 dark:via-white/10 to-transparent' />

          {/* Nav links */}
          <div className='flex-1 overflow-y-auto no-scrollbar px-6 pt-6 pb-4'>
            <nav>
              {menuData?.map((item, index) => (
                <MobileHeader key={index} item={item} index={index} onNavigate={() => setSidebarOpen(false)} />
              ))}
            </nav>

            {/* User section */}
            <div className='mt-8'>
              {user || session?.user ? (
                <div className='space-y-3'>
                  <div className='flex items-center gap-3 p-3 rounded-2xl bg-dark_black/[0.03] dark:bg-white/5 border border-dark_black/[0.06] dark:border-white/[0.06]'>
                    <Image
                      src='/images/home/avatar_1.jpg'
                      alt='User avatar'
                      width={40}
                      height={40}
                      quality={100}
                      className='rounded-full ring-2 ring-purple_blue/30'
                    />
                    <div className='flex-1 min-w-0'>
                      <p className='text-dark_black dark:text-white text-sm font-semibold capitalize truncate'>
                        {user?.user?.email || session?.user?.name}
                      </p>
                      <p className='text-dark_black/40 dark:text-white/40 text-xs'>Signed in</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      void signOut()
                      setSidebarOpen(false)
                    }}
                    className='w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-dark_black/5 dark:bg-white/5 border border-dark_black/10 dark:border-white/10 text-dark_black/70 dark:text-white/70 text-sm font-medium hover:bg-dark_black/10 dark:hover:bg-white/10 hover:text-dark_black dark:hover:text-white transition-all duration-300'>
                    <Icon icon='solar:logout-outline' width='18' height='18' />
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href='/contact'
                  onClick={() => setSidebarOpen(false)}
                  className='group flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-purple_blue text-white font-bold text-base shadow-lg shadow-purple_blue/20 transition-all duration-300 hover:shadow-purple_blue/40 hover:scale-[1.02] active:scale-[0.98]'>
                  Contact Us
                  <Icon icon='solar:arrow-right-up-linear' className='w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                </Link>
              )}
            </div>
          </div>

          {/* Bottom bar */}
          <div className='px-6 pb-6 pt-2'>
            <div className='h-px bg-gradient-to-r from-transparent via-dark_black/10 dark:via-white/10 to-transparent mb-4' />
            <div className='flex items-center justify-between'>
              <p className='text-dark_black/30 dark:text-white/30 text-xs font-medium'>&copy; {new Date().getFullYear()} HABB</p>
              <div className='flex items-center gap-1'>
                <ThemeToggler />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
