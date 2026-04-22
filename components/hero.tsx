import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { CelebrityShowcase } from "./celebrity-showcase"

export function Hero() {
  return (
    <section id="hero" data-reveal className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gold-50 overflow-hidden">
      {/* removed: generic background decorations */}

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* fixed: asymmetric hero layout */}
        <div className="max-w-4xl ml-0 md:ml-8 text-left flex flex-col items-start">
          <span className="hero-line inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-gold-600 uppercase bg-gold-100 rounded-md">
            Certified Authentic Gemstones
          </span>

          <h1 className="hero-line font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 leading-tight mb-6 max-w-3xl">
            Crystals Chosen With Care
          </h1>

          <p className="hero-line text-lg text-gray-600 mb-10 max-w-xl leading-relaxed">
            Handpicked, certified gemstones for balance, clarity, prosperity, and everyday wear.
          </p>

          <div className="hero-line flex flex-col sm:flex-row gap-4">
            <Link
              href="#recommendation"
              className="px-8 py-4 bg-gray-900 text-white rounded-md font-medium hover:bg-gold-600 transition-colors shadow-lg flex items-center justify-center gap-2 active:scale-[0.96]"
            >
              Find Your Crystal
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#catalog"
              className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-md font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm flex items-center justify-center active:scale-[0.96]"
            >
              Explore Collection
            </Link>
          </div>
        </div>

        {/* fixed: reveal showcase after hero copy */}
        <div className="hero-line">
          <CelebrityShowcase />
        </div>
      </div>
    </section>
  )
}
