import Link from "next/link"
import { Sparkles } from "lucide-react"
import { Market, marketConfig } from "@/lib/data"

export default function Footer({ market }: { market: Market }) {
  return (
    <footer className="border-t border-black/8 bg-[#f0efe9]">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="sm:col-span-2">
          <div className="flex items-center gap-2 font-extrabold">
            <span className="grid size-7 place-items-center rounded-lg bg-[#ff5c35] text-white">
              <Sparkles size={15} />
            </span>{" "}
            brandly
          </div>
          <p className="mt-3 max-w-sm text-sm leading-6 text-black/50">
            A better way to make everything your brand needs—beautifully, reliably, all in one place.
          </p>
        </div>
        <div>
          <h2 className="text-xs font-extrabold uppercase tracking-[0.14em]">Explore</h2>
          <div className="mt-3 grid gap-2 text-sm text-black/55">
            <Link href={`/${market}?category=Create`}>Design</Link>
            <Link href={`/${market}?category=Prints`}>Print</Link>
            <Link href={`/${market}?category=Gifts`}>Brand gifts</Link>
          </div>
        </div>
        <div>
          <h2 className="text-xs font-extrabold uppercase tracking-[0.14em]">Help</h2>
          <div className="mt-3 grid gap-2 text-sm text-black/55">
            <span>How it works</span>
            <span>Quality promise</span>
            <span>Contact us</span>
          </div>
        </div>
      </div>
      <div className="border-t border-black/8 px-5 py-5 text-center text-xs text-black/40">
        © 2025 Brandly. Made for growing brands.
      </div>
    </footer>
  )
}