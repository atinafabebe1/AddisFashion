import Image from 'next/image'
import React from 'react'

interface ImageOptionsProps {
  images: string[]
  selectedImage: string
  onSelect: (image: string) => void
}

const ImageOptions: React.FC<ImageOptionsProps> = ({
  images,
  selectedImage,
  onSelect,
}) => {
  return (
    <div>
      <div className="flex flex-col items-start">
        {images.map((image) => (
          <button
            key={image}
            onClick={() => onSelect(image)}
            className={`border p-1 ${
              selectedImage === image ? 'bg-gray-300' : 'bg-white'
            }`}
          >
            <div className="overflow-hidden">
              <Image
                src={image}
                alt="image"
                width={80}
                height={160}
                objectPosition="top"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ImageOptions
