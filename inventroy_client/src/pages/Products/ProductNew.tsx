import ProductForm from '../../components/products/productForm'
// import productService from '../../api/product_service_api'

function ProductNew() {
  // const handleFormSubmit = async (formData: unknown) => {
  //   console.log(formData)
  //   try {
  //     const createdProduct = await productService.createProduct(formData)
  //     console.log('Product created successfully:', createdProduct)
  //   } catch (error) {
  //     console.error('Error creating product:', error)
  //   }
  // }

  return (
    <div>
      <h2 style={{ margin: '20px' }}>Add New Product</h2>
      <ProductForm
      // onSubmit={handleFormSubmit}
      />
    </div>
  )
}

export default ProductNew
