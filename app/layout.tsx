import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import "./globals.css"

const manrope = Manrope({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Brandly – Creative services for growing brands",
  description: "Strategy, design, print and branded goods—all made by trusted creative partners.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={manrope.className}>{children}</body>
    </html>
  )
}
