'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useAccessibility } from '@/hooks/use-accessibility'
import {
  ZoomIn,
  ZoomOut,
  MousePointer2,
  Undo2,
} from 'lucide-react'

interface AccessibilityButtonProps {
  onOpenChange?: (open: boolean) => void
}

export function AccessibilityButton({ onOpenChange }: AccessibilityButtonProps = {}) {
  const [open, setOpen] = useState(false)
  const accessibility = useAccessibility()

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => handleOpenChange(true)}
        className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 md:bottom-6 md:right-6"
        aria-label="Abrir opciones de accesibilidad"
      >
        <svg
          viewBox="0 2 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 fill-current"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <circle cx="12" cy="4" r="2" />
          <path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.01 0-.01-.01-.02-.01H13c-.35-.2-.75-.3-1.19-.26C10.76 7.11 10 8.04 10 9.09V15c0 1.1.9 2 2 2h5v5h2v-5.5c0-1.1-.9-2-2-2h-3v-3.45c1.29 1.07 3.25 1.94 5 1.95zm-6.17 5c-.41 1.16-1.52 2-2.83 2-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V12.1c-2.28.46-4 2.48-4 4.9 0 2.76 2.24 5 5 5 2.42 0 4.44-1.72 4.9-4h-2.07z" />
        </svg>
      </button>

      {/* Modal */}
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Opciones de Accesibilidad</DialogTitle>
            <DialogDescription>
              Ajustá la visualización del sitio según tus necesidades
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            {/* Zoom In */}
            <Button
              variant="outline"
              className="flex h-auto flex-col gap-2 py-4"
              onClick={accessibility.zoomIn}
            >
              <ZoomIn className="h-6 w-6" />
              <span className="text-sm">Zoom In</span>
            </Button>

            {/* Zoom Out */}
            <Button
              variant="outline"
              className="flex h-auto flex-col gap-2 py-4"
              onClick={accessibility.zoomOut}
            >
              <ZoomOut className="h-6 w-6" />
              <span className="text-sm">Zoom Out</span>
            </Button>

            {/* Bigger Cursor */}
            <Button
              variant={accessibility.state.biggerCursor ? 'default' : 'outline'}
              className="flex h-auto flex-col gap-2 py-4"
              onClick={accessibility.toggleBiggerCursor}
            >
              <MousePointer2 className="h-6 w-6" />
              <span className="text-sm">Cursor Grande</span>
            </Button>

            {/* Undo Changes */}
            <Button
              variant="outline"
              className="flex h-auto flex-col gap-2 py-4"
              onClick={accessibility.undoChanges}
            >
              <Undo2 className="h-6 w-6" />
              <span className="text-sm">Deshacer</span>
            </Button>
          </div>

          {/* Additional controls for fine-tuning */}
          <div className="space-y-4 border-t pt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Zoom: {accessibility.state.zoom}%</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

