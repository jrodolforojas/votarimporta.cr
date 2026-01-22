"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"
import type { Candidato } from "@/lib/data"
import { useState } from "react"

interface CandidateCardProps {
  candidato: Candidato
}

export function CandidateCard({ candidato }: CandidateCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getGradientStyle = () => {
    const colors = candidato.colores || [candidato.color]

    const nonWhiteColors = colors.filter(
      (c) => c.toLowerCase() !== "#ffffff" && c.toLowerCase() !== "#fff" && c.toLowerCase() !== "white",
    )

    // If only one non-white color (single color or color + white), use solid gradient with the main color
    if (nonWhiteColors.length <= 1) {
      const mainColor = nonWhiteColors[0] || colors[0]
      return `linear-gradient(135deg, ${mainColor} 0%, ${mainColor}dd 50%, ${mainColor}99 100%)`
    }

    // Create gradient from all colors
    const colorStops = colors
      .map((color, index) => {
        const percent = (index / (colors.length - 1)) * 100
        return `${color} ${percent}%`
      })
      .join(", ")

    return `linear-gradient(135deg, ${colorStops})`
  }

  return (
    <Link href={`/candidatos/${candidato.id}`}>
      <Card
        className="group overflow-hidden transition-all duration-300 hover:shadow-lg"
        style={{
          background: isHovered ? getGradientStyle() : undefined,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            {/* Circular avatar on the left */}
            <div
              className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 bg-background"
              style={{ borderColor: candidato.color }}
            >
              <Image src={candidato.foto || "/placeholder.svg"} alt={candidato.nombre} fill className="object-cover" />
            </div>

            {/* Content on the right */}
            <div className="flex-1 min-w-0">
              <h3
                className={`font-semibold truncate transition-colors duration-300 ${isHovered ? "text-white" : "text-foreground"}`}
              >
                {candidato.nombre}
              </h3>
              <p
                className={`text-sm truncate transition-colors duration-300 ${isHovered ? "text-white/80" : "text-muted-foreground"}`}
              >
                {candidato.partido}
              </p>

              {/* Tags/badges */}
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Badge
                  variant="secondary"
                  className={`text-xs transition-colors duration-300 ${isHovered ? "bg-white/20 text-white border-white/30" : "text-white"}`}
                  style={{ backgroundColor: isHovered ? undefined : candidato.color }}
                >
                  {candidato.partidoSiglas}
                </Badge>
                {/* {areaTags.map((area) => (
                  <Badge
                    key={area}
                    variant="outline"
                    className={`text-xs transition-colors duration-300 ${isHovered ? "border-white/50 text-white" : ""}`}
                  >
                    {area}
                  </Badge>
                ))} */}
              </div>
            </div>

            {/* Chevron */}
            <ChevronRight
              className={`h-5 w-5 shrink-0 transition-all duration-300 group-hover:translate-x-1 ${isHovered ? "text-white" : "text-muted-foreground"}`}
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
