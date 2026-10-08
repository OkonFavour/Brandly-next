import { redirect } from "next/navigation"
import { isMarket } from "@/lib/data"
import { CartProvider } from "@/context/cart"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default async function MarketLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ market: string }>
}) {
  const { market } = await params
  if (!isMarket(market)) redirect("/ng")

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#f7f7f3] text-[#181a16]">
        <Header market={market} />
        {children}
        <Footer market={market} />
      </div>
    </CartProvider>
  )
}