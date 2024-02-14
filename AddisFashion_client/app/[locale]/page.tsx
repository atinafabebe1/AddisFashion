import Hero from '@/components/Hero'
import Product from '@/components/Product/Product'
import MainLayout from './(root)/layout'
import ProductFilter from '@/components/Product/ProductFilter'
import { ProductProvider } from '@/context/ProductContext'

export default function Home() {
  return (
    <MainLayout>
      <main className="overflow-hidden">
            <Hero />
        <ProductFilter />
        <ProductProvider>
          <Product />
        </ProductProvider>
      </main>
    </MainLayout>
  )
}
