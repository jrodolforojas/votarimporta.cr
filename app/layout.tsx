import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://votarimporta.cr"),
  title: {
    default: "Votar Importa | Elecciones Costa Rica 2026",
    template: "%s | Votar Importa",
  },
  description:
    "Descubrí a los candidatos presidenciales de Costa Rica 2026. Compará propuestas, explorá planes de gobierno y tomá una decisión informada. Tu voto decide el futuro.",
  generator: "v0.app",
  keywords: [
    "Costa Rica",
    "elecciones 2026",
    "candidatos presidenciales",
    "voto",
    "propuestas",
    "plan de gobierno",
    "votar",
    "democracia",
    "febrero 2026",
    "presidente Costa Rica",
  ],
  authors: [{ name: "Votar Importa" }],
  creator: "Votar Importa",
  publisher: "Votar Importa",
  openGraph: {
    type: "website",
    locale: "es_CR",
    url: "https://votarimporta.cr",
    siteName: "Votar Importa",
    title: "Votar Importa | Elecciones Costa Rica 2026",
    description:
      "Descubrí a los candidatos presidenciales de Costa Rica 2026. Compará propuestas y tomá una decisión informada.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Votar Importa - Elecciones Costa Rica 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Votar Importa | Elecciones Costa Rica 2026",
    description:
      "Descubrí a los candidatos presidenciales de Costa Rica 2026. Compará propuestas y tomá una decisión informada.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  alternates: {
    canonical: "https://votarimporta.cr",
  },
}

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
