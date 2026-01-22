"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Filter, ArrowUpDown, X } from "lucide-react"

export type SortOrder = "az" | "za" | "random"

interface CandidateFilterBarProps {
  parties: { siglas: string; nombre: string; color: string }[]
  selectedParties: string[]
  onPartyChange: (parties: string[]) => void
  sortOrder: SortOrder
  onSortChange: (sort: SortOrder) => void
}

export function CandidateFilterBar({
  parties,
  selectedParties,
  onPartyChange,
  sortOrder,
  onSortChange,
}: CandidateFilterBarProps) {
  const handlePartyToggle = (partySiglas: string) => {
    if (selectedParties.includes(partySiglas)) {
      onPartyChange(selectedParties.filter((p) => p !== partySiglas))
    } else {
      onPartyChange([...selectedParties, partySiglas])
    }
  }

  const clearFilters = () => {
    onPartyChange([])
    onSortChange("random")
  }

  const hasActiveFilters = selectedParties.length > 0 || sortOrder !== "random"

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Party Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="mr-2 h-4 w-4" />
            Partido
            {selectedParties.length > 0 && (
              <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                {selectedParties.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          {parties.map((party) => (
            <DropdownMenuCheckboxItem
              key={party.siglas}
              checked={selectedParties.includes(party.siglas)}
              onCheckedChange={() => handlePartyToggle(party.siglas)}
            >
              <span
                className="mr-2 h-3 w-3 rounded-full shrink-0"
                style={{ backgroundColor: party.color }}
              />
              <span className="truncate">{party.nombre}</span>
              <span className="ml-auto text-xs text-muted-foreground">{party.siglas}</span>
            </DropdownMenuCheckboxItem>
          ))}
          {selectedParties.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={false}
                onCheckedChange={() => onPartyChange([])}
                className="text-muted-foreground"
              >
                Limpiar seleccion
              </DropdownMenuCheckboxItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sort Order */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-9">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            {sortOrder === "az" ? "A-Z" : sortOrder === "za" ? "Z-A" : "Aleatorio"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuCheckboxItem
            checked={sortOrder === "random"}
            onCheckedChange={() => onSortChange("random")}
          >
            Aleatorio
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={sortOrder === "az"}
            onCheckedChange={() => onSortChange("az")}
          >
            A-Z (Nombre)
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={sortOrder === "za"}
            onCheckedChange={() => onSortChange("za")}
          >
            Z-A (Nombre)
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Clear All Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          className="h-9 text-muted-foreground"
          onClick={clearFilters}
        >
          <X className="mr-1 h-4 w-4" />
          Limpiar
        </Button>
      )}
    </div>
  )
}
