import { useMemo, useState } from 'react'
import {
  PROPERTY_TEMPLATES,
  STYLE_PRESETS,
  createFixtureFromTemplate,
  starterFixturesFor,
} from '../data/fixtures'
import type { FixtureTemplate, LightingStyle, PlacedFixture, PropertyTemplate, Site } from '../types'
import { FixtureLibrary } from './FixtureLibrary'
import { Inspector } from './Inspector'
import { SiteCanvas } from './SiteCanvas'

interface StudioProps {
  onBack: () => void
}

const DEFAULT_PROPERTY = PROPERTY_TEMPLATES[0]

export function Studio({ onBack }: StudioProps) {
  const [property, setProperty] = useState<PropertyTemplate>(DEFAULT_PROPERTY)
  const [site, setSite] = useState<Site>(DEFAULT_PROPERTY.site)
  const [style, setStyle] = useState<LightingStyle>('traditional')
  const [fixtures, setFixtures] = useState<PlacedFixture[]>(() =>
    starterFixturesFor('traditional', DEFAULT_PROPERTY.id),
  )
  const [selectedTemplate, setSelectedTemplate] = useState<FixtureTemplate | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectedFixture = useMemo(
    () => fixtures.find((f) => f.id === selectedId) ?? null,
    [fixtures, selectedId],
  )

  const loadScene = (nextStyle: LightingStyle, nextProperty: PropertyTemplate) => {
    const next = starterFixturesFor(nextStyle, nextProperty.id)
    setStyle(nextStyle)
    setProperty(nextProperty)
    setSite(nextProperty.site)
    setFixtures(next)
    setSelectedId(next[0]?.id ?? null)
    setSelectedTemplate(null)
  }

  const handlePlace = (x: number, y: number) => {
    if (!selectedTemplate) return
    const next = createFixtureFromTemplate(selectedTemplate, x, y)
    setFixtures((prev) => [...prev, next])
    setSelectedId(next.id)
    setSelectedTemplate(null)
  }

  const handleChangeFixture = (id: string, patch: Partial<PlacedFixture>) => {
    setFixtures((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)))
  }

  const exportScene = () => {
    const payload = {
      name: 'LUMEN landscape render',
      style,
      property: {
        id: property.id,
        name: property.name,
        propertyType: property.propertyType,
      },
      site,
      features: property.features,
      fixtures,
      exportedAt: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `lumen-${property.propertyType}-${style}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className={`studio studio--${style}`}>
      <header className="studio__top">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <button type="button" className="btn btn--ghost" onClick={onBack}>
            ← Home
          </button>
          <div className="studio__brand">LUMEN Outdoor</div>
        </div>
        <div className="studio__actions">
          {STYLE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className={`chip${style === preset.id ? ' chip--active' : ''}`}
              title={preset.description}
              onClick={() => loadScene(preset.id, property)}
            >
              {preset.name}
            </button>
          ))}
          <button type="button" className="btn btn--primary" onClick={exportScene}>
            Export render
          </button>
        </div>
      </header>

      <div className="studio__body">
        <FixtureLibrary
          style={style}
          selectedTemplateId={selectedTemplate?.id ?? null}
          onSelect={setSelectedTemplate}
        />
        <SiteCanvas
          site={site}
          features={property.features}
          fixtures={fixtures}
          style={style}
          selectedId={selectedId}
          placing={Boolean(selectedTemplate)}
          onPlace={handlePlace}
          onSelect={setSelectedId}
          onMove={(id, x, y) => handleChangeFixture(id, { x, y })}
        />
        <Inspector
          fixture={selectedFixture}
          site={site}
          style={style}
          propertyId={property.id}
          onChangeFixture={handleChangeFixture}
          onRemoveFixture={(id) => {
            setFixtures((prev) => prev.filter((f) => f.id !== id))
            if (selectedId === id) setSelectedId(null)
          }}
          onChangeSite={(patch) => setSite((prev) => ({ ...prev, ...patch }))}
          onChangeStyle={(next) => loadScene(next, property)}
          onChangeProperty={(template) => loadScene(style, template)}
        />
      </div>
    </div>
  )
}
