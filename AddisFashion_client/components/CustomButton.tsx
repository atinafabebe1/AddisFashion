import React from 'react'
import { CustomButtonProps } from '@/types'

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  containerStyles,
  handleClick,
  btnType,
}) => {
  return (
    <button
      disabled={false}
      type={btnType}
      className={`custom-btn ${containerStyles}`}
      onClick={() => handleClick}
    >
      {title}
    </button>
  )
}

export default CustomButton
