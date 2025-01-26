"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Heart, AlertTriangle, Baby, Home, Brain, UserX, Rainbow, Scale, Phone, Globe } from "lucide-react"
import { CircularNav } from "@/components/CircularNav"

type ResourceType = {
  id: string
  name: string
  icon: any
  content: {
    title: string
    phone?: string
    website?: string
    text?: string
    services?: string
  }[]
}

const resourceData: ResourceType[] = [
  {
    id: "domestic-violence",
    name: "Domestic Violence",
    icon: Heart,
    content: [
      {
        title: "National Domestic Violence Hotline (USA)",
        phone: "1-800-799-SAFE (7233)",
        website: "https://www.thehotline.org",
        text: 'Text "START" to 88788',
        services: "24/7 confidential support, safety planning, and referrals to local shelters.",
      },
      {
        title: "Women's Aid (UK)",
        phone: "0808 2000 247",
        website: "https://www.womensaid.org.uk",
      },
      {
        title: "Domestic Violence Resource Center (Australia)",
        phone: "1800RESPECT (1800 737 732)",
        website: "https://www.1800respect.org.au",
      },
    ],
  },
  {
    id: "sexual-assault",
    name: "Sexual Assault",
    icon: AlertTriangle,
    content: [
      {
        title: "RAINN (Rape, Abuse & Incest National Network)",
        phone: "1-800-656-HOPE (4673)",
        website: "https://www.rainn.org",
        services: "Free, confidential support for survivors of sexual violence.",
      },
      {
        title: "NSVRC (National Sexual Violence Resource Center)",
        website: "https://www.nsvrc.org",
      },
    ],
  },
  {
    id: "reproductive-health",
    name: "Reproductive Health",
    icon: Baby,
    content: [
      {
        title: "Planned Parenthood",
        phone: "1-800-230-PLAN (7526)",
        website: "https://www.plannedparenthood.org",
        services: "Reproductive healthcare, abortion access, and birth control resources.",
      },
      {
        title: "Aid Access",
        website: "https://aidaccess.org",
        services: "Online abortion pill access and consultations.",
      },
      {
        title: "National Abortion Federation (NAF)",
        phone: "1-800-772-9100 (USA & Canada)",
        website: "https://prochoice.org",
      },
      {
        title: "I Need An A",
        website: "https://www.ineedana.com",
        services: "Help finding local abortion providers.",
      },
    ],
  },
  {
    id: "homelessness",
    name: "Homelessness",
    icon: Home,
    content: [
      {
        title: "National Coalition for the Homeless",
        website: "https://nationalhomeless.org",
      },
      {
        title: "ShelterSafe (Canada)",
        website: "https://www.sheltersafe.ca",
        services: "Directory of women's shelters across Canada.",
      },
      {
        title: "Homeless Hotline (USA)",
        phone: "211",
        services: "Connects callers to nearby shelters and housing resources.",
      },
    ],
  },
  {
    id: "mental-health",
    name: "Mental Health",
    icon: Brain,
    content: [
      {
        title: "Crisis Text Line",
        text: 'Text "HOME" to 741741 (USA/Canada)',
        website: "https://www.crisistextline.org",
      },
      {
        title: "Suicide & Crisis Lifeline (USA)",
        phone: "988",
        website: "https://988lifeline.org",
      },
      {
        title: "Samaritans (UK)",
        phone: "116 123",
        website: "https://www.samaritans.org",
      },
      {
        title: "Beyond Blue (Australia)",
        phone: "1300 22 4636",
        website: "https://www.beyondblue.org.au",
      },
    ],
  },
  {
    id: "trafficking",
    name: "Trafficking & Exploitation",
    icon: UserX,
    content: [
      {
        title: "National Human Trafficking Hotline (USA)",
        phone: "1-888-373-7888",
        text: 'Text "HELP" or "INFO" to 233733',
        website: "https://humantraffickinghotline.org",
      },
      {
        title: "Polaris Project",
        website: "https://polarisproject.org",
        services: "Resources for victims of human trafficking.",
      },
    ],
  },
  {
    id: "lgbtq",
    name: "LGBTQ+ Resources",
    icon: Rainbow,
    content: [
      {
        title: "Trevor Project (LGBTQ+ Youth)",
        phone: "1-866-488-7386",
        website: "https://www.thetrevorproject.org",
        services: "Crisis intervention and suicide prevention for LGBTQ+ youth.",
      },
      {
        title: "GLAAD LGBTQ+ Resource List",
        website: "https://www.glaad.org/resourcelist",
      },
    ],
  },
  {
    id: "legal",
    name: "Legal Assistance",
    icon: Scale,
    content: [
      {
        title: "WomensLaw.org",
        website: "https://www.womenslaw.org",
        services: "Legal information and resources for survivors of abuse.",
      },
    ],
  },
  {
    id: "general",
    name: "General Crisis Resources",
    icon: Phone,
    content: [
      {
        title: "United Way 211",
        phone: "Dial 211",
        website: "https://www.211.org",
        services: "Provides access to local services like shelters, mental health, food banks, etc.",
      },
    ],
  },
  {
    id: "international",
    name: "International Resources",
    icon: Globe,
    content: [
      {
        title: "UN Women (Global Resource)",
        website: "https://www.unwomen.org",
        services: "Advocacy and resources for women's empowerment globally.",
      },
      {
        title: "Refuge (UK)",
        phone: "0808 2000 247",
        website: "https://www.refuge.org.uk",
      },
    ],
  },
]

function Navbar() {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <nav className={`bg-white shadow-md transition-all ${isSticky ? "sticky top-0 z-10" : ""}`}>
      <div className="container mx-auto px-4">
        <ul className="flex flex-wrap justify-center py-4">
          {resourceData.map((item) => (
            <li key={item.id} className="mx-2 my-1">
              <Link href={`#${item.id}`} className="flex items-center p-2 rounded-lg hover:bg-gray-100 text-sm">
                <item.icon className="w-4 h-4 mr-2" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

function ResourceSection({ resource }: { resource: ResourceType }) {
  return (
    <section id={resource.id} className="mb-12 scroll-mt-16">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <resource.icon className="w-6 h-6 mr-2" />
          {resource.name}
        </h2>
        <div className="prose max-w-none">
          {resource.content.map((item, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              {item.phone && (
                <p>
                  <strong>Phone:</strong> {item.phone}
                </p>
              )}
              {item.website && (
                <p>
                  <strong>Website:</strong>{" "}
                  <a
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {item.website}
                  </a>
                </p>
              )}
              {item.text && (
                <p>
                  <strong>Text:</strong> {item.text}
                </p>
              )}
              {item.services && (
                <p>
                  <strong>Services:</strong> {item.services}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Links() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Crisis Resources</h1>
        {resourceData.map((resource) => (
          <ResourceSection key={resource.id} resource={resource} />
        ))}
      </main>
      <CircularNav currentPage="/links" />
    </div>
  )
}

