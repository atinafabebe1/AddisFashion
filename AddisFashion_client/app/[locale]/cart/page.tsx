import CartPage from "@/components/Cart/Cart"
import MainLayout from "../(root)/layout"

function page() {
  return (
      <MainLayout>
        <div className="p-8">
            <CartPage/>
          </div>    
      </MainLayout>
  )
}

export default page
