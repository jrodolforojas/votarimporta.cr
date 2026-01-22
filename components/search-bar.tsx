"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Search, User, FileText, Tv, X } from "lucide-react"
import { candidatos } from "@/data/candidatos"
import { debates } from "@/data/debates"
import { cn } from "@/lib/utils"

interface SearchResult {
  type: "candidato" | "propuesta" | "debate"
  title: string
  subtitle: string
  href: string
  icon: React.ReactNode
}

function getSearchResults(query: string): SearchResult[] {
  if (!query || query.length < 2) return []

  const normalizedQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  const results: SearchResult[] = []

  // Search candidates
  candidatos.forEach((c) => {
    const normalizedName = c.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    const normalizedParty = c.partido.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

    if (normalizedName.includes(normalizedQuery) || normalizedParty.includes(normalizedQuery)) {
      results.push({
        type: "candidato",
        title: c.nombre,
        subtitle: c.partido,
        href: `/candidatos/${c.id}`,
        icon: <User className="h-4 w-4" />,
      })
    }

    // Search propuestas
    c.propuestas.forEach((area) => {
      area.propuestas.forEach((p) => {
        const normalizedProblema = p.problema.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        const normalizedSolucion = p.solucion.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

        if (normalizedProblema.includes(normalizedQuery) || normalizedSolucion.includes(normalizedQuery)) {
          // Only add if not already in results (avoid duplicates)
          const existing = results.find(
            (r) => r.type === "propuesta" && r.href === `/candidatos/${c.id}?area=${area.area}`
          )
          if (!existing) {
            results.push({
              type: "propuesta",
              title: p.problema.slice(0, 60) + (p.problema.length > 60 ? "..." : ""),
              subtitle: `${c.nombre} - ${area.area}`,
              href: `/candidatos/${c.id}?area=${area.area}`,
              icon: <FileText className="h-4 w-4" />,
            })
          }
        }
      })
    })
  })

  // Search debates
  debates.forEach((d) => {
    const normalizedHost = d.hostName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

    if (normalizedHost.includes(normalizedQuery)) {
      results.push({
        type: "debate",
        title: `Debate - ${d.hostName}`,
        subtitle: d.channels.join(", "),
        href: "/debates",
        icon: <Tv className="h-4 w-4" />,
      })
    }
  })

  // Limit results
  return results.slice(0, 8)
}

interface SearchBarProps {
  className?: string
  placeholder?: string
  onClose?: () => void
  autoFocus?: boolean
}

export function SearchBar({ className, placeholder = "Buscar candidato, propuesta o debate...", onClose, autoFocus }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      const searchResults = getSearchResults(query)
      setResults(searchResults)
      setSelectedIndex(0)
      setIsOpen(searchResults.length > 0)
    }, 150)

    return () => clearTimeout(timer)
  }, [query])

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
          break
        case "ArrowUp":
          e.preventDefault()
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
          break
        case "Enter":
          e.preventDefault()
          if (results[selectedIndex]) {
            router.push(results[selectedIndex].href)
            setQuery("")
            setIsOpen(false)
            onClose?.()
          }
          break
        case "Escape":
          setIsOpen(false)
          setQuery("")
          onClose?.()
          break
      }
    },
    [isOpen, results, selectedIndex, router, onClose]
  )

  const handleResultClick = (result: SearchResult) => {
    router.push(result.href)
    setQuery("")
    setIsOpen(false)
    onClose?.()
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          autoFocus={autoFocus}
          className="pl-10 pr-10"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("")
              setIsOpen(false)
              inputRef.current?.focus()
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Results dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 rounded-lg border border-border bg-popover p-1 shadow-lg">
          {results.map((result, index) => (
            <button
              key={`${result.type}-${result.href}-${index}`}
              onClick={() => handleResultClick(result)}
              className={cn(
                "flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors",
                index === selectedIndex
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent/50"
              )}
            >
              <span className="text-muted-foreground">{result.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="truncate font-medium text-sm">{result.title}</p>
                <p className="truncate text-xs text-muted-foreground">{result.subtitle}</p>
              </div>
              <span className="text-[10px] uppercase text-muted-foreground px-1.5 py-0.5 rounded bg-muted">
                {result.type === "candidato" ? "Candidato" : result.type === "propuesta" ? "Propuesta" : "Debate"}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* No results */}
      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 rounded-lg border border-border bg-popover p-4 shadow-lg text-center">
          <p className="text-sm text-muted-foreground">No se encontraron resultados para &quot;{query}&quot;</p>
        </div>
      )}
    </div>
  )
}
