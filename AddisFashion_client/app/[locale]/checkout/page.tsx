import Checkout from "@/components/checkout/Checkout"
import MainLayout from "../(root)/layout"

function page() {
  return (
    <div>
      <MainLayout>
        <div className="p-8">
        <Checkout/>
        </div>
      </MainLayout>
    </div>
  )
}

export default page
