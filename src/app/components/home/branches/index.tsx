import Image from 'next/image'
import Link from 'next/link'
import { TextGenerateEffect } from '@/app/components/ui/text-generate-effect'
import flagSriLanka from '@/assets/flags/Flag_of_Sri_Lanka.svg'
import flagGermany from '@/assets/flags/Flag_of_Germany_(RGB).svg.png'
import flagFrance from '@/assets/flags/Flag_of_France.svg.png'
import flagCanada from '@/assets/flags/Flag_of_Canada_(Pantone).svg'
import flagAustralia from '@/assets/flags/Flag_of_Australia_(converted).svg.png'
import flagSwitzerland from '@/assets/flags/Flag_of_Switzerland_(Pantone).svg'
import flagUK from '@/assets/flags/Flag_of_the_United_Kingdom_(1-2).svg'
import flagIndia from '@/assets/flags/Flag_of_India.svg'

type Branch = {
  image: any
  title: string
  address: string
  map: string
  alt: string
}

const branches: Branch[] = [
  {
    image: flagSriLanka,
    title: 'Sri Lanka – Jaffna',
    address: '218, Brown Road, Jaffna 40000',
    map: 'https://share.google/7S4rnZIUPaEvTAmMk',
    alt: 'Sri Lanka flag',
  },
  {
    image: flagSriLanka,
    title: 'Sri Lanka – Colombo',
    address: 'Janith Dhammika Mawatha, Colombo 10640',
    map: 'https://share.google/La6np0rQEglmeF51y',
    alt: 'Sri Lanka flag',
  },
  {
    image: flagGermany,
    title: 'Germany',
    address: 'Elchbogen 19, 44892 Bochum',
    map: 'https://share.google/CppSQyqrNzXlOUNvx',
    alt: 'Germany flag',
  },
  {
    image: flagFrance,
    title: 'France',
    address: '152 Bd Ney, 75018 Paris',
    map: 'https://share.google/KNa0JyWYpZIg8Q6zn',
    alt: 'France flag',
  },
  {
    image: flagCanada,
    title: 'Canada',
    address: '2225 Markham Rd, Scarborough, ON M1B 2W4',
    map: 'https://share.google/Y0Wm2G1DISAfuELGz',
    alt: 'Canada flag',
  },
  {
    image: flagAustralia,
    title: 'Australia',
    address: '3 Sayer Cres, Gosnells WA 6110',
    map: 'https://share.google/0IVXXeejkpjYI5uri',
    alt: 'Australia flag',
  },
  {
    image: flagSwitzerland,
    title: 'Switzerland',
    address: 'Update coming soon',
    map: '',
    alt: 'Switzerland flag',
  },
  {
    image: flagUK,
    title: 'United Kingdom',
    address: '40 Linden Rd, Luton LU4 9QZ, United Kingdom',
    map: 'https://share.google/asyPUHzru2m0gUGs0',
    alt: 'United Kingdom flag',
  },
  {
    image: flagIndia,
    title: 'India',
    address: 'Church Road, Mogappair, Chennai, Tamil Nadu 600037',
    map: 'https://share.google/XZADCzuCaAjGX6JN3',
    alt: 'India flag',
  },
]

function Branches() {
  return (
    <section id='branches'>
      <div className='2xl:py-20 py-11'>
        <div className='container'>
          <div className='flex flex-col gap-6 text-center items-center'>
            <p className='text-sm uppercase tracking-[0.2em] text-dark_black/60 dark:text-white/60'>HABB | International Branches</p>
            <div className='max-w-2xl text-center'>
              <h2>
                <TextGenerateEffect words="Rooted in Jaffna, growing" duration={0.5} />
                <TextGenerateEffect
                  words=" globally"
                  delay={1}
                  className="italic font-normal instrument-font"
                />
              </h2>

            </div>
            <p className='max-w-3xl text-dark_black/60 dark:text-white/60'>
              HABB operates across continents with one promise: same values, same standards, everywhere.
            </p>
          </div>

          <div className='mt-10 grid gap-5 md:gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {branches.map((branch) => (
              <div
                key={branch.title}
                className='rounded-2xl border border-dark_black/10 dark:border-white/10 bg-white/70 dark:bg-dark_black/70 backdrop-blur shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between'
              >
                <div className='p-5 flex flex-col gap-3'>
                  <div className='flex items-center gap-3 text-lg font-semibold'>
                    <Image src={branch.image} alt={branch.alt} width={32} height={24} className='h-6 w-auto rounded-sm shadow-sm' />
                    <span>{branch.title}</span>
                  </div>
                  <p className='text-sm text-dark_black/70 dark:text-white/70 leading-relaxed'>{branch.address}</p>
                </div>
                <div className='p-5 pt-0'>
                  <Link
                    href={branch.map}
                    target='_blank'
                    rel='noreferrer'
                    className='group inline-flex items-center justify-between w-full rounded-xl border border-orange/30 bg-orange/10 px-4 py-3 text-sm font-semibold text-dark_black dark:text-white hover:border-orange/50 hover:bg-orange/20 transition-colors duration-200'
                  >
                    <span>View on Google Maps</span>
                    <span className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark_black text-white text-xs shadow-sm group-hover:translate-x-0.5 transition-transform duration-150'>
                      <span className='inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-dark_black font-black text-xs'>H</span>
                      HABB
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className='mt-8 text-center text-dark_black/60 dark:text-white/60'>
            <p>Built slow. Built right. Built to last. Not everywhere for show - everywhere for service.</p>
            <p className='mt-1 font-semibold text-dark_black dark:text-white'>HABB - global work, grounded values.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Branches
