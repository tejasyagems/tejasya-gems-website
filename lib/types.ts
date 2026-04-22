export interface Product {
  id: string
  name: string
  category: string
  priceRange?: string
  description: string
  image: string
  benefits: string[]
  chakra?: string
  zodiac?: string[]
}

export type FocusArea =
  | "Confidence"
  | "Protection"
  | "Peace of mind"
  | "Focus and clarity"
  | "Emotional healing"
  | "Spiritual growth"
  | "Wealth and prosperity"
  | "Love and relationships"
  | "Luck and opportunity"
  | "Career success"
  | "Health and vitality"
  | "Energy and motivation"
  | "Balance and positivity"
