"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Send, Hash } from "lucide-react"
import { CircularNav } from "@/components/CircularNav"


// Simulated data for forums and messages
const forums = [
  { id: 1, name: "Safe Space" },
  { id: 2, name: "You are Not Alone" },
  { id: 3, name: "Strength in Sisterhood" },
  { id: 4, name: "Healing Together" },
]

const initialMessages = [
  // { id: 1, forumId: 1, user: "", content: "" },
  { id: 1, forumId: 1, user: "Priya P.", content: "Welcome to Safe Space. This is a judgment-free zone where you can share your thoughts, experiences, and emotions. You are not alone. 💜" },
  { id: 2, forumId: 1, user: "Victoria A.", content: "I’ve been feeling overwhelmed lately. It helps to know there’s a place to talk." },
  { id: 3, forumId: 2, user: "Lily S.", content: "You are not alone. Whether you're here to listen, vent, or just feel seen, we’re in this together. 💖" },
  { id: 4, forumId: 3, user: "Isabella G.", content: "Welcome to Strength in Sisterhood! 💜 This is a space for us to uplift, support, and empower each other. No one should walk this journey alone—together, we rise. ✨" },
]

export default function CommunityForum() {
  const [activeForum, setActiveForum] = useState(forums[0])
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  const sendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        forumId: activeForum.id,
        user: "You",
        content: newMessage.trim(),
      }
      setMessages([...messages, newMsg])
      setNewMessage("")
    }
  }

  return (
    <div className="flex h-screen">
      {/* Forum List */}
      <div className="w-64  border-r">
        <div className="p-4 font-semibold text-lg border-b">Forums</div>
        <ScrollArea className="h-[calc(100vh-60px)]">
          {forums.map((forum) => (
            <button
              key={forum.id}
              onClick={() => setActiveForum(forum)}
              className={`flex items-center w-full p-3 hover:bg-gray-100 ${
                activeForum.id === forum.id ? "bg-gray-100" : ""
              }`}
            >
              <Hash className="mr-2 h-5 w-5" />
              <span className="truncate">{forum.name}</span>
            </button>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Forum Header */}
        <div className="bg-white p-4 border-b flex items-center">
          <h2 className="text-xl font-semibold">{activeForum.name}</h2>
          <div className="ml-auto flex items-center">
            <Users className="h-5 w-5 mr-2" />
            <span>{messages.filter((m) => m.forumId === activeForum.id).length} participants</span>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          {messages
            .filter((m) => m.forumId === activeForum.id)
            .map((message) => (
              <div key={message.id} className={`flex items-start mb-4 ${message.user === "You" ? "justify-end" : ""}`}>
                {message.user !== "You" && (
                  <Avatar className="mr-3">
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.user}`} />
                    <AvatarFallback>{message.user[0]}</AvatarFallback>
                  </Avatar>
                )}
                <div className={`max-w-[70%] ${message.user === "You" ? "text-right" : ""}`}>
                  <div className="font-semibold">{message.user}</div>
                  <div
                    className={`p-3 rounded-lg shadow mt-1 ${
                      message.user === "You" ? "bg-blue-500 text-white" : "bg-white"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
                {message.user === "You" && (
                  <Avatar className="ml-3">
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.user}`} />
                    <AvatarFallback>{message.user[0]}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
        </ScrollArea>

        {/* Message Input */}
        <div className="bg-white p-4 border-t flex items-center">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 mr-3"
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
      {/* Circular Navigation */}
      <CircularNav currentPage="/community" />
    </div>
  )
}

