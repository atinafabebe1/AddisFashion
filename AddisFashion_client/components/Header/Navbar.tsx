'use client'
import React, { useState } from 'react'
import Logo from './Logo'
import NavLinks from './NavLinks'
import SearchBar from './SearchBar/SearchBar'
import UserActions from './UserActions'
import SubMenu from './Submenu'
import { NavLink } from '@/types'
import { FiMenu } from 'react-icons/fi'

const NAVBAR_HEIGHT = '80px'

export default function Navbar() {
  const [selectedItem, setSelectedItem] = useState<NavLink | null>(null)
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="w-full z-10 bg-white shadow-md">
      <nav
        className="max-w-7xl mx-auto flex flex-wrap justify-between items-center sm:px-6 px-6 py-3 relative"
        style={{ height: NAVBAR_HEIGHT }}
      >
        <Logo />

        <div className="w-full sm:w-auto mt-2 sm:mt-0 flex items-center justify-between space-x-4">
          {/* Show hamburger icon for small screens */}
          <div className="sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 focus:outline-none"
            >
              <FiMenu />
            </button>
          </div>

          {/* Regular navigation for larger screens */}
          <div className="hidden sm:flex items-center space-x-6">
            <NavLinks
              setSelectedItem={setSelectedItem}
              selectedItem={selectedItem}
            />
            <SearchBar />
            <UserActions selectedItem={selectedItem} />
          </div>
        </div>

        {/* Responsive burger menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden absolute top-full left-0 w-full bg-white border shadow-lg font-extrabold flex flex-row z-10">
            <NavLinks
              setSelectedItem={setSelectedItem}
              selectedItem={selectedItem}
            />
          </div>
        )}

        {/* SubMenu for larger screens */}
        <SubMenu selectedItem={selectedItem} />
      </nav>
    </header>
  )
}
