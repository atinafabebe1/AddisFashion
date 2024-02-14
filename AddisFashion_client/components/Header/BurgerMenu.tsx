import React from 'react'
import { FiMenu } from 'react-icons/fi'
interface BurgerMenuProps {
  onClick: () => void
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ onClick }) => {
  return (
    <div className="cursor-pointer" onClick={onClick}>
      <FiMenu />
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </div>
  )
}

export default BurgerMenu
