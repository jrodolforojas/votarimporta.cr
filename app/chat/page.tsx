import { Suspense } from "react"
import { MobileNav } from "@/components/mobile-nav"
import { ChatContent } from "@/components/chat-content"

export default function ChatPage() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col pb-20 md:min-h-[calc(100vh-4rem)] md:pb-0">
      <MobileNav />
      <Suspense
        fallback={
          <div className="flex flex-1 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        }
      >
        <ChatContent />
      </Suspense>
    </div>
  )
}
