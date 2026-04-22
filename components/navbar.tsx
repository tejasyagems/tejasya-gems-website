"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, MessageCircle } from "lucide-react"
import { getWhatsAppLink } from "@/lib/config"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Catalog", href: "#catalog" },
    { name: "Find Your Crystal", href: "#recommendation" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Contact", href: "#footer" },
  ]

  return (
    <nav
      data-site-header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {/* fixed: reduced overuse of fully round shapes */}
          <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden border border-gold-200">
            <Image src="/images/logo.jpeg" alt="Tejasya Gems Logo" fill className="object-cover" />
          </div>
          <span className="font-heading font-semibold text-lg md:text-xl tracking-tight text-gray-900">
            TEJASYA GEMS
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="nav-link text-sm font-medium text-gray-700 hover:text-gold-600 transition-colors relative"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center">
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-gold-600 transition-colors active:scale-[0.96]"
          >
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-gray-700" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-base font-medium text-gray-800 py-2 border-b border-gray-50 hover:text-gold-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-3 rounded-md text-sm font-medium mt-2 active:scale-[0.96]"
          >
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </a>
        </div>
      )}
    </nav>
  )
}
