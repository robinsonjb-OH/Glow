export type FixtureKind =
  | 'recessed'
  | 'pendant'
  | 'sconce'
  | 'track'
  | 'floor'
  | 'linear'

export interface FixtureTemplate {
  id: string
  name: string
  kind: FixtureKind
  description: string
  defaultKelvin: number
  defaultIntensity: number
  defaultBeam: number
  maxLumens: number
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
}

export interface Room {
  widthM: number
  depthM: number
  ceilingM: number
  wallColor: string
  floorTone: number
}

export interface ScenePreset {
  id: string
  name: string
  description: string
  apply: (fixtures: PlacedFixture[]) => PlacedFixture[]
}
