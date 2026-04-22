import { Search, MessageCircle, PackageCheck, Truck } from "lucide-react"
import { getWhatsAppLink } from "@/lib/config"

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "1. Find Your Crystal",
      // fixed: shortened step copy
      desc: "Browse the catalog or answer a few questions to narrow the choice.",
    },
    {
      icon: MessageCircle,
      title: "2. Chat to Order",
      desc: "Connect with us on WhatsApp to confirm availability, pricing, and specific needs.",
      link: getWhatsAppLink(),
      linkText: "Start Chat",
    },
    {
      icon: PackageCheck,
      title: "3. Cleanse & Pack",
      // fixed: shortened step copy
      desc: "We cleanse, check, and pack your crystal with care.",
    },
    {
      icon: Truck,
      title: "4. Fast Delivery",
      // fixed: shortened step copy
      desc: "Receive your certified crystal at your doorstep.",
    },
  ]

  return (
    <section id="how-it-works" data-reveal className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-gray-900 mb-4">How It Works</h2>
          {/* fixed: shortened process copy */}
          <p className="text-gray-600 max-w-2xl mx-auto">From selection to delivery, the process stays simple.</p>
        </div>

        <div className="relative grid md:grid-cols-4 gap-8">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gray-100 -z-10"></div>

          {steps.map((step, idx) => (
            <div key={idx} className="motion-card flex flex-col items-center text-center group relative z-10 active:scale-[0.97]">
              {/* fixed: reduced overuse of fully round step markers */}
              <div className="w-24 h-24 rounded-lg bg-white border-4 border-gray-50 shadow-lg flex items-center justify-center mb-6 group-hover:border-gold-100 transition-colors duration-300">
                <step.icon className="w-10 h-10 text-gold-500" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed px-4 mb-3">{step.desc}</p>
              {step.link && (
                <a
                  href={step.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-gold-600 hover:text-gold-700 underline underline-offset-4"
                >
                  {step.linkText}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
