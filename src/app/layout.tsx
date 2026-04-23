import './globals.css'
import Header from './components/layout/header'
import Footer from './components/layout/footer/Footer'
import Providers from '../providers/Provider'
import { Metadata } from 'next'
import CookieConsent from './components/shared/CookieConsent'

export const metadata: Metadata = {
  title: 'HABB - Sri Lanka\'s Digital Engineering & Software Solutions Partner',
  description: 'HABB is a Sri Lanka-based digital engineering partner specialising in web, mobile, cloud and AI solutions. We design and build secure, scalable products with focus on reliability and rapid time-to-market.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body suppressHydrationWarning>
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          {/* Enhanced Floating WhatsApp Button */}
          <div className="fixed bottom-6 right-6 z-20 group">
            <a
              href="https://api.whatsapp.com/send/?phone=%2B94701111055&text=Hello%2C%20I%27m%20interested%20in%20HABB.%20I%20visited%20your%20website%20and%20would%20like%20to%20learn%20more%20about%20your%20services."
              target="_blank"
              rel="noreferrer"
              className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white rounded-full shadow-2xl transition-all duration-500 transform hover:scale-110 hover:rotate-12 animate-pulse"
              title="Chat with HABB on WhatsApp"
              aria-label="Chat with HABB on WhatsApp"
              style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="drop-shadow-lg"
              >
                <path d="M13.601 2.326A7.994 7.994 0 0 0 8.001 0C3.582 0 0 3.582 0 8c0 1.409.369 2.722 1.006 3.875L0 16l4.219-1.104A7.964 7.964 0 0 0 8.001 16c4.418 0 8-3.582 8-8a7.96 7.96 0 0 0-2.399-5.674zM8.001 14.5a6.455 6.455 0 0 1-3.396-.946l-.243-.144-2.502.654.668-2.438-.158-.25a6.469 6.469 0 0 1-.999-3.376c0-3.584 2.916-6.5 6.5-6.5 1.737 0 3.367.675 4.598 1.902A6.465 6.465 0 0 1 14.501 8c0 3.584-2.916 6.5-6.5 6.5z" />
                <path d="M11.603 9.61c-.173-.087-1.02-.502-1.178-.558-.157-.058-.272-.087-.387.087-.115.173-.445.558-.546.673-.101.115-.202.13-.375.043-.173-.087-.729-.268-1.39-.856-.514-.46-.86-1.03-.961-1.203-.101-.173-.011-.267.076-.354.078-.077.173-.202.26-.303.087-.101.115-.173.173-.288.058-.115.029-.216-.014-.303-.043-.087-.387-.93-.531-1.272-.14-.336-.281-.29-.387-.295-.101-.006-.216-.007-.331-.007-.115 0-.303.043-.46.216-.157.173-.616.601-.616 1.463s.63 1.698.717 1.812c.087.115 1.24 1.896 3.005 2.657.42.181.748.29 1.003.371.421.134.804.115 1.106.07.337-.05 1.02-.417 1.164-.82.144-.403.144-.748.101-.82-.043-.072-.158-.115-.331-.202z" />
              </svg>
              {/* Tooltip */}
              <span className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                Chat with us!
              </span>
            </a>
            {/* Ripple effect (non-interactive so it doesn't block the button) */}
            <div className="absolute inset-0 rounded-full bg-green-400 opacity-20 animate-ping pointer-events-none"></div>
          </div>
          <CookieConsent />
        </Providers>
      </body>
    </html>
  )
}
