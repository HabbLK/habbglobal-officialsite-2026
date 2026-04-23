"use client"
import Image from 'next/image'
import { TextGenerateEffect } from '@/app/components/ui/text-generate-effect'

function CustomerStories() {

  return (
    <section>
      <div className="2xl:py-20 py-11">
        <div className="container">
          <div className="flex flex-col justify-center gap-10 md:gap-20">
            <div className="mx-auto max-w-2xl flex items-center text-center">
              <h2>
                <TextGenerateEffect words="What our satisfied customers are saying" />
                <TextGenerateEffect
                  words="about us"
                  delay={1}
                  className="italic font-normal instrument-font"
                />
              </h2>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col xl:flex xl:flex-row gap-6">
                {/* Top Left Box */}
                <div
                  className="p-8 gap-64 rounded-2xl flex flex-col relative bg-[url('/images/home/customerStories/customer_bg_img.jpg')] object-cover bg-center h-full w-full bg-cover bg-no-repeat before:absolute before:inset-0 before:bg-black/50 before:rounded-2xl before:pointer-events-none"
                >
                  <span className="text-white/60 uppercase text-sm font-medium relative z-10">
                    Customer stories
                  </span>
                  <div className="flex flex-col gap-6 relative z-10">
                    <h3 className="text-white">
                      “HABB's engineering transformed our vision into market-ready software!”
                    </h3>
                    <div className="flex flex-col gap-1">
                      <p className="text-white font-medium">Atavinthan Chellappah</p>
                      <p className="text-white/60 text-sm font-medium">
                        Founder of DoubleA Solutions GmbH
                      </p>
                    </div>
                  </div>
                </div>

                {/* Top Right Box */}
                <div
                  className="flex flex-col justify-between gap-36 xl:max-w-25 bg-pale-yellow rounded-2xl p-8"
                >
                  <div>
                    <span className="uppercase text-sm font-medium text-dark_black/60">
                      Facts & numbers
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-7xl font-medium dark:text-dark_black">91%</h2>
                    <h3 className="dark:text-dark_black text-2xl">
                      Clients recommend our design services.
                    </h3>
                  </div>
                </div>
              </div>

              <div className="flex flex-col xl:flex xl:flex-row gap-6">
                {/* Bottom Left Box */}
                <div
                  className="flex flex-col justify-between bg-dark_black xl:max-w-25 dark:bg-white/10 rounded-2xl p-8"
                >
                  <div className="flex flex-col gap-6">
                    <span className="text-white/60 uppercase text-sm font-medium">
                      Customer stories
                    </span>
                    <h3 className="text-white text-2xl">
                      Their creativity and attention to detail transformed our brand completely!
                    </h3>
                    <div>
                      <Image
                        src="/images/home/customerStories/creativity_img.jpg"
                        alt="image"
                        width={344}
                        height={220}
                        className="w-full h-52"
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Right Box */}
                <div
                  className="flex flex-col gap-24 justify-between bg-dark_black/5 dark:bg-white/5 p-8 rounded-2xl"
                >
                  <div className="flex flex-col gap-6">
                    <span className="text-dark_black/60 dark:text-white/60 uppercase text-sm font-medium">
                      Customer stories
                    </span>
                    <h2 className="text-2xl lg:text-5xl">
                      “HABB brought our product to market with technical precision and clear delivery, exceeding expectations.”
                    </h2>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">Atavinthan Chellappah</p>
                    <p className="text-dark_black/60 dark:text-white/60 text-sm font-medium">
                      Founder of DoubleA Solutions GmbH
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomerStories
