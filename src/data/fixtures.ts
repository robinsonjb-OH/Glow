import type {
  FixtureTemplate,
  LightingStyle,
  PlacedFixture,
  PropertyTemplate,
  StylePreset,
} from '../types'

export const STYLE_PRESETS: StylePreset[] = [
  {
    id: 'traditional',
    name: 'Traditional',
    description: 'Architectural uplighting, path lights, and soft facade washes.',
    accent: '#e8a317',
  },
  {
    id: 'bistro',
    name: 'Bistro / Cafe',
    description: 'String lights, patio glow, and warm social outdoor ambiance.',
    accent: '#f0c36a',
  },
  {
    id: 'holiday',
    name: 'Holiday',
    description: 'Festive wraps, garlands, multicolor runs, and seasonal sparkle.',
    accent: '#d64545',
  },
]

export const FIXTURE_LIBRARY: FixtureTemplate[] = [
  {
    id: 'path-light',
    name: 'Path Light',
    kind: 'path',
    styles: ['traditional', 'bistro'],
    description: 'Low glare guides along walkways and garden edges.',
    defaultKelvin: 2700,
    defaultIntensity: 0.55,
    defaultBeam: 80,
    maxLumens: 250,
  },
  {
    id: 'tree-uplight',
    name: 'Tree Uplight',
    kind: 'uplight',
    styles: ['traditional', 'holiday'],
    description: 'Ground-mounted accent that lifts canopy and trunk texture.',
    defaultKelvin: 3000,
    defaultIntensity: 0.8,
    defaultBeam: 28,
    maxLumens: 900,
  },
  {
    id: 'facade-spotlight',
    name: 'Facade Spotlight',
    kind: 'spotlight',
    styles: ['traditional'],
    description: 'Aimable beam for columns, signage, and entry drama.',
    defaultKelvin: 3000,
    defaultIntensity: 0.88,
    defaultBeam: 22,
    maxLumens: 1400,
  },
  {
    id: 'wall-wash',
    name: 'Wall Wash',
    kind: 'wallwash',
    styles: ['traditional'],
    description: 'Even grazing light across masonry and storefronts.',
    defaultKelvin: 3000,
    defaultIntensity: 0.7,
    defaultBeam: 100,
    maxLumens: 1600,
  },
  {
    id: 'bollard',
    name: 'Bollard',
    kind: 'bollard',
    styles: ['traditional', 'bistro'],
    description: 'Sturdy path and plaza marker for commercial grounds.',
    defaultKelvin: 3000,
    defaultIntensity: 0.6,
    defaultBeam: 90,
    maxLumens: 700,
  },
  {
    id: 'well-light',
    name: 'Well Light',
    kind: 'well',
    styles: ['traditional'],
    description: 'Flush in-ground fixture for clean architectural punch.',
    defaultKelvin: 2700,
    defaultIntensity: 0.75,
    defaultBeam: 35,
    maxLumens: 1100,
  },
  {
    id: 'step-light',
    name: 'Step / Deck Light',
    kind: 'step',
    styles: ['traditional', 'bistro'],
    description: 'Subtle riser and deck edge safety lighting.',
    defaultKelvin: 2700,
    defaultIntensity: 0.4,
    defaultBeam: 70,
    maxLumens: 180,
  },
  {
    id: 'flood-wash',
    name: 'Area Flood',
    kind: 'flood',
    styles: ['traditional'],
    description: 'Broad fill for parking edges, courts, and open lawns.',
    defaultKelvin: 3500,
    defaultIntensity: 0.85,
    defaultBeam: 120,
    maxLumens: 3200,
  },
  {
    id: 'bistro-string',
    name: 'Bistro String Lights',
    kind: 'string',
    styles: ['bistro', 'holiday'],
    description: 'Cafe-style spans over patios, courtyards, and dining zones.',
    defaultKelvin: 2400,
    defaultIntensity: 0.7,
    defaultBeam: 140,
    maxLumens: 600,
    colorMode: 'kelvin',
  },
  {
    id: 'cafe-pendant',
    name: 'Outdoor Cafe Pendant',
    kind: 'string',
    styles: ['bistro'],
    description: 'Warm pendant clusters for seating and bar counters.',
    defaultKelvin: 2500,
    defaultIntensity: 0.78,
    defaultBeam: 60,
    maxLumens: 500,
  },
  {
    id: 'holiday-string',
    name: 'Holiday String Run',
    kind: 'holiday',
    styles: ['holiday'],
    description: 'Roofline and fence sparkle in warm white or multicolor.',
    defaultKelvin: 2700,
    defaultIntensity: 0.75,
    defaultBeam: 130,
    maxLumens: 450,
    colorMode: 'multicolor',
  },
  {
    id: 'tree-wrap',
    name: 'Tree Wrap',
    kind: 'holiday',
    styles: ['holiday'],
    description: 'Trunk and branch wraps for seasonal canopy glow.',
    defaultKelvin: 2700,
    defaultIntensity: 0.65,
    defaultBeam: 90,
    maxLumens: 380,
    colorMode: 'multicolor',
    defaultHue: 120,
  },
  {
    id: 'garland-lights',
    name: 'Garland Lights',
    kind: 'holiday',
    styles: ['holiday', 'bistro'],
    description: 'Entry and railing garlands with soft festive points.',
    defaultKelvin: 2400,
    defaultIntensity: 0.6,
    defaultBeam: 100,
    maxLumens: 320,
    colorMode: 'kelvin',
  },
  {
    id: 'projection-wash',
    name: 'Holiday Projection',
    kind: 'holiday',
    styles: ['holiday'],
    description: 'Colored wash and pattern projection on walls and snow.',
    defaultKelvin: 4000,
    defaultIntensity: 0.7,
    defaultBeam: 80,
    maxLumens: 900,
    colorMode: 'solid',
    defaultHue: 340,
  },
]

// Fix facade-spotlight styles - I accidentally used a hack. Let me fix in a clean rewrite of that entry - I'll patch it.

export const PROPERTY_TEMPLATES: PropertyTemplate[] = [
  {
    id: 'home-front',
    name: 'Residential Front Yard',
    propertyType: 'home',
    description: 'Entry walk, lawn, facade, and specimen trees.',
    site: {
      widthM: 22,
      depthM: 16,
      propertyType: 'home',
      label: 'Front yard',
    },
    features: [
      { id: 'lawn', kind: 'lawn', x: 0.05, y: 0.08, w: 0.9, h: 0.84 },
      { id: 'drive', kind: 'drive', x: 0.68, y: 0.45, w: 0.26, h: 0.5 },
      { id: 'path', kind: 'path', x: 0.42, y: 0.42, w: 0.1, h: 0.5 },
      { id: 'building', kind: 'building', x: 0.18, y: 0.1, w: 0.46, h: 0.34, label: 'Home' },
      { id: 'patio', kind: 'patio', x: 0.22, y: 0.46, w: 0.18, h: 0.14, label: 'Porch' },
      { id: 'tree-l', kind: 'tree', x: 0.1, y: 0.55, w: 0.12, h: 0.14 },
      { id: 'tree-r', kind: 'tree', x: 0.55, y: 0.58, w: 0.13, h: 0.15 },
      { id: 'garden', kind: 'garden', x: 0.12, y: 0.78, w: 0.28, h: 0.1 },
    ],
  },
  {
    id: 'commercial-plaza',
    name: 'Commercial Building',
    propertyType: 'commercial',
    description: 'Storefront facade, plaza, and approach lighting.',
    site: {
      widthM: 36,
      depthM: 24,
      propertyType: 'commercial',
      label: 'Plaza',
    },
    features: [
      { id: 'plaza', kind: 'lawn', x: 0.04, y: 0.4, w: 0.92, h: 0.54 },
      { id: 'building', kind: 'building', x: 0.1, y: 0.08, w: 0.8, h: 0.34, label: 'Building' },
      { id: 'entry', kind: 'path', x: 0.44, y: 0.4, w: 0.12, h: 0.28 },
      { id: 'patio', kind: 'patio', x: 0.2, y: 0.55, w: 0.28, h: 0.18, label: 'Cafe patio' },
      { id: 'drive', kind: 'drive', x: 0.04, y: 0.82, w: 0.92, h: 0.12 },
      { id: 'tree-1', kind: 'tree', x: 0.12, y: 0.48, w: 0.1, h: 0.12 },
      { id: 'tree-2', kind: 'tree', x: 0.78, y: 0.48, w: 0.1, h: 0.12 },
    ],
  },
  {
    id: 'garden-estate',
    name: 'Landscape Garden',
    propertyType: 'landscape',
    description: 'Open grounds, garden beds, and specimen lighting.',
    site: {
      widthM: 40,
      depthM: 28,
      propertyType: 'landscape',
      label: 'Garden',
    },
    features: [
      { id: 'lawn', kind: 'lawn', x: 0.04, y: 0.04, w: 0.92, h: 0.92 },
      { id: 'path', kind: 'path', x: 0.12, y: 0.42, w: 0.76, h: 0.08 },
      { id: 'path-2', kind: 'path', x: 0.46, y: 0.12, w: 0.08, h: 0.7 },
      { id: 'garden-a', kind: 'garden', x: 0.14, y: 0.16, w: 0.24, h: 0.18 },
      { id: 'garden-b', kind: 'garden', x: 0.62, y: 0.58, w: 0.22, h: 0.2 },
      { id: 'patio', kind: 'patio', x: 0.36, y: 0.3, w: 0.28, h: 0.2, label: 'Seating' },
      { id: 'tree-a', kind: 'tree', x: 0.2, y: 0.62, w: 0.14, h: 0.16 },
      { id: 'tree-b', kind: 'tree', x: 0.7, y: 0.18, w: 0.14, h: 0.16 },
      { id: 'tree-c', kind: 'tree', x: 0.78, y: 0.72, w: 0.12, h: 0.14 },
    ],
  },
]

