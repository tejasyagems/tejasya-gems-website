"use client"

import { useEffect, useState } from "react"

export function SiteEffects() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)

    const header = document.querySelector("[data-site-header]")
    const updateHeader = () => {
      header?.classList.toggle("is-scrolled", window.scrollY > 60)
    }

    // fixed: scroll-triggered section reveal using Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      // lower threshold so content doesn't remain hidden when only partially visible
      { threshold: 0.02 },
    )

    const revealElements = Array.from(document.querySelectorAll("[data-reveal]"))

    // Immediately reveal anything already in-view (prevents "blank" sections on anchor navigation)
    revealElements.forEach((element) => {
      const el = element as HTMLElement
      const rect = el.getBoundingClientRect()
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        el.classList.add("is-visible")
        observer.unobserve(el)
      }
    })

    revealElements.forEach((element) => observer.observe(element))
    updateHeader()
    window.addEventListener("scroll", updateHeader, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", updateHeader)
    }
  }, [])

  return (
    // fixed: page-load progress bar
    <div className="site-progress" aria-hidden="true">
      <span className={loaded ? "is-loaded" : ""} />
    </div>
  )
}
