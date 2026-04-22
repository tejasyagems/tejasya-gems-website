import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Mail, MapPin, MessageCircle } from "lucide-react"
import { SITE_CONFIG, getWhatsAppLink } from "@/lib/config"

export function Footer() {
  return (
    <footer id="footer" className="bg-gray-50 border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              {/* fixed: reduced overuse of fully round logo frame */}
              <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-gold-200">
                <Image src="/images/logo.jpeg" alt="Tejasya Gems" fill className="object-cover" />
              </div>
              <span className="font-heading font-semibold text-lg tracking-tight text-gray-900">TEJASYA GEMS</span>
            </Link>
            {/* fixed: shortened footer copy */}
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Certified natural gemstones, selected and packed with care.
            </p>
            <div className="flex gap-4">
              <a
                href={SITE_CONFIG.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-md bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-pink-600 hover:border-pink-200 transition-colors active:scale-[0.96]"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-md bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-colors active:scale-[0.96]"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-gray-900 mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li>
                <Link href="#hero" className="hover:text-gold-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#catalog" className="hover:text-gold-600 transition-colors">
                  Crystals Catalog
                </Link>
              </li>
              <li>
                <Link href="#recommendation" className="hover:text-gold-600 transition-colors">
                  Find Your Crystal
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-gold-600 transition-colors">
                  Our Story
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading font-semibold text-gray-900 mb-6">Categories</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li>
                <Link href="#catalog" className="hover:text-gold-600 transition-colors">
                  Healing Bracelets
                </Link>
              </li>
              <li>
                <Link href="#catalog" className="hover:text-gold-600 transition-colors">
                  Gemstone Rings
                </Link>
              </li>
              <li>
                <Link href="#catalog" className="hover:text-gold-600 transition-colors">
                  Malas & Rosaries
                </Link>
              </li>
              <li>
                <Link href="#catalog" className="hover:text-gold-600 transition-colors">
                  Raw Crystals
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-gray-900 mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-gold-600 transition-colors group"
                >
                  <MessageCircle className="w-5 h-5 text-green-600 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Chat on WhatsApp</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400 shrink-0" />
                <span>{SITE_CONFIG.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                <span>Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© 2025 Tejasya Gems. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-600">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-600">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
