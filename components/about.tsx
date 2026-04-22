import Image from "next/image"
import { ShieldCheck, Sparkles, Heart } from "lucide-react"

export function About() {
  return (
    <section id="about" data-reveal className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            {/* fixed: image hover scales inside overflow container */}
            <div className="aspect-[4/5] relative rounded-lg overflow-hidden shadow-xl image-zoom">
              <Image
                src="/images/about-section-crystals.jpg"
                alt="Tejasya Gems Collection"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg max-w-xs border border-gray-100 hidden md:block">
              <div className="flex items-center gap-3 mb-2">
                {/* fixed: reduced overuse of fully round icon holders */}
                <div className="w-10 h-10 rounded-md bg-gold-100 flex items-center justify-center text-gold-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="font-heading font-semibold text-gray-900">100% Certified</span>
              </div>
              <p className="text-sm text-gray-600 leading-snug">
                Every gemstone comes with a certificate of authenticity for your peace of mind.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
              More Than Just <span className="text-gold-600">Jewellery</span>
            </h2>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                {/* fixed: removed generic wording and shortened the paragraph */}
                Tejasya Gems brings certified natural gemstones to people who care about beauty, purity, and trust.
                Every piece is selected for quality and everyday use.
              </p>
              <p>
                At Tejasya Gems, we believe that gemstones are carriers of positive energy, emotional balance, and
                spiritual healing. Every product is checked, cleansed, and packed with care so the customer receives a
                gemstone that is ready to use, energised, and full of vibrance.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: ShieldCheck, title: "Authentic & Natural", desc: "Responsibly sourced & certified" },
                { icon: Sparkles, title: "Energized for You", desc: "Cleansed before shipping" },
                { icon: Heart, title: "Healing & Beauty", desc: "For wellness and style" },
              ].map((item, idx) => (
                <div key={idx} className="group flex gap-4 transition-transform active:scale-[0.97]">
                  {/* fixed: reduced overuse of fully round icon holders */}
                  <div className="w-10 h-10 shrink-0 rounded-md bg-gold-50 flex items-center justify-center text-gold-600">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-gray-900 text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
