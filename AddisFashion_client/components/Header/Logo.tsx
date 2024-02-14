import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const LOGO_WIDTH = 180
const LOGO_HEIGHT = 40

export default function Logo() {
  return (
    <Link href="/">
      <div className="cursor-pointer">
        <Image
          src="/logo.png"
          alt="Fashion Nova Logo"
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          className="object-contain"
        />
      </div>
    </Link>
  )
}
