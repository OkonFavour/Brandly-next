"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Check, CircleHelp, Clock3, Heart, Minus, PackageCheck, Plus, ShieldCheck, ShoppingBag, Star } from "lucide-react"
import { Market, Service, formatPrice, isMarket, services } from "@/lib/data"
import { useCart } from "@/context/cart"

function ServiceCard({ service, market }: { service: Service; market: Market }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-black/8 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(25,28,23,0.10)]">
      <Link href={`/${market}/services/${service.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-[#e7e6e0]">
        <img src={service.image} alt={service.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
        {service.tag && <span className="absolute left-4 top-4 rounded-full bg-[#f2d278] px-3 py-1.5 text-xs font-extrabold text-[#332a12]">{service.tag}</span>}
      </Link>
      <div className="p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#ff5c35]">{service.category}</span>
          <span className="flex items-center gap-1 text-xs font-bold text-black/50"><Star size={13} fill="#f2d278" stroke="#f2d278" /> {(service.popularity / 20).toFixed(1)}</span>
        </div>
        <Link href={`/${market}/services/${service.slug}`} className="text-lg font-extrabold tracking-[-0.025em] transition hover:text-[#ff5c35]">{service.name}</Link>
        <p className="mt-2 line-clamp-2 text-sm leading-5 text-black/55">{service.description}</p>
        <div className="mt-5 flex items-end justify-between border-t border-black/8 pt-4">
          <div><span className="block text-[11px] text-black/45">Starting at</span><strong className="text-lg">{formatPrice(service.price, market)}</strong></div>
          <Link href={`/${market}/services/${service.slug}`} className="inline-flex items-center gap-1.5 rounded-xl bg-[#181a16] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#ff5c35]">View service <ArrowRight size={14} /></Link>
        </div>
      </div>
    </article>
  )
}

export default function ServiceDetailPage() {
  const params = useParams()
  const market = (isMarket(params.market as string) ? params.market : "ng") as Market
  const slug = params.slug as string
  const router = useRouter()
  const cart = useCart()
  const service = services.find((s) => s.slug === slug)
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [option, setOption] = useState(service?.options[0] || "")
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (!service) return
    document.title = `${service.name} | Brandly`
  }, [service])

  if (!service) return (
    <main className="grid min-h-[70vh] place-items-center px-5 text-center">
      <div>
        <h1 className="mt-5 text-4xl font-extrabold">That page is not in our catalogue.</h1>
        <Link href={`/${market}`} className="mt-6 inline-flex rounded-xl bg-[#181a16] px-5 py-3 text-sm font-bold text-white">Browse services</Link>
      </div>
    </main>
  )

  function addToCart(goToCart = false) {
    cart.add(service!, quantity, option)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
    if (goToCart) router.push(`/${market}/cart`)
  }

  const related = services.filter((s) => s.id !== service.id && (s.category !== service.category || s.useCase === service.useCase)).slice(0, 3)

  return (
    <main className="mx-auto max-w-[1400px] px-5 pb-20 pt-6 lg:px-8 lg:pt-8">
      <nav className="mb-6 flex items-center gap-2 text-xs font-semibold text-black/50" aria-label="Breadcrumb">
        <Link href={`/${market}`} className="hover:text-black">Services</Link>
        <span>/</span>
        <Link href={`/${market}?category=${service.category}`} className="hover:text-black">{service.category}</Link>
        <span>/</span>
        <span className="truncate text-black">{service.name}</span>
      </nav>
      <section className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
        <div>
          <div className="aspect-[4/3] overflow-hidden rounded-[28px] bg-[#e7e6e0]">
            <img src={service.gallery[activeImage]} alt={`${service.name} view ${activeImage + 1}`} className="h-full w-full object-cover" />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {service.gallery.map((img, i) => (
              <button key={img} onClick={() => setActiveImage(i)} className={`aspect-[4/3] overflow-hidden rounded-2xl border-2 bg-[#e7e6e0] transition ${activeImage === i ? "border-[#ff5c35]" : "border-transparent opacity-75 hover:opacity-100"}`} aria-label={`View image ${i + 1}`}>
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div className="lg:py-3">
          <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#ff5c35]">{service.category}</span>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-5xl">{service.name}</h1>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm font-bold"><Star size={15} fill="#f2d278" stroke="#f2d278" /> {(service.popularity / 20).toFixed(1)}</div>
            <span className="size-1 rounded-full bg-black/20" />
            <span className="text-sm text-black/50">Trusted by 200+ brands</span>
          </div>
          <p className="mt-6 max-w-xl text-base leading-7 text-black/60">{service.description}</p>
          <div className="mt-7 rounded-2xl bg-white p-5 ring-1 ring-black/8">
            <span className="text-xs font-bold text-black/45">From</span>
            <div className="mt-1 text-3xl font-extrabold tracking-[-0.03em]">{formatPrice(service.price, market)}</div>
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#3d6c50]"><Clock3 size={16} /> Ready in {service.turnaround}</div>
          </div>
          <fieldset className="mt-7">
            <legend className="mb-3 text-sm font-extrabold">{service.optionLabel}</legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {service.options.map((item) => (
                <button key={item} onClick={() => setOption(item)} className={`rounded-xl border px-3 py-3 text-left text-xs font-bold transition ${option === item ? "border-[#181a16] bg-[#181a16] text-white" : "border-black/12 bg-white hover:border-black/30"}`}>{item}</button>
              ))}
            </div>
          </fieldset>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="flex h-13 items-center justify-between rounded-xl border border-black/12 bg-white px-2 sm:w-36">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="grid size-9 place-items-center rounded-lg hover:bg-black/5" aria-label="Decrease quantity"><Minus size={16} /></button>
              <span className="min-w-8 text-center text-sm font-extrabold" aria-live="polite">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="grid size-9 place-items-center rounded-lg hover:bg-black/5" aria-label="Increase quantity"><Plus size={16} /></button>
            </div>
            <button onClick={() => addToCart(false)} className="flex h-13 flex-1 items-center justify-center gap-2 rounded-xl border-2 border-[#181a16] px-5 text-sm font-extrabold transition hover:bg-[#181a16] hover:text-white">
              {added ? <><Check size={18} /> Added</> : <><ShoppingBag size={18} /> Add to cart</>}
            </button>
            <button onClick={() => addToCart(true)} className="h-13 flex-1 rounded-xl bg-[#ff5c35] px-5 text-sm font-extrabold text-white transition hover:bg-[#e34b27]">Order now</button>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2 border-t border-black/10 pt-5 text-center text-[11px] font-bold text-black/60">
            <span className="flex flex-col items-center gap-2"><ShieldCheck size={20} /> Quality assured</span>
            <span className="flex flex-col items-center gap-2"><PackageCheck size={20} /> Proof first</span>
            <span className="flex flex-col items-center gap-2"><CircleHelp size={20} /> Expert support</span>
          </div>
        </div>
      </section>
      <section className="mt-16 grid gap-6 rounded-[28px] bg-[#eae9e2] p-6 md:grid-cols-2 lg:p-10">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#ff5c35]">The details</span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.03em]">Everything you need to make it real.</h2>
        </div>
        <ul className="grid gap-3">
          {service.included.map((item) => (
            <li key={item} className="flex items-center gap-3 rounded-xl bg-white/75 px-4 py-3 text-sm font-semibold">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#d9eadb] text-[#315b3f]"><Check size={14} strokeWidth={3} /></span>
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-16">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#ff5c35]">Complete the look</span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.04em]">Pairs well with</h2>
          </div>
          <Link href={`/${market}`} className="hidden items-center gap-1 text-sm font-bold sm:flex">View all <ArrowRight size={16} /></Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => <ServiceCard key={item.id} service={item} market={market} />)}
        </div>
      </section>
    </main>
  )
}