import React, { useEffect } from 'react'
import ProductCard from './ProductCard'
import { DetailsProps } from '@/types'

export default function ProductList({ details }: DetailsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 px-24">
      {details.map((detail, index) => (
        <>
        {console.log(details)}
          <ProductCard key={detail.id} detail={detail} index={index} />
        </>
      ))}
    </div>
  )
}
