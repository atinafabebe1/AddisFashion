import React from 'react'
import { Link } from '@/navigation'
import { NavItemProps } from '@/types'

const NavItem: React.FC<NavItemProps> = ({
  link,
  setSelectedItem,
  selectedItem,
}) => {
  const hasChildren = link.children && link.children.length > 0

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        setSelectedItem(hasChildren ? link : null)
      }}
    >
      <Link href={link.url}>
        <div className="relative">
          <div
            className={`text-black uppercase text-sm font-extrabold font-inter tracking-tight transition duration-300 ${
              selectedItem && selectedItem.url === link.url
                ? 'text-black'
                : 'group-hover:text-black'
            }`}
          >
            {link.title}
          </div>
          <span
            className={`absolute left-0 right-0 mx-auto h-1 bg-black transform origin-bottom transition-all duration-300 ${
              selectedItem && selectedItem.url === link.url
                ? 'scale-x-100'
                : 'scale-x-0'
            }`}
          />
        </div>
      </Link>
    </div>
  )
}

export default NavItem
