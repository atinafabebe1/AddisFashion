// 'use client'
// import React, { useState } from 'react'

// import MainLayout from '../../(root)/layout'
// import ProductDetail from '@/components/Product/ProductDetail'
// import { DetailProps } from '@/types'
// import one from '../../../assets/one.jpg'
// import two from '../../../assets/one1.jpg'
// import three from '../../../assets/one3.jpg'

// // Define a type for the image import
// type ImageType = { default: string }

// interface PageProps {
//   params: {
//     id: string
//   }
// }

// // Replace this with your actual data fetching logic
// const getProductById = (id: string): DetailProps | undefined => {
//   const sampleProducts: DetailProps[] = [
//     {
//       id: '1',
//       name: 'Helsinki Textured Checker Cropped Jacket - Cream/combo',
//       price: 50,
//       sizes: ['S', 'M', 'L'],
//       images: [one, two, three],
//       image: one,
//       detail: 'Product description goes here',
//       like: '100',
//       disPrice: '$45.00',
//       discount: '10%',
//       color: 'Blue',
//     },
//   ]

//   return sampleProducts.find((product) => product.id == id)
// }

// const Page: React.FC<PageProps> = ({ params }) => {
//   const { id } = params
//   const product: DetailProps | undefined = getProductById(id)
//   if (!product) {
//     // Handle the case where the product is not found
//     return <div>Product not found</div>
//   }

//   const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0])
//   const [selectedImage, setSelectedImage] = useState<string>(product.images[0])

//   const handleSizeChange = (size: string) => {
//     setSelectedSize(size)
//   }

//   const handleImageChange = (image: string) => {
//     setSelectedImage(image)
//   }

//   return (
//     <MainLayout>
//       <div className="max-w-5xl mx-auto p-8  h-auto">
//         <ProductDetail
//           product={product}
//           selectedSize={selectedSize}
//           selectedImage={selectedImage}
//           handleSizeChange={handleSizeChange}
//           handleImageChange={handleImageChange}
//         />
//       </div>
//     </MainLayout>
//   )
// }

// export default Page
import React from 'react'

function page() {
  return (
    <div>
      
    </div>
  )
}

export default page
