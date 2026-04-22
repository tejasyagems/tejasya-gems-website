'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { ChatbotModal } from './chatbot-modal'

export function FloatingChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-6 bottom-24 z-40 flex items-center justify-center w-14 h-14 bg-[#1a3a3a] text-white rounded-lg shadow-lg hover:bg-[#2d5a5a] transition-colors duration-300 hover:shadow-xl group active:scale-[0.96]"
        aria-label="Open chat"
        title="Chat with our crystal advisor"
      >
        <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
        {/* fixed: reduced overuse of fully round status marker */}
        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-sm animate-pulse" />
      </button>

      <ChatbotModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
