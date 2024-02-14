import { StaticImageData } from 'next/image'
import { MouseEventHandler } from 'react'

export interface CustomButtonProps {
  title: string
  containerStyles?: string
  handleClick: MouseEventHandler<HTMLButtonElement>
  btnType: 'button' | 'submit'
}

// types.ts
export interface LinkInter {
  title: string
  url: string
  children?: LinkInter[]
}

export interface DetailProps {
  id: string
  name: string
  description: string
  category: string
  brand: string
  price: string
  sizeAvailable: string[]
  colorsAvailable: string[]
  quantity: number
  discountsPromotions: string
  shippingInformation?: string
  images: string[]
  // images?: any
  // name?: string | undefined
  // sizes?: any
  // id: string | number
  // image: StaticImageData
  // detail: string
  // like: string
  // price: number | string
  // disPrice: string
  // discount: string
  // color: string
}

export interface DetailsProps {
  details: DetailProps[]
}

export interface NavLink {
  title: string
  url: string
  children?: NavLink[]
}

export interface NavItemProps {
  link: NavLink
  setSelectedItem: React.Dispatch<React.SetStateAction<NavLink | null>>
  selectedItem: NavLink | null
}

export interface UserActionsProps {
  selectedItem: NavLink | null
}

export interface SubMenuProps {
  selectedItem: NavLink | null
}

export interface InputFieldProps {
  label: string
  type: string
  id: string
  placeholder: string
  required: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void // Added onChange prop
}

export interface CheckboxProps {
  label: string
  id: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
