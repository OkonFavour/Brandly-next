"use client"
import { FormEvent, ReactNode } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react"
import { Market, formatPrice, isMarket } from "@/lib/data"
import { useCart } from "@/context/cart"

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder: string }) {
  return (
    <label className="block text-xs font-bold">
      {label}
      <input required name={name} type={type} placeholder={placeholder} className="mt-2 h-12 w-full rounded-xl border border-black/12 bg-[#fbfbf8] px-4 text-sm font-medium outline-none transition focus:border-[#ff5c35] focus:ring-2 focus:ring-[#ff5c35]/20" />
    </label>
  )
}

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
        <strong>Total</strong><strong className="text-2xl">{formatPrice(subtotal + tax, market)}</strong>
      </div>
      {action}
      <p className="mt-4 flex items-center justify-center gap-2 text-[11px] text-white/50"><ShieldCheck size={14} /> No payment required in this demo</p>
    </aside>
  )
}

export default function CheckoutPage() {
  const params = useParams()
  const market = (isMarket(params.market as string) ? params.market : "ng") as Market
  const cart = useCart()
  const router = useRouter()
  const subtotal = cart.items.reduce((total, item) => total + item.service.price * item.quantity, 0)
  const tax = subtotal * 0.075

  if (!cart.items.length) { router.replace(`/${market}/cart`); return null }

  function confirm(e: FormEvent) {
    e.preventDefault()
    cart.clear()
    router.push(`/${market}/confirmed`)
  }

  return (
    <main className="mx-auto max-w-[1100px] px-5 pb-20 pt-10 lg:px-8">
      <Link href={`/${market}/cart`} className="inline-flex items-center gap-2 text-sm font-bold text-black/55 hover:text-black"><ArrowLeft size={16} /> Back to cart</Link>
      <h1 className="mt-6 text-4xl font-extrabold tracking-[-0.045em]">Review your order</h1>
      <p className="mt-2 text-black/55">One last look before we send your brief to our creative team.</p>
      <form onSubmit={confirm} className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <section className="space-y-6">
          <div className="rounded-3xl border border-black/8 bg-white p-6">
            <h2 className="text-lg font-extrabold">Your details</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="First name" name="firstName" placeholder="Ada" />
              <Field label="Last name" name="lastName" placeholder="Okafor" />
              <div className="sm:col-span-2"><Field label="Work email" name="email" type="email" placeholder="ada@company.com" /></div>
              <div className="sm:col-span-2"><Field label="Company name" name="company" placeholder="Your company" /></div>
            </div>
          </div>
          <div className="rounded-3xl border border-black/8 bg-white p-6">
            <h2 className="text-lg font-extrabold">Items in this order</h2>
            <div className="mt-4 divide-y divide-black/8">
              {cart.items.map((item) => (
                <div key={item.key} className="flex items-center gap-3 py-4">
                  <img src={item.service.image} alt="" className="size-14 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-extrabold">{item.service.name}</h3>
                    <p className="mt-1 text-xs text-black/45">{item.option} · Qty {item.quantity}</p>
                  </div>
                  <strong className="text-sm">{formatPrice(item.service.price * item.quantity, market)}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>
        <OrderSummary market={market} subtotal={subtotal} tax={tax} action={
          <button type="submit" className="mt-5 h-13 w-full rounded-xl bg-[#ff5c35] text-sm font-extrabold text-white transition hover:bg-[#e34b27]">Confirm mock order</button>
        } />
      </form>
    </main>
  )
}