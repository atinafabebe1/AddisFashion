'use client'
import { DetailProps } from '@/types'
import React, { useState } from 'react'
import SizeOptions from './SizeOptions'
import ImageOptions from './ImageOptions'
import Image from 'next/image'

interface ProductDetailProps {
  product: DetailProps
  selectedSize: string
  selectedImage: string
  handleSizeChange: (size: string) => void
  handleImageChange: (image: string) => void
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  selectedSize,
  selectedImage,
  handleSizeChange,
  handleImageChange,
}) => {
  const [loadingImage, setLoadingImage] = useState(false)

  const handleImageClick = (image: string) => {
    setLoadingImage(true)
    handleImageChange(image)
  }

  return (
    <div className="flex items-start justify-center w-full py-4">
      <ImageOptions
        images={product.images}
        selectedImage={selectedImage}
        onSelect={handleImageClick}
      />

      <div className="relative overflow-hidden" style={{ height: '700px' }}>
        <Image
          src={selectedImage}
          alt="Product Image"
          width={560}
          height={300}
          className="object-cover"
        />
      </div>

      <div className="ml-8 flex flex-col justify-start">
        <p className="lowercase text-sm whitespace-nowrap font-inter">
          {product.name}
        </p>
        <div className="flex justify-start">
          <p className="uppercase text-lg text-red-700">
            Birr <span className="font-bold">{product.price}</span>
          </p>
          {product.price && (
            <p className="text-xs line-through text-gray-500">
              Birr <span>{product.price}</span>
            </p>
          )}
        </div>
        {product.price && (
          <div className="flex text-sm mt-1 font-normal text-red-700">
            <p className="w-full">{product.price}</p>
          </div>
        )}
        <div className="mb-6">
          <SizeOptions
            sizes={product.sizeAvailable}
            selectedSize={selectedSize}
            onSelect={handleSizeChange}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
