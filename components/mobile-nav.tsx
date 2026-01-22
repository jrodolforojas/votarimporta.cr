"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu, X, Users, Swords, Home, Calendar, MapPin, ExternalLink, BookOpen } from "lucide-react"

const navItems = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/candidatos", label: "Candidatos", icon: Users },
  { href: "/comparar", label: "Comparar", icon: Swords },
  { href: "/debates", label: "Debates", icon: Calendar },
  { href: "/guia", label: "Guia", icon: BookOpen },
]

const TSE_URL = "https://www.tse.go.cr/dondevotar/donde-votar.aspx"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl" role="img" aria-label="Costa Rica">
              🇨🇷
            </span>
            <span className="font-semibold">Votar Importa</span>
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] p-0">
                <SheetTitle className="sr-only">Menu de navegacion</SheetTitle>
                <div className="flex h-14 items-center justify-between border-b px-4">
                  <span className="font-semibold">Menu</span>
                  <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <nav className="flex flex-col gap-1 p-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-3 text-base transition-colors",
                        pathname === item.href ? "bg-foreground text-background" : "hover:bg-muted",
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  ))}
                  <div className="my-2 border-t border-border" />
                  <a
                    href={TSE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-base text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <MapPin className="h-5 w-5" />
                    Donde Voto?
                    <ExternalLink className="h-4 w-4 ml-auto" />
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="sticky top-0 z-50 hidden w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:block">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <span className="text-3xl" role="img" aria-label="Costa Rica">
              🇨🇷
            </span>
            <span className="text-lg font-semibold">Votar Importa</span>
          </Link>

          {/* Navigation + Utility - Right */}
          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    pathname === item.href ? "bg-foreground text-background" : "hover:bg-muted",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Utility Links */}
            <div className="flex items-center gap-2 shrink-0 border-l border-border pl-4">
              <a
                href={TSE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <MapPin className="h-4 w-4" />
                <span className="hidden lg:inline">Donde Voto?</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background md:hidden">
        <div className="flex h-16 items-center justify-around">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 text-xs transition-colors",
                pathname === item.href ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <item.icon className={cn("h-5 w-5", pathname === item.href && "fill-current")} />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  )
}
