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
      { threshold: 0.12 },
    )

    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element))
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
