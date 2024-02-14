'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CustomButton from './CustomButton'
import { useTranslations } from 'next-intl'

const Hero = () => {
  const nextSectionRef = useRef<HTMLDivElement>(null)
  const t =useTranslations('HeroSection')

  const handleScroll = () => {
    if (nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      className="hero relative bg-gradient-to-b from-black to-gray-900 text-white py-6 md:py-6 lg:py-6"
      role="banner"
    >
      <header className="container mx-auto flex flex-row sm:flex-row items-center justify-center">
        {/* Image Section */}
        <div className="md:w-1/2 lg:w-1/3 mb-6 md:mb-0 order-2 md:order-1">
          <div className="rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="/logg.png"
              alt="Luxury Fashion Hero"
              layout="responsive"
              width={20}
              height={40}
              className="object-cover object-center rounded-lg sm:mx-0 mx-auto"
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="sm:w-1/2 lg:w-2/3 order-1 sm:order-2 text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-2">
            {t("heading")}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg mb-4">
            {t("paragraph")}

          </p>
          <Link href="/shop">
            <CustomButton
              title={t('button')}
              containerStyles="bg-blue-500 btn-primary p-2 px-6"
              handleClick={handleScroll}
              btnType="button"
            />
          </Link>
        </div>
      </header>

      {/* Next Section Anchor */}
      <div id="discover" ref={nextSectionRef}></div>
    </div>
  )
}

export default Hero
