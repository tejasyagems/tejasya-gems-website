"use client"

import Link from "next/link"
import { getWhatsAppLink } from "@/lib/config"

export function FloatingWhatsAppButton() {
  return (
    <Link
      href={getWhatsAppLink("Hello, I'm interested in your crystals and gems!")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition-colors duration-300 hover:shadow-xl active:scale-[0.96]"
      aria-label="Chat with us on WhatsApp"
    >
      <svg
        className="w-7 h-7"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.316-5.038 5.96-5.038 9.765 0 1.71.421 3.396 1.222 4.897L1.7 23.618l5.119-1.645c1.409.771 3.012 1.179 4.665 1.179 5.487 0 9.965-4.478 9.965-9.965 0-2.662-1.035-5.165-2.918-7.050-1.883-1.884-4.387-2.922-7.047-2.922z" />
      </svg>
    </Link>
  )
}
