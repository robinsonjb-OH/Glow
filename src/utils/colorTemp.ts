/** Approximate Kelvin → RGB for warm/cool light visualization. */
export function kelvinToRgb(kelvin: number): { r: number; g: number; b: number } {
  const temp = Math.max(1000, Math.min(12000, kelvin)) / 100

  let r: number
  let g: number
  let b: number

  if (temp <= 66) {
    r = 255
    g = Math.max(0, Math.min(255, 99.4708025861 * Math.log(temp) - 161.1195681661))
  } else {
    r = Math.max(0, Math.min(255, 329.698727446 * Math.pow(temp - 60, -0.1332047592)))
    g = Math.max(0, Math.min(255, 288.1221695283 * Math.pow(temp - 60, -0.0755148492)))
  }

  if (temp >= 66) {
    b = 255
  } else if (temp <= 19) {
    b = 0
  } else {
    b = Math.max(0, Math.min(255, 138.5177312231 * Math.log(temp - 10) - 305.0447927307))
  }

  return { r: Math.round(r), g: Math.round(g), b: Math.round(b) }
}

export function kelvinToCss(kelvin: number, alpha = 1): string {
  const { r, g, b } = kelvinToRgb(kelvin)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function kelvinLabel(kelvin: number): string {
  if (kelvin < 3000) return 'Warm amber'
  if (kelvin < 4000) return 'Soft white'
  if (kelvin < 5000) return 'Neutral'
  if (kelvin < 6000) return 'Cool daylight'
  return 'Clear sky'
}
