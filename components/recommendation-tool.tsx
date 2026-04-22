"use client"

import type React from "react"

import { useState } from "react"
import { Sparkles, Calendar, User, RefreshCw, ArrowRight, MessageCircle } from "lucide-react"
import { products } from "@/lib/data"
import type { Product, FocusArea } from "@/lib/types"
import { ProductModal } from "./product-modal"
import { getWhatsAppLink } from "@/lib/config"

export function RecommendationTool() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    focus: "" as FocusArea | "",
  })
  const [recommendation, setRecommendation] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const focusAreas: FocusArea[] = [
    "Confidence",
    "Protection",
    "Peace of mind",
    "Focus and clarity",
    "Emotional healing",
    "Spiritual growth",
    "Wealth and prosperity",
    "Love and relationships",
    "Luck and opportunity",
    "Career success",
    "Health and vitality",
    "Energy and motivation",
    "Balance and positivity",
  ]

  const focusProductMap: Record<FocusArea, string[]> = {
    Confidence: ["bracelet-pyrite", "ring-pyrite-01", "bracelet-citrine"],
    Protection: ["bracelet-amethyst", "bracelet-pyrite", "bracelet-malachite-01"],
    "Peace of mind": ["bracelet-amethyst", "stone-selenite-palm", "pendant-amethyst"],
    "Focus and clarity": ["bracelet-clear-quartz", "pendant-amethyst", "bracelet-amethyst"],
    "Emotional healing": ["bracelet-rose-quartz", "bracelet-green-aventurine-new", "bracelet-pastel-stack"],
    "Spiritual growth": ["bracelet-seven-chakra", "pendant-amethyst-heart", "bracelet-amethyst"],
    "Wealth and prosperity": ["bracelet-money-magnet", "bracelet-citrine", "bracelet-pyrite"],
    "Love and relationships": ["bracelet-rose-quartz", "stone-rose-quartz-hearts", "bracelet-green-aventurine-new"],
    "Luck and opportunity": ["bracelet-green-aventurine-new", "bracelet-money-magnet", "stone-green-aventurine-tumbles"],
    "Career success": ["bracelet-citrine", "bracelet-pyrite", "bracelet-money-magnet"],
    "Health and vitality": ["bracelet-red-jasper", "bracelet-coral-02", "bracelet-citrine"],
    "Energy and motivation": ["bracelet-red-jasper", "bracelet-citrine", "bracelet-coral-02"],
    "Balance and positivity": ["bracelet-seven-chakra", "bracelet-green-aventurine-new", "bracelet-citrine"],
  }

  const handleRecommend = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate "thinking" time
    setTimeout(() => {
      const focusMatches = formData.focus ? focusProductMap[formData.focus] : []
      let matched = focusMatches
        .map((productId) => products.find((product) => product.id === productId))
        .find((product): product is Product => Boolean(product))

      if (!matched && formData.dob) {
        // Very basic mock logic based on random selection seeded by date
        const index = new Date(formData.dob).getDate() % products.length
        matched = products[index]
      }

      setRecommendation(matched || products[0])
      setLoading(false)
    }, 1500)
  }

  const resetForm = () => {
    setRecommendation(null)
    setFormData({ name: "", dob: "", focus: "" })
  }

  return (
    <section id="recommendation" data-reveal className="py-24 bg-gray-900 text-white relative overflow-hidden">
      {/* removed: generic glow background */}

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            {/* fixed: reduced overuse of fully round icon holders */}
            <span className="inline-block p-3 bg-white/10 rounded-md mb-4 backdrop-blur-sm">
              <Sparkles className="w-6 h-6 text-gold-400" />
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
              Find Your Perfect Crystal
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              {/* fixed: shortened recommendation intro */}
              Tell us what you want support with. We will suggest a stone from the collection.
            </p>
          </div>

          {!recommendation ? (
            <div className="motion-card bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-8 md:p-10 shadow-2xl">
              <form onSubmit={handleRecommend} className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                      <User className="w-4 h-4" /> Full Name
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full bg-black/20 border border-white/10 rounded-md px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-500 transition-colors"
                      placeholder="e.g. Sarah Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Date of Birth
                    </label>
                    <input
                      required
                      type="date"
                      className="w-full bg-black/20 border border-white/10 rounded-md px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-500 transition-colors [color-scheme:dark]"
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-6 flex flex-col justify-between">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">What do you want to focus on?</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {focusAreas.map((area) => (
                        <label
                          key={area}
                          className={`motion-card flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-colors active:scale-[0.97] ${
                            formData.focus === area
                              ? "bg-gold-500/20 border-gold-500 text-white"
                              : "bg-black/20 border-white/5 text-gray-400 hover:bg-white/5"
                          }`}
                        >
                          <input
                            type="radio"
                            name="focus"
                            value={area}
                            checked={formData.focus === area}
                            onChange={() => setFormData({ ...formData, focus: area })}
                            className="hidden"
                          />
                          <div
                            className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
                              formData.focus === area ? "border-gold-500" : "border-gray-500"
                            }`}
                          >
                            {formData.focus === area && <div className="w-2 h-2 bg-gold-500 rounded-sm success-pop" />}
                          </div>
                          <span className="text-sm font-medium">{area}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !formData.focus}
                    className="w-full bg-gold-500 hover:bg-gold-600 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold py-4 rounded-md transition-colors shadow-lg shadow-gold-500/20 flex items-center justify-center gap-2 active:scale-[0.96]"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Connecting to Universe...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Reveal My Crystal
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="motion-card bg-white rounded-lg p-8 md:p-12 shadow-2xl animate-in zoom-in-95 duration-500">
              <div className="text-center mb-8">
                <span className="text-gold-600 font-semibold uppercase tracking-wider text-sm mb-2 block">
                  Your Personal Match
                </span>
                <h3 className="font-heading text-3xl text-gray-900 font-bold">
                  {formData.name}, your stone is {recommendation.name}
                </h3>
                <p className="text-gray-600 mt-4 max-w-lg mx-auto">
                  {/* fixed: removed vague energy-profile wording */}
                  You chose <span className="text-gray-900 font-semibold">{formData.focus}</span>, so this is our
                  closest match from the current collection.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="w-40 h-40 md:w-56 md:h-56 relative rounded-lg overflow-hidden shrink-0 shadow-md">
                  <img
                    src={recommendation.image || "/placeholder.svg"}
                    alt={`${recommendation.name}: ${recommendation.description}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h4 className="font-heading text-xl font-semibold text-gray-900 mb-2">{recommendation.name}</h4>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{recommendation.description}</p>

                  <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                    {recommendation.benefits.map((b, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white border border-gray-200 rounded-md text-xs text-gray-600"
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 justify-center md:justify-start">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="bg-gray-900 text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 active:scale-[0.96]"
                    >
                      View Full Details <ArrowRight className="w-4 h-4" />
                    </button>
                    <a
                      href={getWhatsAppLink(
                        `Hi Tejasya Gems, based on the recommendation tool I'd like to know more about: ${recommendation.name}.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-2 active:scale-[0.96]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Buy Now
                    </a>
                  </div>
                  <div className="mt-4 flex justify-center md:justify-start">
                    <button
                      onClick={resetForm}
                      className="text-gray-500 text-sm hover:text-gray-800 transition-colors underline underline-offset-4"
                    >
                      Start Over
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ProductModal product={recommendation} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
