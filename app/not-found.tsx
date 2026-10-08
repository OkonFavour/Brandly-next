import Link from "next/link"
import { Grid2X2 } from "lucide-react"

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-5 text-center">
      <div>
        <Grid2X2 className="mx-auto text-black/25" size={48} />
        <h1 className="mt-5 text-4xl font-extrabold">That page is not in our catalogue.</h1>
        <p className="mt-3 text-black/50">The link may have moved, but there is plenty more to discover.</p>
        <Link href="/ng" className="mt-6 inline-flex rounded-xl bg-[#181a16] px-5 py-3 text-sm font-bold text-white">Browse services</Link>
      </div>
    </main>
  )
}