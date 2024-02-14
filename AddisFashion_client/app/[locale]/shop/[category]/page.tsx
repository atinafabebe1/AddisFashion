import MainLayout from '../../(root)/layout'
import Product from '@/components/Product/Product'
import { ProductProvider } from '@/context/ProductContext'
import React from 'react'

function page() {
  return (
    <MainLayout>
      <div>
        <ProductProvider>
          <Product />
        </ProductProvider>
      </div>
    </MainLayout>
  )
}

export default page
