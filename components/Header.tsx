"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { ChevronDown, Menu, ShoppingBag, Sparkles, X } from "lucide-react"
import { Market, marketConfig } from "@/lib/data"
import { useCart } from "@/context/cart"

export default function Header({ market }: { market: Market }) {
  const cart = useCart()
  const router = useRouter()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const count = cart.items.reduce((total, item) => total + item.quantity, 0)
  const config = marketConfig[market]

  function switchMarket(next: Market) {
    const nextPath = pathname.replace(/^\/(ng|us|gb|ca)/, `/${next}`)
    router.push(nextPath)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-black/8 bg-[#f7f7f3]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 lg:px-8">
        <Link
          href={`/${market}`}
          className="flex items-center gap-2.5 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5c35]"
          aria-label="Brandly home"
        >
          <span className="grid size-8 place-items-center rounded-[10px] bg-[#ff5c35] text-white">
            <Sparkles size={18} strokeWidth={2.5} />
          </span>
          <span className="text-xl font-extrabold tracking-[-0.04em]">brandly</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold lg:flex" aria-label="Main navigation">
          <Link href={`/${market}?category=Create`} className="transition hover:text-[#ff5c35]">Design services</Link>
          <Link href={`/${market}?category=Prints`} className="transition hover:text-[#ff5c35]">Print & merch</Link>
          <Link href={`/${market}?sort=popularity`} className="transition hover:text-[#ff5c35]">Popular</Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <label className="relative hidden sm:block">
            <span className="sr-only">Select country and currency</span>
            <select
              value={market}
              onChange={(e) => switchMarket(e.target.value as Market)}
              className="h-10 cursor-pointer appearance-none rounded-xl border border-black/10 bg-white pl-3 pr-8 text-xs font-bold outline-none transition hover:border-black/25 focus:ring-2 focus:ring-[#ff5c35]"
            >
              {Object.entries(marketConfig).map(([key, value]) => (
                <option key={key} value={key}>{value.flag} · {value.currency}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-3" size={15} />
          </label>
          <Link
            href={`/${market}/cart`}
            className="relative grid size-10 place-items-center rounded-xl border border-black/10 bg-white transition hover:border-black/25"
            aria-label={`Shopping bag with ${count} items`}
          >
            <ShoppingBag size={19} />
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid min-w-5 place-items-center rounded-full bg-[#ff5c35] px-1 text-[11px] font-bold leading-5 text-white">
                {count}
              </span>
            )}
          </Link>
          <button
            className="grid size-10 place-items-center rounded-xl border border-black/10 bg-white lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav className="border-t border-black/8 bg-white p-5 lg:hidden">
          <div className="grid gap-2 font-semibold">
            <Link href={`/${market}?category=Create`} onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-2.5 hover:bg-black/5">Design services</Link>
            <Link href={`/${market}?category=Prints`} onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-2.5 hover:bg-black/5">Print & merch</Link>
            <label className="mt-2">
              <span className="mb-2 block text-xs text-black/55">Market</span>
              <select
                value={market}
                onChange={(e) => switchMarket(e.target.value as Market)}
                className="w-full rounded-xl border border-black/10 bg-white p-3"
              >
                {Object.entries(marketConfig).map(([key, value]) => (
                  <option key={key} value={key}>{value.label} · {value.currency}</option>
                ))}
              </select>
            </label>
          </div>
        </nav>
      )}
      <span className="sr-only">Current market: {config.label}</span>
    </header>
  )
}