import React, { useState, useRef, useEffect } from 'react';
import {
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiLogIn,
  FiUserPlus,
  FiGlobe, // Assuming FiGlobe is your icon for language selection
} from 'react-icons/fi';
import { UserActionsProps } from '@/types';
import { AuthProvider } from '@/context/AuthContext';
import DropdownButton from './DropDownButton';
import { Link } from '@/navigation';
import { useCart } from '@/context/cartContext';
import { useRouter } from '@/navigation';

const DropdownLink: React.FC<{
  href: string;
  label: string;
  onClick: () => void;
  icon?: JSX.Element;
}> = ({ href, label, onClick, icon }) => (
  <a
    href={href}
    onClick={onClick}
    className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300"
  >
    {icon && <span className="mr-2">{icon}</span>}
    {label}
  </a>
);

const LanguageDropdown: React.FC<{
  onSelect: (lang: string) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ onSelect, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute top-full m-[-2px] right-0 bg-white border border-gray-200 rounded shadow-md p-2 flex flex-col space-y-2 z-50"
    >
      <div className='flex flex-col items-center px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300'>

      <Link href="/" locale="am">Amharic</Link>
      </div>
      <div className='flex flex-col items-center px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300'>
      <Link href="/" locale="en">English</Link>
      </div>
    </div>
  );
};

export default function UserActions({ selectedItem }: UserActionsProps) {
  const ICON_SIZE = 20;
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isLanguageDropdownVisible, setLanguageDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { cartItems } = useCart();
  const router = useRouter();

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
    setLanguageDropdownVisible(false);
  };

  const handleLanguageDropdownMouseEnter = () => {
    setLanguageDropdownVisible(true);
  };

  const handleLanguageDropdownMouseLeave = () => {
    setLanguageDropdownVisible(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownVisible(false);
      setLanguageDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSignInButtonClicked = () => {
    router.push('/auth/login');
  };

  const handleSignupButtonClicked = () => {
    router.push('/auth/register');
  };
  const handleShoppingCartClick = () => {
    // Add logic to handle shopping cart click
    // For example, redirect to the cart page
    router.push('/cart');
  };

  return (
    <AuthProvider>
      <div className="relative inline-block">
        <div className="flex items-center space-x-6 relative">
          <div className="text-red-600 text-md hover:text-red-700 transition duration-300 cursor-pointer font-extrabold tracking-tight">
            Lives
          </div>
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <FiUser
              className={`text-gray-600 ${
                selectedItem && selectedItem.url === 'user'
                  ? 'text-black'
                  : 'hover:text-black'
              } cursor-pointer`}
              size={ICON_SIZE}
            />
            {isDropdownVisible && (
              <div
                ref={dropdownRef}
                className="absolute m-[-2px] w-60 top-full left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded shadow-md p-2 flex flex-col space-y-2 z-50"
              >
                <DropdownButton
                  label="Sign In"
                  onClick={handleSignInButtonClicked}
                  icon={<FiLogIn size={ICON_SIZE} />}
                />
                <DropdownButton
                  label="Sign Up"
                  onClick={handleSignupButtonClicked}
                  icon={<FiUserPlus size={ICON_SIZE} />}
                />
                <DropdownLink
                  href="/dashboard"
                  label="Dashboard"
                  onClick={() => {}}
                  icon={<FiUser size={ICON_SIZE} />}
                />
                <DropdownLink
                  href="/myorders"
                  label="My Orders"
                  onClick={() => {}}
                  icon={<FiShoppingCart size={ICON_SIZE} />}
                />
                <DropdownLink
                  href="/myinfo"
                  label="My Information"
                  onClick={() => {}}
                  icon={<FiUser size={ICON_SIZE} />}
                />
                <DropdownLink
                  href="/notification"
                  label="Notification"
                  onClick={() => {}}
                  icon={<FiHeart size={ICON_SIZE} />}
                />
              </div>
            )}
          </div>
          <div onMouseEnter={() => setLanguageDropdownVisible(true)} onMouseLeave={() => setLanguageDropdownVisible(false)}>
            <FiGlobe
              className={`text-gray-600 ${
                selectedItem && selectedItem.url === 'language'
                  ? 'text-black'
                  : 'hover:text-black'
              } cursor-pointer`}
              size={ICON_SIZE}

            />
            {isLanguageDropdownVisible && (
              
              <LanguageDropdown
                onSelect={(lang) => console.log(lang)}
                onMouseEnter={handleLanguageDropdownMouseEnter}
                onMouseLeave={handleLanguageDropdownMouseLeave}
              />            
              )}
          </div>
          <FiHeart
            className={`text-gray-600 ${
              selectedItem && selectedItem.url === 'heart'
                ? 'text-black'
                : 'hover:text-black'
            } cursor-pointer`}
            size={ICON_SIZE}
          />
          <FiShoppingCart
            className={`text-gray-600 ${
              selectedItem && selectedItem.url === 'cart'
                ? 'text-black'
                : 'hover:text-black'
            } cursor-pointer`}
            size={ICON_SIZE}
            onClick={handleShoppingCartClick}
          />
          {cartItems.length > 0 && (
            <div className="absolute -top-2 -right-4 bg-red-500 text-white rounded-full px-2 text-xs">
              {cartItems.length}
            </div>
          )}
          
        </div>
      </div>
    </AuthProvider>
  );
}
