import React from 'react'
import { Link } from '@/navigation'
import { navbarLinks } from '@/constants'
import { SubMenuProps } from '@/types'
import { useTranslations } from 'next-intl'

export default function SubMenu({ selectedItem }: SubMenuProps) {
  const defaultChildren =
    navbarLinks.find((item) => item.children && item.children.length > 0)
      ?.children ?? []
  const displayChildren = selectedItem?.children || defaultChildren
  const t = useTranslations('NavbarLinks')

  return (
    <div className="absolute top-full left-0 w-full bg-white border shadow-lg font-medium flex flex-row z-10">
      {displayChildren.map((child) => (
        <Link href={child.url} key={child.title}>
          <div className="cursor-pointer text-gray-800 hover:text-black py-2 px-4 flex-shrink-0">
            {selectedItem && child.title
            }
            {!selectedItem && t(`categories.Women.children.${child.title}.title`)}
          </div>
        </Link>
      ))}
    </div>
  )
}
