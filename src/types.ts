export type LightingStyle = 'traditional' | 'bistro' | 'holiday'

export type PropertyType = 'home' | 'commercial' | 'landscape'

export type FixtureKind =
  | 'path'
  | 'uplight'
  | 'spotlight'
  | 'wallwash'
  | 'bollard'
  | 'well'
  | 'step'
  | 'string'
  | 'holiday'
  | 'flood'

export type LightColorMode = 'kelvin' | 'multicolor' | 'solid'

export interface FixtureTemplate {
  id: string
  name: string
  kind: FixtureKind
  styles: LightingStyle[]
  description: string
  defaultKelvin: number
  defaultIntensity: number
  defaultBeam: number
  maxLumens: number
  colorMode?: LightColorMode
  defaultHue?: number
}

export interface PlacedFixture {
  id: string
  templateId: string
  name: string
  kind: FixtureKind
  x: number
  y: number
  kelvin: number
  intensity: number
  beam: number
  rotation: number
  maxLumens: number
  colorMode: LightColorMode
  hue: number
  span: number
}

export interface Site {
  widthM: number
  depthM: number
  propertyType: PropertyType
  label: string
}

export interface PropertyTemplate {
  id: string
  name: string
  propertyType: PropertyType
  description: string
  site: Site
  features: SiteFeature[]
}

export type SiteFeatureKind = 'building' | 'path' | 'lawn' | 'tree' | 'patio' | 'drive' | 'garden'

export interface SiteFeature {
  id: string
  kind: SiteFeatureKind
  x: number
  y: number
  w: number
  h: number
  label?: string
}

export interface StylePreset {
  id: LightingStyle
  name: string
  description: string
  accent: string
}
