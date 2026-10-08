"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowRight, Check, Truck } from "lucide-react"
import { Market, isMarket } from "@/lib/data"

export default function ConfirmationPage() {
  const params = useParams()
  const market = (isMarket(params.market as string) ? params.market : "ng") as Market

  return (
    <main className="mx-auto max-w-2xl px-5 py-20 text-center">
      <span className="mx-auto grid size-20 place-items-center rounded-full bg-[#dcebdd] text-[#315b3f]"><Check size={36} strokeWidth={3} /></span>
      <span className="mt-6 block text-xs font-extrabold uppercase tracking-[0.17em] text-[#ff5c35]">Order received</span>
      <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.045em] sm:text-5xl">Great things are about to be made.</h1>
      <p className="mx-auto mt-5 max-w-lg leading-7 text-black/55">This is a mock confirmation. In the real flow, your creative partner would be in touch within one business day.</p>
      <div className="mx-auto mt-8 flex max-w-md items-center gap-4 rounded-2xl bg-white p-4 text-left ring-1 ring-black/8">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#f2d278]/40"><Truck size={20} /></span>
        <div>
          <strong className="text-sm">What happens next?</strong>
          <p className="mt-1 text-xs leading-5 text-black/50">We will review the brief, confirm timing and send your first update.</p>
        </div>
      </div>
      <Link href={`/${market}`} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#181a16] px-6 py-3.5 text-sm font-extrabold text-white">Back to services <ArrowRight size={17} /></Link>
    </main>
  )
}