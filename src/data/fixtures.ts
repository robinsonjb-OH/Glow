import type { FixtureTemplate, ScenePreset, PlacedFixture } from '../types'

export const FIXTURE_LIBRARY: FixtureTemplate[] = [
  {
    id: 'recessed-downlight',
    name: 'Recessed Downlight',
    kind: 'recessed',
    description: 'Clean ceiling wash for general ambient layers.',
    defaultKelvin: 3000,
    defaultIntensity: 0.72,
    defaultBeam: 55,
    maxLumens: 1200,
  },
  {
    id: 'glass-pendant',
    name: 'Glass Pendant',
    kind: 'pendant',
    description: 'Focal glow over tables and conversation zones.',
    defaultKelvin: 2700,
    defaultIntensity: 0.85,
    defaultBeam: 40,
    maxLumens: 800,
  },
  {
    id: 'wall-sconce',
    name: 'Wall Sconce',
    kind: 'sconce',
    description: 'Vertical accent for corridors and artwork.',
    defaultKelvin: 2700,
    defaultIntensity: 0.55,
    defaultBeam: 70,
    maxLumens: 600,
  },
  {
    id: 'track-spot',
    name: 'Track Spotlight',
    kind: 'track',
    description: 'Aimable beam for galleries and retail walls.',
    defaultKelvin: 3500,
    defaultIntensity: 0.9,
    defaultBeam: 24,
    maxLumens: 1500,
  },
  {
    id: 'floor-uplight',
    name: 'Floor Uplight',
    kind: 'floor',
    description: 'Indirect bounce for soft architectural drama.',
    defaultKelvin: 2700,
    defaultIntensity: 0.65,
    defaultBeam: 90,
    maxLumens: 1000,
  },
  {
    id: 'linear-cove',
    name: 'Linear Cove',
    kind: 'linear',
    description: 'Hidden edge wash that lifts ceiling planes.',
    defaultKelvin: 4000,
    defaultIntensity: 0.48,
    defaultBeam: 120,
    maxLumens: 2000,
  },
]

export const SCENE_PRESETS: ScenePreset[] = [
  {
    id: 'evening',
    name: 'Evening Lounge',
    description: 'Warm, low, intimate.',
    apply: (fixtures) =>
      fixtures.map((f) => ({
        ...f,
        kelvin: Math.min(f.kelvin, 2700),
        intensity: Math.max(0.25, f.intensity * 0.55),
      })),
  },
  {
    id: 'task',
    name: 'Task Focus',
    description: 'Brighter, cooler work light.',
    apply: (fixtures) =>
      fixtures.map((f) => ({
        ...f,
        kelvin: f.kind === 'track' || f.kind === 'recessed' ? 4000 : 3500,
        intensity: Math.min(1, f.intensity * 1.15 + 0.1),
      })),
  },
  {
    id: 'gallery',
    name: 'Gallery',
    description: 'Tight beams, crisp white.',
    apply: (fixtures) =>
      fixtures.map((f) => ({
        ...f,
        kelvin: 3500,
        intensity: f.kind === 'track' ? 0.95 : 0.4,
        beam: f.kind === 'track' ? 18 : f.beam,
      })),
  },
  {
    id: 'daylight',
    name: 'Daylight Match',
    description: 'Even, cool ambient fill.',
    apply: (fixtures) =>
      fixtures.map((f) => ({
        ...f,
        kelvin: 5000,
        intensity: 0.7,
        beam: Math.max(f.beam, 60),
      })),
  },
]

export function createFixtureFromTemplate(
  template: FixtureTemplate,
  x: number,
  y: number,
): PlacedFixture {
  return {
    id: `${template.id}-${crypto.randomUUID().slice(0, 8)}`,
    templateId: template.id,
    name: template.name,
    kind: template.kind,
    x,
    y,
    kelvin: template.defaultKelvin,
    intensity: template.defaultIntensity,
    beam: template.defaultBeam,
    rotation: 0,
    maxLumens: template.maxLumens,
  }
}

export const DEFAULT_ROOM = {
  widthM: 8,
  depthM: 6,
  ceilingM: 2.7,
  wallColor: '#d8dde6',
  floorTone: 0.92,
}
