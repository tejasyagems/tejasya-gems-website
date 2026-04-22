import type React from "react"
import type { Metadata } from "next"
import { Poppins, Lato } from "next/font/google"
// removed: deployment analytics import
import { FloatingWhatsAppButton } from "@/components/floating-whatsapp-button"
import { FloatingChatbotButton } from "@/components/floating-chatbot-button"
import { SiteEffects } from "@/components/site-effects"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Tejasya Gems | Authentic Healing Crystals",
  // fixed: shortened meta copy and removed generic wording
  description: "Certified natural gemstones, crystal jewellery, and guidance from Tejasya Gems.",
  // removed: generated builder metadata
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} ${lato.variable} font-body bg-white text-gray-900 antialiased`}>
        {/* fixed: site-wide reveal, header, and progress effects */}
        <SiteEffects />
        {children}
        <FloatingChatbotButton />
        <FloatingWhatsAppButton />
        {/* removed: deployment analytics component */}
      </body>
    </html>
  )
}
