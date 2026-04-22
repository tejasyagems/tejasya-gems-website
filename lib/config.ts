export const SITE_CONFIG = {
  whatsappNumber: "917597591341",
  instagramLink: "https://www.instagram.com/tejasya_gems",
  email: "hello@tejasyagems.com",
}

export const getWhatsAppLink = (text?: string) => {
  const baseUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}`
  if (text) {
    return `${baseUrl}?text=${encodeURIComponent(text)}`
  }
  return baseUrl
}
