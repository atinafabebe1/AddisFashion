'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductList from './ProductList'
import { DetailProps } from '@/types'
import { usePathname } from 'next/navigation'

export default function Product() {
  const [category, setCategory] = useState<string>('women')
  const [productDetails, setProductDetails] = useState<DetailProps[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const pathname = usePathname()

  useEffect(() => {
    
    const pathParts = pathname.split('/').filter(Boolean)
    if(pathParts[pathParts.length-1]=="en" ||pathParts[pathParts.length-1]=="am" ){
      setCategory('women')
    }else if (pathParts.length > 0) {
      setCategory(pathParts[pathParts.length - 1])
    }

    const fetchData = async () => {
      setLoading(true)
      try {
        console.log(category)
        const response = await axios.get(
          `http://localhost:3101/api/product/get?category=${category}`,
        )
        setProductDetails(response.data.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [category])

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2 className="mt-10 font-extrabold  uppercase text-3xl px-24 py-8">{`${category}'S`}</h2>
          <ProductList details={productDetails} />
        </>
      )}
    </div>
  )
}
