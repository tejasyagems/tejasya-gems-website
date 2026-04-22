'use client'

import { useState, useRef, useEffect } from 'react'
import type { ChatMessage } from '@/lib/chatbot-logic'
import { generateBotResponse, shouldSuggestWhatsApp } from '@/lib/chatbot-logic'
import { getWhatsAppLink } from '@/lib/config'
import { X, Send, MessageCircle } from 'lucide-react'

interface ChatbotModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ChatbotModal({ isOpen, onClose }: ChatbotModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      // fixed: removed generic welcome copy
      text: 'Hi, I can help you choose a Tejasya Gems crystal. What are you looking for today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate bot thinking time
    setTimeout(() => {
      const { text, products } = generateBotResponse(input)
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text,
        sender: 'bot',
        timestamp: new Date(),
        suggestedProducts: products,
      }
      setMessages(prev => [...prev, botMessage])
      setIsLoading(false)
    }, 800)
  }

  const handleWhatsAppSuggestion = (productName: string) => {
    const whatsappText = `Hi! I'm interested in the ${productName}. Can you tell me more about it?`
    window.open(getWhatsAppLink(whatsappText), '_blank')
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-32 left-2 z-50 animate-in fade-in slide-in-from-left-5 duration-300">
      <div className="bg-white rounded-lg shadow-2xl w-80 h-[500px] flex flex-col border border-gray-200">
        {/* Header */}
        {/* fixed: replaced generic gradient header with brand color */}
        <div className="bg-[#1a3a3a] text-white p-3 rounded-t-lg flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <MessageCircle size={20} />
            <div>
              <h3 className="font-semibold text-sm">Crystal Assistant</h3>
              <p className="text-xs opacity-90">Online</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-white hover:bg-opacity-20 p-1 rounded-md transition-colors active:scale-[0.96]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-[#b8960f] text-white rounded-br-none'
                    : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
                }`}
              >
                <p className="text-xs whitespace-pre-wrap">{message.text}</p>
                
                {/* Product suggestions */}
                {message.suggestedProducts && message.suggestedProducts.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {message.suggestedProducts.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleWhatsAppSuggestion(product.name)}
                        className="motion-card block w-full text-left bg-white border border-gray-200 rounded-lg hover:shadow-md transition overflow-hidden active:scale-[0.97]"
                      >
                        <div className="flex gap-2">
                          {/* Product Image */}
                          <div className="w-20 h-20 flex-shrink-0 bg-gray-100 overflow-hidden rounded-lg">
                            <img
                              src={product.image}
                              alt={`${product.name}: ${product.description}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {/* Product Info */}
                          <div className="flex-1 p-2 text-gray-800 text-xs">
                            <div className="font-semibold line-clamp-2 text-sm">{product.name}</div>
                            <div className="text-[#d4af37] font-bold mt-1">{product.priceRange}</div>
                            <div className="text-gray-600 text-[11px] mt-1 line-clamp-2">
                              {product.benefits.slice(0, 2).join(', ')}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg rounded-bl-none">
                <div className="flex gap-2">
                  {/* fixed: reduced overuse of fully round typing markers */}
                  <div className="w-2 h-2 bg-gray-400 rounded-sm animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-sm animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-sm animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-3 bg-white rounded-b-lg flex-shrink-0">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about crystals..."
              className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37] focus:ring-opacity-20"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="bg-[#b8960f] text-white p-2 rounded-md hover:opacity-90 disabled:opacity-50 transition-opacity active:scale-[0.96]"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
