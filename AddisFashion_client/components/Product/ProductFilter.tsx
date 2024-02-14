'use client'
import React from 'react'
import CustomButton from '../CustomButton'

const ProductFilter: React.FC = () => {
  const handleButtonClick = (category: string) => {
    // Add logic to handle button click for the selected category
    console.log(`Filter by ${category}`)
  }

  const categories = [
    { title: 'New In' },
    { title: 'Trending' },
    { title: 'Sale' },
    { title: 'Jeans' },
  ]

  return (
    <div className="bg-white pt-12 pb-8">
      <div className="container mx-auto text-center">
        <p className="text-3xl font-bold mb-4">Explore Trends</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map((category, index) => (
            <CustomButton
              key={index}
              title={category.title}
              containerStyles={`w-full py-2 text-black rounded-md border border-1 border-gray-300 ${
                index === 0 ? 'bg-black text-white' : 'bg-white'
              } hover:bg-gray-200 hover:text-black focus:outline-none focus:ring focus:border-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md`}
              handleClick={() => handleButtonClick(category.title)}
              btnType="button"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductFilter
