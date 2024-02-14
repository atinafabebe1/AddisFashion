import Image from 'next/image'
import Link from 'next/link'
import { footerLinks } from '@/constants'

const Footer = () => (
  <footer className="flex flex-col bg-primary text-black mt-5 border-t border-gray-100">
    <div className="flex flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
      <div className="flex flex-col justify-start items-start gap-6">
        <Image
          src="/logo_rev.svg"
          alt="logo"
          width={200}
          height={18}
          className="object-contain"
        />
        <p className="text-base text-gray-300">
          AddisMen 2024 <br />
          All Rights Reserved &copy;
        </p>
      </div>

      <div className="grid grid-cols-3 gap-12 mt-6">
        {footerLinks.map((item) => (
          <div key={item.title} className="space-y-4">
            <h3 className="font-bold text-white">{item.title}</h3>
            <ul className="space-y-1">
              {item.links.map((link) => (
                <li key={link.title}>
                  <Link href={link.url} className="text-white hover:underline">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    <div className="flex justify-between items-center mt-10 border-t border-gray-100 sm:px-16 px-6 py-10">
      <p className="text-sm text-gray-500">
        &copy; 2023 AddisMen. All rights reserved
      </p>

      <div className="space-x-8">
        <Link href="/" className="text-gray-500 hover:underline">
          Privacy & Policy
        </Link>
        <Link href="/" className="text-gray-500 hover:underline">
          Terms & Condition
        </Link>
      </div>
    </div>
  </footer>
)

export default Footer
