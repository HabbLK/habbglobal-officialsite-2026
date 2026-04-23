import { Metadata } from "next";
import Achievements from "./components/home/achievements";
import Brand from "./components/home/brand";
import CreativeMind from "./components/home/creative-mind";
import CustomerStories from "./components/home/customer-stories";
import Faq from "./components/home/faq";
import HeroSection from "./components/home/hero";
import Innovation from "./components/home/innovation";
import OnlinePresence from "./components/home/online-presence";
import Solutions from "./components/home/solution";
// Subscription (events) removed from homepage — now available at /blog
import WebResult from "./components/home/web-result";
import WatermarkLogo from "./components/shared/watermark-logo";

export const metadata: Metadata = {
  title: "HABB — Sri Lanka's Digital Engineering Partner | Your Success, Engineered",
};

import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* ---------------------Hero section Starts-----------------  */}
      <HeroSection />
      {/* ---------------------Hero section Ends-----------------  */}

      {/* ---------------------Brand logo section Starts-----------------  */}
      <Brand />
      {/* ---------------------Brand logo section Ends-----------------  */}

      {/* ---------------------Web result section Starts-----------------  */}
      <WebResult />
      {/* ---------------------Web result section Ends-----------------  */}

      {/* ---------------------Online presence section Starts-----------------  */}
      <OnlinePresence />
      {/* ---------------------Online presence section Ends-----------------  */}
      {/* Brief CTA to Services */}
      <section className="py-24 bg-dark_black text-white relative overflow-hidden">
        <WatermarkLogo size={800} opacity={0.05} rotate={15} grayscale={false} className="brightness-200" />
        <div className="lanka-hero-blob w-96 h-96 bg-purple_blue/20 -left-20 -top-20"></div>
        <div className="container relative z-10 text-center">
          <h2 className="text-white mb-8">Ready to engineer your future?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
            <Link href="/services" className="premium-button">
              Explore Our Services
            </Link>
            <Link href="/about" className="premium-button-secondary border-white/20 text-white hover:bg-white/10">
              Meet the Team
            </Link>
          </div>
        </div>
      </section>

      <div className="bg-neutral-50 dark:bg-neutral-900/50">
        <CustomerStories />
      </div>



      {/* Faq section kept on home for quick answers */}
      <Faq />
    </main>
  )
}
