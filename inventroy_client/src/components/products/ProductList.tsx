import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TableSort } from '../table/TableSort'

interface ICategory {
  name?: string
}

interface Product {
  id: string
  userId: string
  name: string
  description: string
  category?: ICategory
  brand: string
  price: string
  // sizesAvailable?: string[]
  // colorsAvailable?: string[]
  // images?: string[]
  // availability: boolean
  quantity: number
  // discountsPromotions?: string[]
  // shippingInformation: string
  // customerReviews?: string
  // ratings?: number
  // tagsKeywords?: string[]
  // relatedProducts?: string[]
}

const ProductsComponent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3101/api/product/get',
        )
        console.log(response.data)
        setProducts(response.data.data)
      } catch (error) {
        console.error('Error fetching product data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h2>Products</h2>
      <TableSort productData={products} />
    </div>
  )
}

export default ProductsComponent
