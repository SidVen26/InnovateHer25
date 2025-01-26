"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { CircularNav } from "@/components/CircularNav"
import Groq from "groq-sdk"

interface ChatMessage {
  role: "user" | "assistant" | "system"
  content: string
}

export function ChatBot() {
  const [inputValue, setInputValue] = useState("")
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "system",
      content:
        "Be a chatbot focused on providing calm, quick concise responses to help to women who are expressing need in a time of crisis. Crises include domestic violence, birth control/abortion care, access to women's shelters due to expected homelessness, and advice on dealing with unsafe situations.",
    },
    {
      role: "assistant",
      content:
        "Welcome to Safe Space. I'm here to provide support and information. In addition to our chat, we offer several other helpful features:\n\n" +
        "1. Community Forum: Connect with others for support and shared experiences.\n" +
        "2. Helpful Links: Access resources and information on various topics.\n" +
        "3. Location Services: Find nearby shelters and support centers.\n\n" +
        "You can access these features using the circular navigation menu in the bottom-left corner of the screen. How can I assist you today?",
    },
  ])
  const [loading, setLoading] = useState(false)
  const [isChatVisible, setIsChatVisible] = useState(true)

  const toggleChatVisibility = () => {
    setIsChatVisible((prev) => !prev)
  }

  const handleSend = async () => {
    if (inputValue.trim() === "") return

    setLoading(true)

    const newUserMessage: ChatMessage = {
      role: "user",
      content: inputValue,
    }

    const updatedMessages = [...chatMessages, newUserMessage]

    try {
      const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY
      if (!apiKey) {
        throw new Error("API Key is missing")
      }

      const groq = new Groq({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true,
      })

      const chatCompletion = await groq.chat.completions.create({
        messages: updatedMessages,
        model: "llama-3.3-70b-versatile",
        temperature: 1,
        max_completion_tokens: 1024,
        top_p: 1,
        stream: false,
        stop: null,
      })

      const responseContent = chatCompletion.choices[0]?.message?.content || "No response"

      const newAssistantMessage: ChatMessage = {
        role: "assistant",
        content: responseContent,
      }

      setChatMessages([...updatedMessages, newAssistantMessage])
    } catch (error) {
      console.error("Error fetching chat completion:", error)
      const errorMessage: ChatMessage = {
        role: "assistant",
        content: "There was an error processing your request. Please try again later.",
      }
      setChatMessages([...updatedMessages, errorMessage])
    } finally {
      setLoading(false)
      setInputValue("")
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold">Safe Space</h1>
      </div>

      <div className="p-4">
        <Button onClick={toggleChatVisibility}>{isChatVisible ? "Hide Chat" : "Show Chat"}</Button>
      </div>

      {isChatVisible && (
        <div className="flex-1 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1 p-4">
            {chatMessages
              .filter((message) => message.role !== "system")
              .map((message, index) => (
                <div key={index} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <p>
                      <strong>{message.role === "user" ? "You" : "Assistant"}:</strong> {message.content}
                    </p>
                  </div>
                </div>
              ))}
          </ScrollArea>

          <div className="p-4 border-t bg-white">
            <div className="flex items-center">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 mr-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
              <Button onClick={handleSend} disabled={loading}>
                {loading ? "Sending..." : "Send"}
              </Button>
            </div>
          </div>
        </div>
      )}

      <CircularNav currentPage="/chatBot" />
    </div>
  )
}

