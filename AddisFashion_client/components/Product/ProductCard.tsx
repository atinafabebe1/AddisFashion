'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { DetailProps } from '@/types'
import Link from 'next/link'
import { useProduct } from '../../context/ProductContext'
import { useCart } from '@/context/cartContext'

interface ProductCardProps {
  detail: DetailProps
  index: number
}

export default function ProductCard({ detail, index }: ProductCardProps) {
  const [hoverState, setHoverState] = useState(false)
  const [isFavorite, setFavorite] = useState(false)
  const { setCart } = useProduct()
  const {addToCart} =useCart();

  const handleMouseEnter = () => {
    setHoverState(true)
  }

  const handleMouseLeave = () => {
    setHoverState(false)
  }
  const handleFavoriteClick = () => {
    setFavorite(!isFavorite)
  }
  const handleAddToCart = () => {
    addToCart({
      id: detail.id,
      name: detail.name,
      price: detail.price,
      quantity: 1,
      image:detail.images[0]
    })
  }

  return (
    <div className="flex flex-wrap w-full h-full items-center justify-center">
      <div
        key={detail.id}
        className="my-2 w-[250px]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex relative justify-center border-1 border ">
          <Link href={`products/${detail.id}`} className="w-full h-auto">
            <div className="w-full h-[350px]">
              <Image
                src={detail.images[0]}
                alt="image"
                width={400}
                height={400}
                className="w-full h-full object-cover cursor-pointer"
              />
            </div>
          </Link>

          {hoverState && (
            <button
              onClick={() => handleAddToCart()}
              className="absolute top-72 px-14 py-3 flex items-center justify-center text-white bg-black text-sm font-semibold rounded-full hover:bg-gray-800 z-50 whitespace-nowrap"
            >
              Add to Cart
            </button>
          )}
        </div>
        <div className="flex flex-col ">
          <div className="flex flex-col">
            <div className="flex justify-between mt-2 gap-2 items-center">
              <p className="text-xs w-4/5 align-middle font-light">
                {detail.description}
              </p>
              <p className="w-1/5 pl-6 cursor-pointer hover:text-black">
                <MdOutlineFavoriteBorder
                  size={20}
                  className={`hover:text-black ${
                    isFavorite ? 'text-red-600' : ''
                  }`}
                />
              </p>
            </div>
            <div className="flex h-5 items-center text-sm justify-start gap-2">
              <p className="uppercase text-lg text-red-700">
                Birr <span className="font-bold">{detail.price}</span>
              </p>
              {detail.price && (
                <p className="text-xs line-through text-gray-500">
                  Birr <span>{detail.price}</span>
                </p>
              )}
            </div>
            {detail.price && (
              <div className="flex text-sm mt-1 font-normal text-red-700">
                <p className="w-full">{detail.price}</p>
              </div>
            )}
          </div>
          <div className="flex mt-2">
            {JSON.parse(detail.colorsAvailable[0]).map(
              (color: any, index: React.Key | null | undefined) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: color,
                    width: '20px',
                    height: '20px',
                    borderRadius: '10px',
                    marginRight: '5px',
                  }}
                ></div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
