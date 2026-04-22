import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Catalog } from "@/components/catalog"
import { RecommendationTool } from "@/components/recommendation-tool"
import { HowItWorks } from "@/components/how-it-works"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Catalog />
      <RecommendationTool />
      <HowItWorks />
      <Footer />
    </main>
  )
}
