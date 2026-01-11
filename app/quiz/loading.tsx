import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <div className="mx-auto max-w-2xl px-4 py-6 md:py-12">
        <Skeleton className="mb-6 h-4 w-full" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    </div>
  )
}
