"use client"

import React, { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { iconMap, defaultIcon } from "@/lib/icons"
import { Area } from "@/lib/data"

interface AreaFilterProps {
  areas: Area[]
  selectedArea: string | null
  onSelectArea: (areaId: string | null) => void
}

export function AreaFilter({ areas, selectedArea, onSelectArea }: AreaFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftFade, setShowLeftFade] = useState(false)
  const [showRightFade, setShowRightFade] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const checkScroll = () => {
      setShowLeftFade(el.scrollLeft > 0)
      setShowRightFade(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
    }

    checkScroll()
    el.addEventListener("scroll", checkScroll)
    window.addEventListener("resize", checkScroll)

    return () => {
      el.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [])

  const scrollLeft = () => {
    const el = scrollRef.current
    if (el) {
      el.scrollBy({ left: -100, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    const el = scrollRef.current
    if (el) {
      el.scrollBy({ left: 100, behavior: "smooth" })
    }
  }

  return (
    <div className="relative md:px-[60px]">
      {/* Left fade indicator and arrow */}
      {showLeftFade && (
        <>
        <div className="pointer-events-none absolute left-0 md:left-[60px] top-0 z-10 h-full w-8 bg-gradient-to-r from-background to-transparent" />
        <button
          onClick={scrollLeft}
          className="hidden md:block absolute cursor-pointer left-2 top-1/2 z-20 -translate-y-1/2 bg-card p-1 rounded-full shadow-md hover:bg-foreground hover:text-background"
        >
          {React.createElement(iconMap['chevron-left'])}
        </button>
        </>
      )}

      {/* Right fade indicator and arrow */}
      {showRightFade && (
        <>
        <div className="pointer-events-none absolute right-0 md:right-[60px] top-0 z-10 h-full w-8 bg-gradient-to-l from-background to-transparent" />
        <button
          onClick={scrollRight}
          className="hidden md:block absolute right-2 cursor-pointer top-1/2 z-20 -translate-y-1/2 bg-card p-1 rounded-full shadow-md hover:bg-foreground hover:text-background"
        >
           {React.createElement(iconMap['chevron-right'])}
        </button>
        </>
      )}

      <div
        ref={scrollRef}
        className="scrollbar-hide flex gap-2 overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* "Todas" option first */}
        <button
          onClick={() => onSelectArea(null)}
          className={cn(
            "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
            selectedArea === null
              ? "border-foreground bg-foreground text-background"
              : "border-border bg-card text-foreground hover:border-foreground/50",
          )}
        >
          Todas
        </button>

        {areas.map((area) => {
          const Icon = iconMap[area.icon] || defaultIcon
          const isSelected = selectedArea === area.area

          return (
            <button
              key={area.area}
              onClick={() => onSelectArea(area.area)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                isSelected
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-foreground hover:border-foreground/50",
              )}
            >
              <Icon className="h-4 w-4" />
              {area.area}
            </button>
          )
        })}
      </div>
    </div>
  )
}
