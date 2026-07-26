import { useCallback, useRef, useState } from 'react'
import { kelvinToRgb } from '../utils/colorTemp'
import type { PlacedFixture, Room } from '../types'

interface RoomCanvasProps {
  room: Room
  fixtures: PlacedFixture[]
  selectedId: string | null
  placing: boolean
  onPlace: (x: number, y: number) => void
  onSelect: (id: string) => void
  onMove: (id: string, x: number, y: number) => void
}

function fixtureGlyph(kind: PlacedFixture['kind']): string {
  switch (kind) {
    case 'pendant':
      return 'P'
    case 'sconce':
      return 'S'
    case 'track':
      return 'T'
    case 'floor':
      return 'F'
    case 'linear':
      return 'L'
    default:
      return 'R'
  }
}

export function RoomCanvas({
  room,
  fixtures,
  selectedId,
  placing,
  onPlace,
  onSelect,
  onMove,
}: RoomCanvasProps) {
  const floorRef = useRef<HTMLDivElement>(null)
  const [draggingId, setDraggingId] = useState<string | null>(null)

  const toNormalized = useCallback((clientX: number, clientY: number) => {
    const el = floorRef.current
    if (!el) return null
    const rect = el.getBoundingClientRect()
    const x = (clientX - rect.left) / rect.width
    const y = (clientY - rect.top) / rect.height
    return {
      x: Math.min(0.95, Math.max(0.05, x)),
      y: Math.min(0.95, Math.max(0.05, y)),
    }
  }, [])

  const handleFloorClick = (e: React.MouseEvent) => {
    if (!placing || draggingId) return
    const point = toNormalized(e.clientX, e.clientY)
    if (point) onPlace(point.x, point.y)
  }

  const handlePointerDown = (e: React.PointerEvent, id: string) => {
    e.stopPropagation()
    onSelect(id)
    setDraggingId(id)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingId) return
    const point = toNormalized(e.clientX, e.clientY)
    if (point) onMove(draggingId, point.x, point.y)
  }

  const handlePointerUp = () => {
    setDraggingId(null)
  }

  const totalLumens = fixtures.reduce((sum, f) => sum + f.maxLumens * f.intensity, 0)
  const avgKelvin =
    fixtures.length === 0
      ? 0
      : Math.round(fixtures.reduce((sum, f) => sum + f.kelvin, 0) / fixtures.length)

  return (
    <div className="canvas-wrap">
      <div className="canvas-meta">
        <span>
          Room {room.widthM.toFixed(1)} × {room.depthM.toFixed(1)} m · {fixtures.length} fixture
          {fixtures.length === 1 ? '' : 's'}
        </span>
        <span>
          {fixtures.length > 0
            ? `~${Math.round(totalLumens).toLocaleString()} lm · avg ${avgKelvin} K`
            : placing
              ? 'Click the floor to place'
              : 'Choose a fixture to begin'}
        </span>
      </div>

      <div
        className="room-stage"
        style={{ aspectRatio: `${room.widthM} / ${room.depthM}` }}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div
          ref={floorRef}
          className="room-stage__floor"
          onClick={handleFloorClick}
          style={{ cursor: placing ? 'crosshair' : 'default' }}
        >
          <div className="room-stage__lights">
            {fixtures.map((fixture) => {
              const { r, g, b } = kelvinToRgb(fixture.kelvin)
              const radiusPct = 8 + (fixture.beam / 140) * 42 + fixture.intensity * 10
              const alpha = 0.18 + fixture.intensity * 0.55
              return (
                <div
                  key={`pool-${fixture.id}`}
                  className="light-pool"
                  style={{
                    left: `${fixture.x * 100}%`,
                    top: `${fixture.y * 100}%`,
                    width: `${radiusPct}%`,
                    height: `${radiusPct * (room.widthM / room.depthM)}%`,
                    background: `radial-gradient(circle, rgba(${r},${g},${b},${alpha}) 0%, rgba(${r},${g},${b},${alpha * 0.35}) 42%, transparent 72%)`,
                  }}
                />
              )
            })}
          </div>

          {fixtures.map((fixture) => (
            <button
              key={fixture.id}
              type="button"
              className={`fixture-node${selectedId === fixture.id ? ' fixture-node--active' : ''}`}
              style={{ left: `${fixture.x * 100}%`, top: `${fixture.y * 100}%` }}
              onPointerDown={(e) => handlePointerDown(e, fixture.id)}
              aria-label={fixture.name}
              title={fixture.name}
            >
              {fixtureGlyph(fixture.kind)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
