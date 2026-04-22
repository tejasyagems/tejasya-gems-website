import { products } from "./data"
import type { Product } from "./types"

export interface ChatMessage {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  suggestedProducts?: Product[]
}

const keywordMap: Record<string, string[]> = {
  wealth: ["wealth", "money", "abundance", "prosperity", "financial", "income", "business"],
  protection: ["protection", "shield", "safe", "negative", "guard", "evil"],
  peace: ["peace", "calm", "anxiety", "stress", "relax", "meditation", "serene"],
  clarity: ["clarity", "focus", "concentration", "mental", "decision", "clear"],
  healing: ["healing", "emotional", "hurt", "pain", "recovery", "balance"],
  love: ["love", "heart", "relationship", "romance", "connection", "compassion"],
  energy: ["energy", "vitality", "tired", "strength", "power", "boost", "motivation"],
  communication: ["communication", "speak", "express", "voice", "talk"],
  luck: ["luck", "lucky", "opportunity", "growth", "chance"],
  career: ["career", "job", "work", "success", "promotion", "confidence", "business"],
  health: ["health", "vitality", "wellness", "strength", "stability", "grounding"],
  positivity: ["positive", "positivity", "harmony", "balance", "joy"],
}

const preferredProductIds: Record<string, string[]> = {
  wealth: ["bracelet-money-magnet", "bracelet-citrine", "bracelet-pyrite"],
  protection: ["bracelet-amethyst", "bracelet-pyrite", "bracelet-malachite-01"],
  peace: ["bracelet-amethyst", "stone-selenite-palm", "pendant-amethyst"],
  clarity: ["bracelet-clear-quartz", "pendant-amethyst", "bracelet-amethyst"],
  healing: ["bracelet-rose-quartz", "bracelet-green-aventurine-new", "bracelet-pastel-stack"],
  love: ["bracelet-rose-quartz", "stone-rose-quartz-hearts", "bracelet-green-aventurine-new"],
  energy: ["bracelet-red-jasper", "bracelet-citrine", "bracelet-coral-02"],
  luck: ["bracelet-green-aventurine-new", "bracelet-money-magnet", "stone-green-aventurine-tumbles"],
  career: ["bracelet-citrine", "bracelet-pyrite", "bracelet-money-magnet"],
  health: ["bracelet-red-jasper", "bracelet-coral-02", "bracelet-seven-chakra"],
  positivity: ["bracelet-seven-chakra", "bracelet-green-aventurine-new", "bracelet-citrine"],
}

const addProductById = (suggestions: Set<Product>, productId: string) => {
  const product = products.find((item) => item.id === productId)
  if (product) suggestions.add(product)
}

export const getProductSuggestions = (userInput: string): Product[] => {
  const lowerInput = userInput.toLowerCase()
  const suggestions: Set<Product> = new Set()

  const categoryMatches = products.filter((product) => lowerInput.includes(product.category.toLowerCase()))
  categoryMatches.forEach((product) => suggestions.add(product))

  const nameMatches = products.filter((product) => lowerInput.includes(product.name.toLowerCase()))
  nameMatches.forEach((product) => suggestions.add(product))

  for (const [intent, keywords] of Object.entries(keywordMap)) {
    if (keywords.some((keyword) => lowerInput.includes(keyword))) {
      preferredProductIds[intent]?.forEach((productId) => addProductById(suggestions, productId))

      const matchedProducts = products.filter(
        (product) =>
          product.benefits.some((benefit) =>
            keywords.some((keyword) => benefit.toLowerCase().includes(keyword)),
          ) || keywords.some((keyword) => product.description.toLowerCase().includes(keyword)),
      )
      matchedProducts.forEach((product) => suggestions.add(product))
    }
  }

  return Array.from(suggestions).slice(0, 3)
}

export const generateBotResponse = (userInput: string): { text: string; products: Product[] } => {
  const suggestedProducts = getProductSuggestions(userInput)
  const lowerInput = userInput.toLowerCase()

  let response = ""

  if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
    // fixed: removed generic welcome copy
    response =
      "Hi, I can help you choose a Tejasya Gems crystal. Tell me what you want support with: wealth, protection, peace, love, career, health, or energy."
  } else if (lowerInput.includes("help") || lowerInput.includes("what can")) {
    response =
      "I can help you find crystals for wealth and prosperity, protection, peace and meditation, focus and clarity, emotional healing, love and relationships, career success, luck and opportunity, health and vitality, energy and motivation, and balance. What do you want support with?"
  } else if (lowerInput.includes("price") || lowerInput.includes("cost")) {
    if (suggestedProducts.length > 0) {
      response = `These products might interest you:\n\n${suggestedProducts
        .map((product) => `- ${product.name}: ${product.priceRange}`)
        .join("\n")}\n\nWould you like more details about any of these?`
    } else {
      response =
        "Our crystals start from affordable bracelet options around ₹510 and go up depending on product type and quality. Tell me what you want support with, such as wealth, protection, love, health, or peace, and I can suggest the best options."
    }
  } else if (lowerInput.includes("thank") || lowerInput.includes("thanks")) {
    response = "You're welcome! Feel free to reach out anytime."
  } else if (suggestedProducts.length > 0) {
    const productNames = suggestedProducts.map((product) => product.name).join(", ")
    response = `Great question! I think these would be perfect for you:\n\n${suggestedProducts
      .map((product) => `${product.name}\n${product.description}\nBenefits: ${product.benefits.join(", ")}`)
      .join(
        "\n\n",
      )}\n\nWould you like to order ${productNames}? You can tap a product below to connect with us on WhatsApp.`
  } else {
    response =
      "That's a great question. Could you tell me more about what you're looking for? You can ask for bracelets, rings, necklaces, raw stones, or a life focus like wealth, protection, love, career success, health, peace, or emotional healing."
  }

  return { text: response, products: suggestedProducts }
}

export const shouldSuggestWhatsApp = (products: Product[]): boolean => {
  return products.length > 0
}
