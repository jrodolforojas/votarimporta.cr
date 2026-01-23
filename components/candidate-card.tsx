"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight, FileText, User } from "lucide-react"
import type { Candidato } from "@/lib/data"
import { useState } from "react"
import { getContrastColor } from "@/lib/contrast"

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

  // Get accessible text color for the party badge
  const badgeTextColor = getContrastColor(candidato.color)

  return (
    <Card
      className="group overflow-hidden transition-all duration-300 hover:shadow-lg"
      style={{
        background: isHovered ? getGradientStyle() : undefined,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-3">
        <div className="flex items-start gap-3">
          {/* Circular avatar on the left - smaller */}
          <Link href={`/candidatos/${candidato.id}`} className="shrink-0">
            <div
              className="relative h-12 w-12 overflow-hidden rounded-full border-2 bg-background"
              style={{ borderColor: candidato.color }}
            >
              <Image src={candidato.foto || "/placeholder.svg"} alt={candidato.nombre} fill className="object-cover" />
            </div>
          </Link>

          {/* Content on the right */}
          <div className="flex-1 min-w-0">
            <Link href={`/candidatos/${candidato.id}`} className="block">
              <h3
                className={`font-semibold truncate transition-colors duration-300 text-sm ${isHovered ? "text-white" : "text-foreground"}`}
              >
                {candidato.nombre}
              </h3>
            </Link>

            {/* Tags/badges and Quick Actions */}
            <div className="mt-1.5 flex items-center justify-between gap-2">
              <Badge
                variant="secondary"
                className={`text-[10px] px-1.5 py-0 transition-colors duration-300 ${isHovered ? "bg-white/20 text-white border-white/30" : ""}`}
                style={{
                  backgroundColor: isHovered ? undefined : candidato.color,
                  color: isHovered ? undefined : badgeTextColor,
                }}
              >
                {candidato.partidoSiglas}
              </Badge>

              {/* Quick Action Buttons */}
              <div className="flex items-center gap-0.5" onClick={(e) => e.stopPropagation()}>
                {candidato.planGobiernoUrl && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-7 w-7 transition-colors ${isHovered ? "text-white/80 hover:text-white hover:bg-white/20" : "text-muted-foreground hover:text-foreground"}`}
                    asChild
                  >
                    <a
                      href={candidato.planGobiernoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Ver Plan de Gobierno"
                    >
                      <FileText className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-7 w-7 transition-colors ${isHovered ? "text-white/80 hover:text-white hover:bg-white/20" : "text-muted-foreground hover:text-foreground"}`}
                  asChild
                >
                  <Link href={`/candidatos/${candidato.id}`} title="Ver Perfil">
                    <User className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Chevron */}
          <Link href={`/candidatos/${candidato.id}`} className="shrink-0 self-center">
            <ChevronRight
              className={`h-5 w-5 transition-all duration-300 group-hover:translate-x-1 ${isHovered ? "text-white" : "text-muted-foreground"}`}
            />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
