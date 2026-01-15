'use client'

import { useEffect, useState } from 'react'

interface AccessibilityState {
  zoom: number
  biggerCursor: boolean
  invert: boolean
  contrast: number // 0-200
  brightness: number // 0-200
  grayscale: boolean
}

const defaultState: AccessibilityState = {
  zoom: 100,
  biggerCursor: false,
  invert: false,
  contrast: 100,
  brightness: 100,
  grayscale: false,
}

export function useAccessibility() {
  const [state, setState] = useState<AccessibilityState>(defaultState)

  // Apply accessibility styles to document
  useEffect(() => {
    const styleId = 'accessibility-styles'
    let styleElement = document.getElementById(styleId) as HTMLStyleElement

    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = styleId
      document.head.appendChild(styleElement)
    }

    const filters: string[] = []
    
    if (state.invert) {
      filters.push('invert(1)')
    }
    if (state.contrast !== 100) {
      filters.push(`contrast(${state.contrast}%)`)
    }
    if (state.brightness !== 100) {
      filters.push(`brightness(${state.brightness}%)`)
    }
    if (state.grayscale) {
      filters.push('grayscale(1)')
    }

    const filterValue = filters.length > 0 ? filters.join(' ') : 'none'

    // Custom cursor SVG - URL encoded for use in data URI (extra large size: 96x96)
    const cursorSvg = state.biggerCursor
      ? encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="30 30 55 30" width="96" height="96"><g><path d="M83,47.53l-.07-.07V46H81.52L81.45,46V44.55H80L80,44.48V43.06H78.55L78.48,43V41.58H77.06L77,41.51V40.09H75.57L75.5,40V38.6H74.08L74,38.53V37.11H72.59L72.52,37V35.62H71.11L71,35.55V34.14H69.62l-.07-.07V32.65H68.13l-.07-.07V31.16H66.57V56.45h3V55l.07-.07H71V53.55l.07-.07h1.41V52.06l.07-.07h1.35l.07.07V55h1.42l.07.07v2.9h1.42L77,58v1.42h3V58l.07-.07h1.42V55H80L80,54.9V52H78.55l-.07-.07V50.5h6v-3ZM78.48,49H77v3H78.4l.08.07V55h1.41L80,55v2.83l-.07.07H77.06L77,57.87V55H75.57l-.07-.07V52H74.08L74,51.92V50.5H72.52v1.42l-.07.07H71v1.42l-.07.07H69.55V54.9l-.07.07H68.06V34.14h1.42l.07.07v1.41H71l.07.07v1.42h1.41l.07.07V38.6h1.42l.07.07v1.42h1.42l.07.07v1.42h1.42l.07.07v1.41H78.4l.08.07v1.42h1.41l.07.07V46h1.42l.07.07v1.42h1.42l.07.07V49Z" fill="black"/></g></svg>'
        )
      : ''

    styleElement.textContent = `
      html {
        zoom: ${state.zoom}%;
      }
      ${state.biggerCursor && cursorSvg ? `
      * {
        cursor: url('data:image/svg+xml;utf8,${cursorSvg}') 48 48, pointer !important;
      }
      button, a, [role="button"], [tabindex="0"] {
        cursor: url('data:image/svg+xml;utf8,${cursorSvg}') 48 48, pointer !important;
      }
      ` : ''}
      body {
        filter: ${filterValue};
        transition: filter 0.3s ease;
      }
      /* Ensure portals and dialogs are never affected by filters - high specificity */
      body > [data-radix-portal],
      body > [data-radix-portal] *,
      [data-radix-portal],
      [data-radix-portal] *,
      [data-radix-dialog-overlay],
      [data-radix-dialog-content],
      [data-radix-dialog-overlay] *,
      [data-radix-dialog-content] *,
      [role="dialog"],
      [role="dialog"] *,
      .accessibility-modal-content,
      .accessibility-modal-content * {
        filter: none !important;
        backdrop-filter: none !important;
        transform: none !important;
      }
    `

    return () => {
      // Don't remove the style element, just reset it if needed
    }
  }, [state])

  const setZoom = (zoom: number) => {
    const clampedZoom = Math.max(50, Math.min(200, zoom))
    setState((prev) => ({ ...prev, zoom: clampedZoom }))
  }

  const zoomIn = () => {
    setState((prev) => {
      const newZoom = Math.min(200, prev.zoom + 10)
      return { ...prev, zoom: newZoom }
    })
  }

  const zoomOut = () => {
    setState((prev) => {
      const newZoom = Math.max(50, prev.zoom - 10)
      return { ...prev, zoom: newZoom }
    })
  }

  const toggleBiggerCursor = () => {
    setState((prev) => ({ ...prev, biggerCursor: !prev.biggerCursor }))
  }

  const toggleInvert = () => {
    setState((prev) => ({ ...prev, invert: !prev.invert }))
  }

  const setContrast = (contrast: number) => {
    const clampedContrast = Math.max(50, Math.min(200, contrast))
    setState((prev) => ({ ...prev, contrast: clampedContrast }))
  }

  const increaseContrast = () => {
    setState((prev) => {
      const newContrast = Math.min(200, prev.contrast + 10)
      return { ...prev, contrast: newContrast }
    })
  }

  const decreaseContrast = () => {
    setState((prev) => {
      const newContrast = Math.max(50, prev.contrast - 10)
      return { ...prev, contrast: newContrast }
    })
  }

  const setBrightness = (brightness: number) => {
    const clampedBrightness = Math.max(50, Math.min(200, brightness))
    setState((prev) => ({ ...prev, brightness: clampedBrightness }))
  }

  const increaseBrightness = () => {
    setState((prev) => {
      const newBrightness = Math.min(200, prev.brightness + 10)
      return { ...prev, brightness: newBrightness }
    })
  }

  const decreaseBrightness = () => {
    setState((prev) => {
      const newBrightness = Math.max(50, prev.brightness - 10)
      return { ...prev, brightness: newBrightness }
    })
  }

  const toggleGrayscale = () => {
    setState((prev) => ({ ...prev, grayscale: !prev.grayscale }))
  }

  const undoChanges = () => {
    setState(defaultState)
  }

  return {
    state,
    zoomIn,
    zoomOut,
    toggleBiggerCursor,
    toggleInvert,
    increaseContrast,
    decreaseContrast,
    setContrast,
    increaseBrightness,
    decreaseBrightness,
    setBrightness,
    toggleGrayscale,
    undoChanges,
  }
}

