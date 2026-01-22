/**
 * WCAG Color Contrast Utilities
 * Ensures text meets accessibility standards against background colors
 */

/**
 * Convert hex color to RGB values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

/**
 * Calculate relative luminance of a color
 * Based on WCAG 2.1 formula
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

/**
 * Calculate contrast ratio between two colors
 * Returns a value between 1 and 21
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)

  if (!rgb1 || !rgb2) return 1

  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b)
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b)

  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)

  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Determine if white or black text provides better contrast
 * Returns the color that meets WCAG AA standard (4.5:1 for normal text)
 */
export function getContrastColor(backgroundColor: string): "white" | "black" {
  const rgb = hexToRgb(backgroundColor)
  if (!rgb) return "black"

  const luminance = getLuminance(rgb.r, rgb.g, rgb.b)

  // If background is light (luminance > 0.179), use dark text
  // This threshold is based on WCAG recommendations
  return luminance > 0.179 ? "black" : "white"
}

/**
 * Check if a color combination meets WCAG AA standard
 * AA requires 4.5:1 for normal text, 3:1 for large text
 */
export function meetsWcagAA(
  foreground: string,
  background: string,
  isLargeText = false
): boolean {
  const ratio = getContrastRatio(foreground, background)
  return isLargeText ? ratio >= 3 : ratio >= 4.5
}

/**
 * Darken a hex color by a percentage
 */
function darkenColor(hex: string, percent: number): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex

  const factor = 1 - percent / 100
  const r = Math.round(rgb.r * factor)
  const g = Math.round(rgb.g * factor)
  const b = Math.round(rgb.b * factor)

  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
}

/**
 * Adjust a background color to ensure it meets WCAG AA contrast
 * with either white or black text
 */
export function adjustColorForContrast(
  backgroundColor: string,
  minRatio = 4.5
): { bg: string; text: "white" | "black" } {
  let bg = backgroundColor
  const preferredText = getContrastColor(bg)

  // Check if current combo meets standards
  const textHex = preferredText === "white" ? "#ffffff" : "#000000"
  let ratio = getContrastRatio(textHex, bg)

  // If it meets the standard, return as-is
  if (ratio >= minRatio) {
    return { bg, text: preferredText }
  }

  // Otherwise, darken the background to improve contrast with white text
  // (most party colors are bright, so we typically need to darken)
  let attempts = 0
  while (ratio < minRatio && attempts < 20) {
    bg = darkenColor(bg, 5)
    ratio = getContrastRatio("#ffffff", bg)
    attempts++
  }

  return { bg, text: "white" }
}
