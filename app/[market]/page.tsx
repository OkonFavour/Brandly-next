"use client"
import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, ArrowRight, ChevronDown, Heart, Search, Sparkles, Star } from "lucide-react"
import { Category, Market, Service, formatPrice, isMarket, marketConfig, services } from "@/lib/data"

type CatType = "All" | Category
const categories: CatType[] = ["All", "Digital", "Gifts", "Create", "Studio", "Prints"]

function FilterSelect({ label, value, options, optionLabels, onChange }: {
  label: string; value: string; options: string[]; optionLabels?: string[]
  onChange: (value: string) => void
}) {
  return (
    <label className="relative">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="h-10 cursor-pointer appearance-none rounded-xl border border-black/10 bg-white pl-3 pr-8 text-xs font-bold outline-none transition hover:border-black/25 focus:ring-2 focus:ring-[#ff5c35]">
        {options.map((opt, i) => <option key={opt} value={opt}>{optionLabels?.[i] || opt}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-3" size={15} />
    </label>
  )
}

function ServiceCard({ service, market }: { service: Service; market: Market }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-black/8 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(25,28,23,0.10)]">
      <Link href={`/${market}/services/${service.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-[#e7e6e0]">
        <img src={service.image} alt={`${service.name} example`} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
        {service.tag && <span className="absolute left-4 top-4 rounded-full bg-[#f2d278] px-3 py-1.5 text-xs font-extrabold text-[#332a12]">{service.tag}</span>}
        <button className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/90 opacity-0 shadow-sm transition group-hover:opacity-100 focus:opacity-100" aria-label={`Save ${service.name}`} onClick={(e) => e.preventDefault()}>
          <Heart size={17} />
        </button>
      </Link>
      <div className="p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#ff5c35]">{service.category}</span>
          <span className="flex items-center gap-1 text-xs font-bold text-black/50"><Star size={13} fill="#f2d278" stroke="#f2d278" /> {(service.popularity / 20).toFixed(1)}</span>
        </div>
        <Link href={`/${market}/services/${service.slug}`} className="text-lg font-extrabold tracking-[-0.025em] transition hover:text-[#ff5c35]">{service.name}</Link>
        <p className="mt-2 line-clamp-2 text-sm leading-5 text-black/55">{service.description}</p>
        <div className="mt-5 flex items-end justify-between border-t border-black/8 pt-4">
          <div>
            <span className="block text-[11px] text-black/45">Starting at</span>
            <strong className="text-lg">{formatPrice(service.price, market)}</strong>
          </div>
          <Link href={`/${market}/services/${service.slug}`} className="inline-flex items-center gap-1.5 rounded-xl bg-[#181a16] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#ff5c35]">
            View service <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  )
}

function EmptyResults({ onClear }: { onClear: () => void }) {
  return (
    <div className="mt-8 rounded-3xl border border-dashed border-black/20 bg-white px-6 py-20 text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#f0efe9]"><Search size={24} /></span>
      <h2 className="mt-5 text-xl font-extrabold">No perfect matches—yet</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-black/55">Try a broader search or clear a filter.</p>
      <button onClick={onClear} className="mt-6 rounded-xl bg-[#181a16] px-5 py-3 text-sm font-bold text-white">Clear all filters</button>
    </div>
  )
}

export default function CataloguePage() {
  const params = useParams()
  const market = (isMarket(params.market as string) ? params.market : "ng") as Market
  const config = marketConfig[market]
  const searchParams = useSearchParams()
  const router = useRouter()

  const category = searchParams.get("category") || "All"
  const query = searchParams.get("q") || ""
  const industry = searchParams.get("industry") || "All industries"
  const useCase = searchParams.get("useCase") || "All use cases"
  const urgency = searchParams.get("urgency") || "Any timing"
  const sort = searchParams.get("sort") || "popularity"
  const page = Number(searchParams.get("page") || 1)

  useEffect(() => { document.title = `Creative services | Brandly ${config.label}` }, [config.label])

  function setFilter(key: string, value: string, defaultValue: string) {
    const next = new URLSearchParams(searchParams.toString())
    if (value === defaultValue || !value) next.delete(key)
    else next.set(key, value)
    next.delete("page")
    router.push(`?${next.toString()}`)
  }

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase().trim()
    const aliases: Record<string, string[]> = { logo:["identity","brand","design"], merch:["mug","gift","tote"], event:["backdrop","flyer","tote"], social:["digital","launch","media"] }
    const expanded = [normalized, ...(Object.entries(aliases).find(([k]) => normalized.includes(k))?.[1] || [])]
    return services
      .filter((s) => category === "All" || s.category === category)
      .filter((s) => industry === "All industries" || s.industry === industry)
      .filter((s) => useCase === "All use cases" || s.useCase === useCase)
      .filter((s) => urgency === "Any timing" || s.urgency === urgency)
      .filter((s) => { if (!normalized) return true; const h = `${s.name} ${s.description} ${s.category} ${s.industry} ${s.useCase}`.toLowerCase(); return expanded.some((t) => h.includes(t)) })
      .sort((a, b) => sort === "price-low" ? a.price - b.price : sort === "price-high" ? b.price - a.price : b.popularity - a.popularity)
  }, [category, industry, query, sort, urgency, useCase])

  const perPage = 6
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const visible = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <main>
      <section className="mx-auto max-w-[1400px] px-5 pb-10 pt-6 lg:px-8 lg:pt-8">
        <div className="hero-grid relative overflow-hidden rounded-[28px] bg-[#202c24] px-6 py-10 text-white sm:px-10 sm:py-14 lg:min-h-[354px] lg:px-14 lg:py-16">
          <div className="relative z-10 max-w-2xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#f2d278]">
              <Star size={13} fill="currentColor" /> Creative work, simplified
            </span>
            <h1 className="max-w-xl text-[2.65rem] font-extrabold leading-[0.98] tracking-[-0.055em] sm:text-6xl">{config.hero}</h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-white/72 sm:text-base">{config.subhero}</p>
            <label className="relative mt-8 block max-w-xl">
              <span className="sr-only">Search all services</span>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/45" size={20} />
              <input value={query} onChange={(e) => setFilter("q", e.target.value, "")} placeholder="What would you like to create?" className="h-14 w-full rounded-2xl bg-white pl-12 pr-4 text-sm font-medium text-black shadow-xl outline-none ring-[#ff5c35] transition placeholder:text-black/40 focus:ring-3" />
            </label>
          </div>
          <div className="absolute -bottom-12 -right-10 hidden h-[115%] w-[44%] rotate-[-7deg] overflow-hidden rounded-[3rem] border-[12px] border-white/10 lg:block">
            <img src={services[1].image} alt="Colorful premium brand materials" className="h-full w-full object-cover" />
          </div>
          <div className="absolute -right-8 -top-16 size-64 rounded-full border border-[#f2d278]/25" />
          <div className="absolute right-[39%] top-8 size-3 rounded-full bg-[#ff5c35]" />
        </div>
      </section>
      <section className="mx-auto max-w-[1400px] px-5 pb-20 lg:px-8">
        <div className="scrollbar-none flex gap-2 overflow-x-auto pb-4" aria-label="Service categories">
          {categories.map((item) => (
            <button key={item} onClick={() => setFilter("category", item, "All")}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition ${category === item ? "bg-[#181a16] text-white" : "border border-black/10 bg-white hover:border-black/25"}`}>
              {item}
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-4 border-y border-black/10 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <FilterSelect label="Use case" value={useCase} options={["All use cases","Start a business","Grow my brand","Launch a product","Thank my team","Host an event"]} onChange={(v) => setFilter("useCase", v, "All use cases")} />
            <FilterSelect label="Industry" value={industry} options={["All industries","Technology","Food & retail","Professional services","Hospitality","Events"]} onChange={(v) => setFilter("industry", v, "All industries")} />
            <FilterSelect label="Timing" value={urgency} options={["Any timing","This week","1–2 weeks","This month"]} onChange={(v) => setFilter("urgency", v, "Any timing")} />
          </div>
          <div className="flex items-center justify-between gap-3 lg:justify-end">
            <span className="text-sm text-black/55"><strong className="text-black">{filtered.length}</strong> services</span>
            <FilterSelect label="Sort" value={sort} options={["popularity","price-low","price-high"]} optionLabels={["Most popular","Price: low to high","Price: high to low"]} onChange={(v) => setFilter("sort", v, "popularity")} />
          </div>
        </div>
        {visible.length > 0 ? (
          <>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((s) => <ServiceCard key={s.id} service={s} market={market} />)}
            </div>
            {totalPages > 1 && (
              <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Pagination">
                <button disabled={page <= 1} onClick={() => setFilter("page", String(page - 1), "1")} className="page-button" aria-label="Previous page"><ArrowLeft size={17} /></button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((item) => (
                  <button key={item} onClick={() => setFilter("page", String(item), "1")} className={`page-button ${page === item ? "!bg-[#181a16] !text-white" : ""}`}>{item}</button>
                ))}
                <button disabled={page >= totalPages} onClick={() => setFilter("page", String(page + 1), "1")} className="page-button" aria-label="Next page"><ArrowRight size={17} /></button>
              </nav>
            )}
          </>
        ) : (
          <EmptyResults onClear={() => router.push(`/${market}`)} />
        )}
      </section>
    </main>
  )
}