import type React from "react"

interface ChatMessageProps {
  isBot: boolean
  children: React.ReactNode
}

export function ChatMessage({ isBot, children }: ChatMessageProps) {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
        {isBot ? (
          <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        )}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}

