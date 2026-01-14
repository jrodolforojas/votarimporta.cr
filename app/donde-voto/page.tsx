import { Suspense } from "react"
import { DondeVotoContent } from "@/components/donde-voto-content"
import { MobileNav } from "@/components/mobile-nav"

export default function DondeVotoPage() {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Suspense fallback={null}>
        <MobileNav />
      </Suspense>

      <Suspense fallback={null}>
        <DondeVotoContent />
      </Suspense>
    </div>
  )
}
