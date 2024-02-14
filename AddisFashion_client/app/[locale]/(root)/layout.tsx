import '../globals.css'
import Navbar from '@/components/Header/Navbar'
import Footer from '@/components/Footer'
import GiftBanner from '@/components/Header/GiftBanner'
import { SearchResultProvider } from '@/context/SearchResultContext'
import { CartProvider } from '@/context/cartContext'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="relative">
        <SearchResultProvider>
        <GiftBanner />
          <Navbar />
        {children}
        <Footer />
        </SearchResultProvider>
      </body>
    </html>
  )
}
