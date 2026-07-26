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
  if (kelvin < 2700) return 'Candle warm'
  if (kelvin < 3000) return 'Warm landscape'
  if (kelvin < 3500) return 'Soft white'
  if (kelvin < 4500) return 'Neutral exterior'
  return 'Cool flood'
}

export function hueToRgb(hue: number): { r: number; g: number; b: number } {
  const h = ((hue % 360) + 360) % 360 / 60
  const c = 1
  const x = 1 - Math.abs((h % 2) - 1)
  let r = 0
  let g = 0
  let b = 0
  if (h < 1) [r, g, b] = [c, x, 0]
  else if (h < 2) [r, g, b] = [x, c, 0]
  else if (h < 3) [r, g, b] = [0, c, x]
  else if (h < 4) [r, g, b] = [0, x, c]
  else if (h < 5) [r, g, b] = [x, 0, c]
  else [r, g, b] = [c, 0, x]
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  }
}

export function fixtureRgb(fixture: {
  colorMode: string
  kelvin: number
  hue: number
}): { r: number; g: number; b: number } {
  if (fixture.colorMode === 'kelvin') return kelvinToRgb(fixture.kelvin)
  return hueToRgb(fixture.hue)
}

export const HOLIDAY_PALETTE = [
  { r: 220, g: 48, b: 48 },
  { r: 48, g: 170, b: 72 },
  { r: 240, g: 200, b: 64 },
  { r: 56, g: 110, b: 220 },
  { r: 220, g: 90, b: 180 },
]
