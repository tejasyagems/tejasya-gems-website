"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, SlidersHorizontal } from "lucide-react"
import { products, categories } from "@/lib/data"
import type { Product } from "@/lib/types"
import { ProductModal } from "./product-modal"

export function Catalog() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.benefits.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const openProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  return (
    <section id="catalog" data-reveal className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            Curated Crystal Collection
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {/* fixed: shortened catalog intro */}
            Certified gemstones selected for energy, beauty, and daily wear.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
          {/* Categories */}
          <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors active:scale-[0.96] ${
                    activeCategory === category
                      ? "bg-gray-900 text-white shadow-md"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search crystals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent bg-white"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group motion-card bg-white rounded-lg overflow-hidden shadow-sm flex flex-col cursor-pointer active:scale-[0.97]"
                onClick={() => openProduct(product)}
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={`${product.name}: ${product.description}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-gray-900 px-4 py-2 rounded-md text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 active:scale-[0.96]">
                    View Details
                  </button>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="text-xs font-semibold text-gold-600 uppercase mb-1">{product.category}</div>
                  <h3 className="font-heading font-medium text-gray-900 text-lg mb-2 line-clamp-1 group-hover:text-gold-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {product.benefits.slice(0, 2).map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            {/* fixed: reduced overuse of fully round empty-state icon holder */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-gray-100 mb-4 text-gray-400">
              <SlidersHorizontal className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No crystals found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your filters or search query.</p>
            <button
              onClick={() => {
                setActiveCategory("All")
                setSearchQuery("")
              }}
              className="mt-4 text-gold-600 hover:underline text-sm font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
