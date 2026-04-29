"use client"

import { X, MessageCircle, Check, Star } from "lucide-react"
import Image from "next/image"
import { createPortal } from "react-dom"
import type { Product } from "@/lib/types"
import { useEffect, useRef, useState } from "react"
import { getWhatsAppLink } from "@/lib/config"

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

const focusableElementsSelector =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]'

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [mounted, setMounted] = useState(false)
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)
  const previousFocusedElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    setMounted(true)

    const node = document.createElement("div")
    document.body.appendChild(node)
    setPortalRoot(node)

    return () => {
      document.body.removeChild(node)
      document.body.style.overflow = "unset"
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    if (isOpen) {
      previousFocusedElement.current = document.activeElement as HTMLElement | null
      document.body.style.overflow = "hidden"

      const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(focusableElementsSelector) ?? []
      if (focusableElements.length > 0) {
        focusableElements[0].focus()
      }

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          event.preventDefault()
          onClose()
          return
        }

        if (event.key !== "Tab") {
          return
        }

        const focusable = Array.from(
          modalRef.current?.querySelectorAll<HTMLElement>(focusableElementsSelector) ?? [],
        ).filter((element) => element.offsetParent !== null)

        if (focusable.length === 0) {
          event.preventDefault()
          return
        }

        const firstElement = focusable[0]
        const lastElement = focusable[focusable.length - 1]

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault()
            lastElement.focus()
          }
        } else if (document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }

      document.addEventListener("keydown", handleKeyDown)
      return () => {
        document.removeEventListener("keydown", handleKeyDown)
        document.body.style.overflow = "unset"
        previousFocusedElement.current?.focus()
      }
    }

    document.body.style.overflow = "unset"
    return undefined
  }, [isOpen, mounted, onClose])

  if (!mounted || !portalRoot || !isOpen || !product) return null

  const whatsappMessage = `Hi Tejasya Gems, I'm interested in this product: ${product.name} (ID: ${product.id}). Please share details and price.`
  const whatsappLink = getWhatsAppLink(whatsappMessage)

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        aria-describedby="product-modal-description"
        className="relative z-10 w-full max-w-[95vw] md:max-w-[880px] max-h-[90vh] overflow-hidden rounded-[28px] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.18)] flex flex-col md:flex-row animate-in zoom-in-95 duration-200"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full shadow-sm hover:bg-gray-100 transition-colors active:scale-[0.96]"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="w-full md:w-1/2 bg-gray-50 relative min-h-[280px] md:min-h-full">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={`${product.name}: ${product.description}`}
            fill
            className="object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
          <div className="mb-1">
            <span className="text-xs font-bold tracking-wider text-gold-600 uppercase">{product.category}</span>
          </div>

          <h2 id="product-modal-title" className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {product.name}
          </h2>

          <div className="flex items-center gap-2 mb-6 flex-wrap">
            {product.priceRange ? (
              <span className="text-lg font-medium text-gray-900">{product.priceRange}</span>
            ) : (
              <span className="text-sm text-gray-500">Price on request</span>
            )}
            <span className="text-sm text-gray-500">(Approx.)</span>
          </div>

          <p id="product-modal-description" className="text-gray-600 leading-relaxed mb-6">
            {product.description}
          </p>

          <div className="space-y-6 mb-8">
            <div>
              <h3 className="font-heading font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Star className="w-4 h-4 text-gold-500" /> Key Benefits
              </h3>
              <ul className="grid grid-cols-1 gap-2">
                {product.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              {product.chakra && (
                <div className="bg-gold-50 px-3 py-2 rounded-md border border-gold-100">
                  <span className="block text-xs text-gold-600 font-semibold uppercase mb-0.5">Chakra</span>
                  <span className="text-gray-700">{product.chakra}</span>
                </div>
              )}
              {product.zodiac && (
                <div className="bg-blue-50 px-3 py-2 rounded-md border border-blue-100">
                  <span className="block text-xs text-blue-600 font-semibold uppercase mb-0.5">Zodiac</span>
                  <span className="text-gray-700">{product.zodiac.join(", ")}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-auto">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-4 rounded-md font-semibold transition-colors shadow-lg hover:shadow-green-200 active:scale-[0.96]"
            >
              <MessageCircle className="w-5 h-5" />
              Buy on WhatsApp
            </a>
            <p className="text-center text-xs text-gray-400 mt-3">
              Clicking will open WhatsApp with product details pre-filled.
            </p>
          </div>
        </div>
      </div>
    </div>,
    portalRoot,
  )
}
