import React from 'react';
import { navbarLinks } from '@/constants';
import NavItem from './NavItem';
import { NavLink } from '@/types';
import { useTranslations } from 'next-intl';

interface NavLinksProps {
  setSelectedItem: React.Dispatch<React.SetStateAction<NavLink | null>>;
  selectedItem: NavLink | null;
}

const NavLinks: React.FC<NavLinksProps> = ({
  setSelectedItem,
  selectedItem,
}) => {
  const t = useTranslations('NavbarLinks');
  return (
    <div className="hidden sm:flex space-x-4 ml-2">
      {navbarLinks.map((link) => (
        <NavItem
          key={link.title}
          link={{
            title: t(`categories.${link.title}.title`),
            url: link.url,
            children: link.children?.map((child) => ({
              title: t(`categories.${link.title}.children.${child.title}.title`),
              url: child.url,
            })),
          }}
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
        />
      ))}
    </div>
  );
};

export default NavLinks;
