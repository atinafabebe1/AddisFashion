'use client'

import React, { useEffect, useState } from 'react'
import { BiSearch, BiCamera } from 'react-icons/bi'
import ImageUploadModal from '../ImageUpload/ImageUploadModal'
import { useRouter } from '@/navigation'
import {
  useSearchResult,
} from '@/context/SearchResultContext'

const SearchBar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()
  const { setResult } = useSearchResult()
  const { result: resultOne } = useSearchResult()

  const handleSearchByImage = () => {
    setIsModalOpen(true)
  }

  const handleImageUpload = (file: File) => {
    console.log('Uploaded file:', file)

    const formData = new FormData()
    formData.append('image', file)

    fetch('http://localhost:8000/search_similar_products/', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((result) => {
        setResult(result.similar_images)
      })
      .catch((error) => {
        console.error('Error searching for similar products:', error)
      })

    setIsModalOpen(false)
  }
  useEffect(() => {
    // Check if resultOne is truthy before navigating
    if (resultOne) {
      console.log("result in the search component ",resultOne)
      router.push('/search_result')
    }
  }, [resultOne, router])
  return (
    <div>
      <div className="relative flex items-center rounded-full bg-white border border-gray-300 focus-within:shadow-md transition duration-300">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <BiSearch size={20} />
        </div>
        <input
          type="text"
          placeholder="Search"
          className="px-12 py-2 w-80 bg-transparent focus:outline-none"
        />
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
          onClick={handleSearchByImage}
        >
          <BiCamera size={20} />
        </button>
      </div>
      {isModalOpen && (
        <ImageUploadModal
          onClose={() => setIsModalOpen(false)}
          onImageUpload={handleImageUpload}
        />
      )}
    </div>
  )
}

export default SearchBar
