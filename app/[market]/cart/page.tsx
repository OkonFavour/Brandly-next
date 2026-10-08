"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, ArrowRight, Minus, Plus, ShieldCheck, ShoppingBag, Trash2 } from "lucide-react"
import { Market, formatPrice, isMarket } from "@/lib/data"
import { useCart } from "@/context/cart"
import { ReactNode } from "react"

function OrderSummary({ market, subtotal, tax, action }: { market: Market; subtotal: number; tax: number; action: ReactNode }) {
  return (
    <aside className="h-fit rounded-3xl bg-[#202c24] p-6 text-white lg:sticky lg:top-24">
      <h2 className="text-xl font-extrabold">Order summary</h2>
      <div className="mt-6 grid gap-3 text-sm">
        <div className="flex justify-between text-white/65"><span>Subtotal</span><span>{formatPrice(subtotal, market)}</span></div>
        <div className="flex justify-between text-white/65"><span>Estimated tax</span><span>{formatPrice(tax, market)}</span></div>
        <div className="flex justify-between text-white/65"><span>Delivery</span><span className="font-bold text-[#f2d278]">Calculated later</span></div>
      </div>
      <div className="mt-5 flex items-end justify-between border-t border-white/15 pt-5">
        <strong>Total</strong>
        <strong className="text-2xl">{formatPrice(subtotal + tax, market)}</strong>
      </div>
      {action}
      <p className="mt-4 flex items-center justify-center gap-2 text-[11px] text-white/50"><ShieldCheck size={14} /> No payment required in this demo</p>
    </aside>
  )
}

export default function CartPage() {
  const params = useParams()
  const market = (isMarket(params.market as string) ? params.market : "ng") as Market
  const cart = useCart()
  const subtotal = cart.items.reduce((total, item) => total + item.service.price * item.quantity, 0)
  const tax = subtotal * 0.075

  if (cart.items.length === 0) return (
    <main className="mx-auto max-w-3xl px-5 py-20 text-center">
      <span className="mx-auto grid size-20 place-items-center rounded-3xl bg-[#e9e8e2]"><ShoppingBag size={32} /></span>
      <h1 className="mt-7 text-4xl font-extrabold tracking-[-0.04em]">Your cart is ready for an idea.</h1>
      <p className="mx-auto mt-3 max-w-md leading-7 text-black/55">Explore creative services, print and brand goods.</p>
      <Link href={`/${market}`} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#ff5c35] px-6 py-3.5 text-sm font-extrabold text-white">Explore services <ArrowRight size={17} /></Link>
    </main>
  )

  return (
    <main className="mx-auto max-w-[1200px] px-5 pb-20 pt-10 lg:px-8">
      <Link href={`/${market}`} className="inline-flex items-center gap-2 text-sm font-bold text-black/55 hover:text-black"><ArrowLeft size={16} /> Continue shopping</Link>
      <h1 className="mt-6 text-4xl font-extrabold tracking-[-0.045em]">Your cart <span className="text-black/25">({cart.items.length})</span></h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <section className="grid content-start gap-4" aria-label="Cart items">
          {cart.items.map((item) => (
            <article key={item.key} className="grid grid-cols-[100px_1fr] gap-4 rounded-2xl border border-black/8 bg-white p-3 sm:grid-cols-[140px_1fr] sm:p-4">
              <img src={item.service.image} alt="" className="aspect-square w-full rounded-xl object-cover" />
              <div className="flex min-w-0 flex-col justify-between py-1">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#ff5c35]">{item.service.category}</span>
                      <h2 className="mt-1 truncate font-extrabold sm:text-lg">{item.service.name}</h2>
                    </div>
                    <button onClick={() => cart.remove(item.key)} className="grid size-8 shrink-0 place-items-center rounded-lg text-black/40 hover:bg-red-50 hover:text-red-600" aria-label={`Remove ${item.service.name}`}><Trash2 size={17} /></button>
                  </div>
                  <p className="mt-1 text-xs text-black/50">{item.service.optionLabel}: {item.option}</p>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex h-9 items-center rounded-lg border border-black/10">
                    <button onClick={() => cart.update(item.key, item.quantity - 1)} className="grid size-8 place-items-center" aria-label="Decrease"><Minus size={14} /></button>
                    <span className="w-7 text-center text-xs font-bold">{item.quantity}</span>
                    <button onClick={() => cart.update(item.key, item.quantity + 1)} className="grid size-8 place-items-center" aria-label="Increase"><Plus size={14} /></button>
                  </div>
                  <strong>{formatPrice(item.service.price * item.quantity, market)}</strong>
                </div>
              </div>
            </article>
          ))}
        </section>
        <OrderSummary market={market} subtotal={subtotal} tax={tax} action={
          <Link href={`/${market}/checkout`} className="mt-5 flex h-13 items-center justify-center gap-2 rounded-xl bg-[#ff5c35] text-sm font-extrabold text-white transition hover:bg-[#e34b27]">Review checkout <ArrowRight size={17} /></Link>
        } />
      </div>
    </main>
  )
}