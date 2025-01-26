"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, Link, MapPin, Users } from "lucide-react"
import { useRouter } from "next/navigation"

type NavItem = {
  icon: React.ReactNode
  href: string
  label: string
}

const navItems: NavItem[] = [
  { icon: <MessageCircle className="h-4 w-4" />, href: "/chatBot", label: "Chatbot" },
  { icon: <Link className="h-4 w-4" />, href: "/links", label: "Helpful Links" },
  { icon: <MapPin className="h-4 w-4" />, href: "/locator", label: "Locator" },
  { icon: <Users className="h-4 w-4" />, href: "/community", label: "Community" },
]

export function CircularNav({ currentPage }: { currentPage: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const filteredNavItems = navItems.filter((item) => item.href !== currentPage)

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Button
        className="rounded-full w-12 h-12 bg-primary text-primary-foreground hover:bg-primary/90"
        onClick={() => setIsOpen(!isOpen)}
      >
        {navItems.find((item) => item.href === currentPage)?.icon}
      </Button>
      {isOpen && (
        <div className="absolute bottom-16 left-0 bg-background rounded-full shadow-lg p-2 flex flex-col gap-2">
          {filteredNavItems.map((item, index) => (
            <Button
              key={index}
              className="rounded-full w-10 h-10"
              variant="ghost"
              onClick={() => {
                router.push(item.href)
                setIsOpen(false)
              }}
              title={item.label}
            >
              {item.icon}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

