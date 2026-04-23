'use client'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
// Social sign-in UI removed per request
import Loader from '../../shared/loader'
import Logo from '../../layout/header/Logo'

const Signin = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  }) //login data state
  const [authError, setAuthError] = useState<string | null>(null)


  // form handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: loginData.email,
        password: loginData.password,
      })

      if (result?.error) {
        setAuthError('Invalid credentials')
        toast.error('Invalid credentials')
      } else {
        setAuthError(null)
        toast.success('Signed in')
        router.push('/dashboard')
      }
    } catch (error) {
      setAuthError('Something went wrong. Please try again.')
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <div className='relative w-full pt-44 2xl:pb-20 pb-10 before:absolute before:w-full before:h-full before:bg-linear-to-r before:from-blue_gradient before:via-white before:to-yellow_gradient before:rounded-full before:top-24 before:blur-3xl  before:-z-10 dark:before:from-dark_blue_gradient dark:before:via-black dark:before:to-dark_yellow_gradient dark:before:rounded-full dark:before:blur-3xl dark:before:-z-10'>
        <div className='container'>
            {authError && (
              <div className='fixed inset-0 z-50 flex items-center justify-center'>
                <div
                  className='absolute inset-0 bg-black/50'
                  onClick={() => setAuthError(null)}
                />
                <div className='relative z-10 w-full max-w-xl rounded-lg bg-white p-6 shadow-lg dark:bg-dark_black'>
                  <div className='flex items-start gap-4'>
                    <div className='text-4xl'>🤭</div>
                    <div>
                      <h3 className='text-xl font-semibold'>Hey, you are not admin</h3>
                      <p className='mt-1 text-sm text-gray-700 dark:text-gray-300'>This door is for HABB heroes only — try another account or go back.</p>
                      <div className='mt-4 flex gap-3'>
                        <button
                          onClick={() => router.push('/')}
                          className='rounded-full bg-dark_black px-5 py-2 text-sm font-semibold text-white shadow-md transition-colors duration-200 hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'>
                          Go Back
                        </button>
                        <button
                          onClick={() => setAuthError(null)}
                          className='rounded-full border border-stroke px-4 py-2 text-sm font-medium transition-colors duration-200 hover:bg-dark_black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark_black'>
                          Try Again
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          <div className='-mx-4 flex flex-wrap'>
            <div className='w-full px-4'>
              <div className='relative shadow-lg mx-auto max-w-32 overflow-hidden rounded-lg bg-white dark:bg-dark_black px-8 py-14 text-center sm:px-12 md:px-16'>
                <div className='mb-10 flex justify-center'>
                  <Logo />
                </div>

                {/* Social sign-in removed */}

                <form onSubmit={handleSubmit}>
                  <div className='mb-5 text-left'>
                    <input
                      name='email'
                      type='email'
                      placeholder='Email'
                      autoComplete='email'
                      suppressHydrationWarning={true}
                      onChange={(e) => {
                        setLoginData({ ...loginData, email: e.target.value })
                        setAuthError(null)
                      }
                      }
                      className={`w-full rounded-full border px-5 py-3 outline-hidden transition dark:border-white/20 dark:bg-black/40 border-stroke focus:border-dark_black/50 dark:focus:border-white/50 dark:focus:border-opacity-50`}
                    />
                  </div>
                  <div className='mb-5 text-left'>
                    <input
                      name='password'
                      type='password'
                      placeholder='Password'
                      autoComplete='current-password'
                      suppressHydrationWarning={true}
                      onChange={(e) => {
                        setLoginData({ ...loginData, password: e.target.value })
                        setAuthError(null)
                      }
                      }
                      className={`w-full rounded-full border px-5 py-3 outline-hidden transition  dark:border-white/20 dark:bg-black/40 border-stroke focus:border-dark_black/50 dark:focus:border-white/50`}
                    />
                  </div>
                  <div className='mb-9'>
                    <button
                      type='submit'
                      className='flex w-full px-5 py-3 font-medium cursor-pointer items-center justify-center transition duration-300 ease-in-out rounded-full border border-dark_black bg-dark_black hover:bg-white dark:hover:bg-white/20 dark:bg-white text-white dark:hover:text-white hover:text-dark_black dark:text-dark_black '>
                      Sign In {loading && <Loader />}
                    </button>
                  </div>
                </form>

                {/* Forget Password link removed */}
                {/* Signup option removed — only admin/credentials login allowed */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signin
