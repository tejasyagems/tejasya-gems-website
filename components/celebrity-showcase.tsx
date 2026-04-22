"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const CELEBRITIES = [
  {
    id: 1,
    image: "/celebrity-wearing-crystal-necklace-fashion.jpg",
    alt: "Celebrity style crystal necklace",
  },
  {
    id: 2,
    image: "/fashion-model-wearing-gemstone-rings.jpg",
    alt: "Gemstone rings fashion",
  },
  {
    id: 3,
    image: "/celebrity-with-healing-crystals-bracelet.jpg",
    alt: "Healing crystal bracelets",
  },
  {
    id: 4,
    image: "/luxury-fashion-jewelry-crystals.jpg",
    alt: "Luxury crystal jewelry",
  },
  {
    id: 5,
    image: "/red-carpet-jewelry-gemstones.jpg",
    alt: "Red carpet gemstone style",
  },
  {
    id: 6,
    image: "/boho-chic-crystal-jewelry-fashion.jpg",
    alt: "Boho chic crystal style",
  },
]

export function CelebrityShowcase() {
  const [isPaused, setIsPaused] = useState(false)
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!scrollerRef.current) return

    const scrollerContent = Array.from(scrollerRef.current.children)
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true)
      if (scrollerRef.current) {
        scrollerRef.current.appendChild(duplicatedItem)
      }
    })
  }, [])

  return (
    <div className="w-full py-12 overflow-hidden bg-transparent">
      <div className="text-center mb-8">
        <p className="text-sm font-semibold tracking-widest text-gold-600 uppercase mb-2">As Seen On</p>
        <h3 className="font-heading text-2xl text-gray-900">Celebrity Style & Influence</h3>
      </div>

      <div
        className="relative w-full flex overflow-hidden mask-linear-fade"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          ref={scrollerRef}
          className={cn(
            "flex min-w-full shrink-0 gap-6 py-4 w-max flex-nowrap",
            "animate-scroll",
            isPaused && "play-state-paused",
          )}
        >
          {CELEBRITIES.map((item) => (
            <div
              key={item.id}
              className="motion-card image-zoom relative w-[200px] h-[280px] md:w-[240px] md:h-[320px] rounded-lg overflow-hidden flex-shrink-0 shadow-lg group bg-white border border-gold-100 active:scale-[0.97]"
            >
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.alt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (prefers-reduced-motion: no-preference) {
          /* fixed: marquee motion kept opt-in to motion preference */
          @keyframes scroll {
            to {
              transform: translate(calc(-50% - 12px));
            }
          }
          .animate-scroll {
            animation: scroll 40s linear infinite;
          }
        }
        .play-state-paused {
          animation-play-state: paused;
        }
        .mask-linear-fade {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </div>
  )
}
