"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import type { ProductDescription } from "@/types/assessment"

interface Message {
  text: string
  isBot: boolean
}

interface DescribeProductChatbotProps {
  initialData: ProductDescription
  onComplete: (data: ProductDescription) => void
}

const questions = [
  { key: "name", text: "What is the name of your ship?" },
  { key: "type", text: "What type of ship is it? (e.g., cargo, passenger, tanker)" },
  { key: "propulsionSystem", text: "What propulsion system does the ship use? (e.g., diesel, hybrid, electric)" },
  { key: "weight", text: "What is the approximate weight of the ship in tons?" },
  { key: "length", text: "What is the length of the ship in meters?" },
  { key: "capacity", text: "What is the ship's capacity? (e.g., number of passengers or cargo tonnage)" },
]

export function DescribeProductChatbot({ initialData, onComplete }: DescribeProductChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const [productData, setProductData] = useState<ProductDescription>(initialData)

  useEffect(() => {
    if (currentQuestion < questions.length) {
      setMessages((prev) => [...prev, { text: questions[currentQuestion].text, isBot: true }])
    } else {
      setMessages((prev) => [
        ...prev,
        { text: "Thank you! I have all the information I need. Let's move on to the Bill of Materials.", isBot: true },
      ])
      onComplete(productData)
    }
  }, [currentQuestion, onComplete]) // Added onComplete to dependencies

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() === "") return

    const newMessage: Message = { text: inputValue, isBot: false }
    setMessages((prev) => [...prev, newMessage])

    if (currentQuestion < questions.length) {
      const key = questions[currentQuestion].key as keyof ProductDescription
      setProductData((prev) => ({ ...prev, [key]: inputValue }))
    }

    setInputValue("")
    setCurrentQuestion((prev) => prev + 1)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-4 h-[400px] overflow-y-auto mb-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-[70%] p-3 rounded-lg ${message.isBot ? "bg-blue-100" : "bg-green-100"}`}>
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your answer here..."
            className="flex-grow"
          />
          <Button type="submit">Send</Button>
        </form>
      </CardContent>
    </Card>
  )
}

