import { useMemo, useState } from 'react'
import {
  DEFAULT_ROOM,
  FIXTURE_LIBRARY,
  SCENE_PRESETS,
  createFixtureFromTemplate,
} from '../data/fixtures'
import type { FixtureTemplate, PlacedFixture, Room } from '../types'
import { FixtureLibrary } from './FixtureLibrary'
import { Inspector } from './Inspector'
import { RoomCanvas } from './RoomCanvas'

interface StudioProps {
  onBack: () => void
}

function templateById(id: string) {
  const template = FIXTURE_LIBRARY.find((f) => f.id === id)
  if (!template) throw new Error(`Missing fixture template: ${id}`)
  return template
}

const STARTER_FIXTURES: PlacedFixture[] = [
  createFixtureFromTemplate(templateById('recessed-downlight'), 0.28, 0.32),
  createFixtureFromTemplate(templateById('glass-pendant'), 0.52, 0.55),
  createFixtureFromTemplate(templateById('track-spot'), 0.78, 0.28),
]

export function Studio({ onBack }: StudioProps) {
  const [room, setRoom] = useState<Room>(DEFAULT_ROOM)
  const [fixtures, setFixtures] = useState<PlacedFixture[]>(STARTER_FIXTURES)
  const [selectedTemplate, setSelectedTemplate] = useState<FixtureTemplate | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(STARTER_FIXTURES[1]?.id ?? null)
  const [activePreset, setActivePreset] = useState<string | null>(null)

  const selectedFixture = useMemo(
    () => fixtures.find((f) => f.id === selectedId) ?? null,
    [fixtures, selectedId],
  )

  const handlePlace = (x: number, y: number) => {
    if (!selectedTemplate) return
    const next = createFixtureFromTemplate(selectedTemplate, x, y)
    setFixtures((prev) => [...prev, next])
    setSelectedId(next.id)
    setSelectedTemplate(null)
    setActivePreset(null)
  }

  const handleChangeFixture = (id: string, patch: Partial<PlacedFixture>) => {
    setFixtures((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)))
    setActivePreset(null)
  }

  const applyPreset = (presetId: string) => {
    const preset = SCENE_PRESETS.find((p) => p.id === presetId)
    if (!preset) return
    setFixtures((prev) => preset.apply(prev))
    setActivePreset(presetId)
  }

  const exportScene = () => {
    const payload = {
      name: 'LUMEN scene',
      room,
      fixtures,
      exportedAt: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'lumen-scene.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="studio">
      <header className="studio__top">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <button type="button" className="btn btn--ghost" onClick={onBack}>
            ← Home
          </button>
          <div className="studio__brand">LUMEN Studio</div>
        </div>
        <div className="studio__actions">
          {SCENE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className={`chip${activePreset === preset.id ? ' chip--active' : ''}`}
              title={preset.description}
              onClick={() => applyPreset(preset.id)}
            >
              {preset.name}
            </button>
          ))}
          <button type="button" className="btn btn--primary" onClick={exportScene}>
            Export scene
          </button>
        </div>
      </header>

      <div className="studio__body">
        <FixtureLibrary
          selectedTemplateId={selectedTemplate?.id ?? null}
          onSelect={setSelectedTemplate}
        />
        <RoomCanvas
          room={room}
          fixtures={fixtures}
          selectedId={selectedId}
          placing={Boolean(selectedTemplate)}
          onPlace={handlePlace}
          onSelect={setSelectedId}
          onMove={(id, x, y) => handleChangeFixture(id, { x, y })}
        />
        <Inspector
          fixture={selectedFixture}
          room={room}
          onChangeFixture={handleChangeFixture}
          onRemoveFixture={(id) => {
            setFixtures((prev) => prev.filter((f) => f.id !== id))
            if (selectedId === id) setSelectedId(null)
          }}
          onChangeRoom={(patch) => setRoom((prev) => ({ ...prev, ...patch }))}
        />
      </div>
    </div>
  )
}