export function fixturesForStyle(style: LightingStyle): FixtureTemplate[] {
  return FIXTURE_LIBRARY.filter((f) => f.styles.includes(style))
}

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
    colorMode: template.colorMode ?? 'kelvin',
    hue: template.defaultHue ?? 35,
    span: template.kind === 'string' || template.kind === 'holiday' ? 0.22 : 0.08,
  }
}

export function starterFixturesFor(
  style: LightingStyle,
  propertyId: string,
): PlacedFixture[] {
  const homeTraditional = [
    ['path-light', 0.47, 0.55],
    ['path-light', 0.47, 0.7],
    ['path-light', 0.47, 0.85],
    ['tree-uplight', 0.16, 0.62],
    ['tree-uplight', 0.62, 0.66],
    ['wall-wash', 0.3, 0.42],
    ['well-light', 0.4, 0.42],
    ['step-light', 0.3, 0.52],
  ] as const

  const homeBistro = [
    ['bistro-string', 0.3, 0.52],
    ['cafe-pendant', 0.28, 0.5],
    ['path-light', 0.47, 0.65],
    ['path-light', 0.47, 0.8],
    ['step-light', 0.32, 0.54],
    ['bollard', 0.58, 0.72],
  ] as const

  const homeHoliday = [
    ['holiday-string', 0.28, 0.2],
    ['holiday-string', 0.5, 0.2],
    ['tree-wrap', 0.16, 0.6],
    ['tree-wrap', 0.62, 0.64],
    ['garland-lights', 0.3, 0.48],
    ['projection-wash', 0.42, 0.4],
    ['path-light', 0.47, 0.75],
  ] as const

  const commercialTraditional = [
    ['wall-wash', 0.25, 0.4],
    ['wall-wash', 0.5, 0.4],
    ['wall-wash', 0.75, 0.4],
    ['facade-spotlight', 0.5, 0.38],
    ['bollard', 0.35, 0.62],
    ['bollard', 0.65, 0.62],
    ['flood-wash', 0.5, 0.78],
    ['tree-uplight', 0.17, 0.52],
    ['tree-uplight', 0.83, 0.52],
  ] as const

  const commercialBistro = [
    ['bistro-string', 0.28, 0.62],
    ['bistro-string', 0.4, 0.62],
    ['cafe-pendant', 0.3, 0.6],
    ['bollard', 0.22, 0.72],
    ['bollard', 0.48, 0.72],
    ['path-light', 0.5, 0.55],
    ['wall-wash', 0.5, 0.4],
  ] as const

  const commercialHoliday = [
    ['holiday-string', 0.2, 0.2],
    ['holiday-string', 0.5, 0.2],
    ['holiday-string', 0.8, 0.2],
    ['garland-lights', 0.5, 0.4],
    ['projection-wash', 0.5, 0.36],
    ['tree-wrap', 0.17, 0.52],
    ['tree-wrap', 0.83, 0.52],
  ] as const

  const landscapeTraditional = [
    ['path-light', 0.25, 0.46],
    ['path-light', 0.4, 0.46],
    ['path-light', 0.55, 0.46],
    ['path-light', 0.7, 0.46],
    ['path-light', 0.5, 0.25],
    ['path-light', 0.5, 0.65],
    ['tree-uplight', 0.27, 0.7],
    ['tree-uplight', 0.77, 0.26],
    ['tree-uplight', 0.84, 0.78],
    ['well-light', 0.5, 0.4],
  ] as const

  const landscapeBistro = [
    ['bistro-string', 0.42, 0.36],
    ['bistro-string', 0.55, 0.4],
    ['cafe-pendant', 0.48, 0.38],
    ['path-light', 0.3, 0.46],
    ['path-light', 0.7, 0.46],
    ['bollard', 0.38, 0.5],
    ['bollard', 0.62, 0.5],
  ] as const

  const landscapeHoliday = [
    ['tree-wrap', 0.27, 0.68],
    ['tree-wrap', 0.77, 0.24],
    ['tree-wrap', 0.84, 0.76],
    ['holiday-string', 0.4, 0.34],
    ['garland-lights', 0.5, 0.4],
    ['projection-wash', 0.5, 0.3],
    ['path-light', 0.5, 0.55],
  ] as const

  const map: Record<string, Record<LightingStyle, readonly (readonly [string, number, number])[]>> = {
    'home-front': {
      traditional: homeTraditional,
      bistro: homeBistro,
      holiday: homeHoliday,
    },
    'commercial-plaza': {
      traditional: commercialTraditional,
      bistro: commercialBistro,
      holiday: commercialHoliday,
    },
    'garden-estate': {
      traditional: landscapeTraditional,
      bistro: landscapeBistro,
      holiday: landscapeHoliday,
    },
  }

  const picks = map[propertyId]?.[style] ?? homeTraditional
  return picks.map(([id, x, y]) => {
    const template = FIXTURE_LIBRARY.find((f) => f.id === id)
    if (!template) throw new Error(`Missing template ${id}`)
    const fixture = createFixtureFromTemplate(template, x, y)
    if (style === 'holiday' && fixture.colorMode === 'multicolor') {
      fixture.hue = Math.round(Math.random() * 360)
    }
    return fixture
  })
}
