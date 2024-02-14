import React from 'react'

interface SizeOptionsProps {
  sizes: string[]
  selectedSize: string
  onSelect: (size: string) => void
}

const SizeOptions: React.FC<SizeOptionsProps> = ({
  sizes,
  selectedSize,
  onSelect,
}) => {
  return (
    <div>
      <p className="text-lg mb-4 font-semibold">Size</p>
      <div className="flex space-x-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={`border px-4 py-2 ${
              selectedSize === size ? 'bg-gray-300' : 'bg-white'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SizeOptions
