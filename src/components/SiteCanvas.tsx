import { useCallback, useRef, useState } from 'react'
import { HOLIDAY_PALETTE, fixtureRgb } from '../utils/colorTemp'
import type { LightingStyle, PlacedFixture, Site, SiteFeature } from '../types'

interface SiteCanvasProps {
  site: Site
  features: SiteFeature[]
  fixtures: PlacedFixture[]
  style: LightingStyle
  selectedId: string | null
  placing: boolean
  onPlace: (x: number, y: number) => void
  onSelect: (id: string) => void
  onMove: (id: string, x: number, y: number) => void
}

function fixtureGlyph(kind: PlacedFixture['kind']): string {
  switch (kind) {
    case 'path':
      return 'P'
    case 'uplight':
      return 'U'
    case 'spotlight':
      return 'S'
    case 'wallwash':
      return 'W'
    case 'bollard':
      return 'B'
    case 'well':
      return 'O'
    case 'step':
      return '='
    case 'string':
      return '~'
    case 'holiday':
      return '*'
    case 'flood':
      return 'F'
    default:
      return 'L'
  }
}

export function SiteCanvas({
  site,
  features,
  fixtures,
  style,
  selectedId,
  placing,
  onPlace,
  onSelect,
  onMove,
}: SiteCanvasProps) {
  const floorRef = useRef<HTMLDivElement>(null)
  const [draggingId, setDraggingId] = useState<string | null>(null)

  const toNormalized = useCallback((clientX: number, clientY: number) => {
    const el = floorRef.current
    if (!el) return null
    const rect = el.getBoundingClientRect()
    const x = (clientX - rect.left) / rect.width
    const y = (clientY - rect.top) / rect.height
    return {
      x: Math.min(0.96, Math.max(0.04, x)),
      y: Math.min(0.96, Math.max(0.04, y)),
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

  const handlePointerUp = () => setDraggingId(null)

  const totalLumens = fixtures.reduce((sum, f) => sum + f.maxLumens * f.intensity, 0)

  return (
    <div className="canvas-wrap">
      <div className="canvas-meta">
        <span>
          {site.label} · {site.widthM} × {site.depthM} m · {fixtures.length} fixture
          {fixtures.length === 1 ? '' : 's'}
        </span>
        <span>
          {fixtures.length > 0
            ? `~${Math.round(totalLumens).toLocaleString()} lm · ${style} render`
            : placing
              ? 'Click the grounds to place'
              : 'Choose a fixture to begin'}
        </span>
      </div>

      <div
        className={`room-stage room-stage--night room-stage--${style}`}
        style={{ aspectRatio: `${site.widthM} / ${site.depthM}` }}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div className="night-sky" aria-hidden="true" />
        <div
          ref={floorRef}
          className="room-stage__floor room-stage__grounds"
          onClick={handleFloorClick}
          style={{ cursor: placing ? 'crosshair' : 'default' }}
        >
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`site-feature site-feature--${feature.kind}`}
              style={{
                left: `${feature.x * 100}%`,
                top: `${feature.y * 100}%`,
                width: `${feature.w * 100}%`,
                height: `${feature.h * 100}%`,
              }}
            >
              {feature.label ? <span>{feature.label}</span> : null}
            </div>
          ))}

          <div className="room-stage__lights">
            {fixtures.map((fixture) => {
              const { r, g, b } = fixtureRgb(fixture)
              const radiusPct = 7 + (fixture.beam / 150) * 38 + fixture.intensity * 12
              const alpha = 0.2 + fixture.intensity * 0.55
              const isRun = fixture.kind === 'string' || fixture.kind === 'holiday'

              if (isRun) {
                const bulbs = 7
                return (
                  <div
                    key={`run-${fixture.id}`}
                    className="string-run"
                    style={{
                      left: `${fixture.x * 100}%`,
                      top: `${fixture.y * 100}%`,
                      width: `${fixture.span * 100}%`,
                    }}
                  >
                    {Array.from({ length: bulbs }).map((_, i) => {
                      const palette =
                        fixture.colorMode === 'multicolor'
                          ? HOLIDAY_PALETTE[(i + Math.round(fixture.hue / 40)) % HOLIDAY_PALETTE.length]
                          : { r, g, b }
                      return (
                        <span
                          key={i}
                          className="string-bulb"
                          style={{
                            background: `rgba(${palette.r},${palette.g},${palette.b},${0.55 + fixture.intensity * 0.4})`,
                            boxShadow: `0 0 ${10 + fixture.intensity * 18}px rgba(${palette.r},${palette.g},${palette.b},${0.55 + fixture.intensity * 0.35})`,
                          }}
                        />
                      )
                    })}
                    <div
                      className="light-pool light-pool--run"
                      style={{
                        background: `radial-gradient(ellipse at center, rgba(${r},${g},${b},${alpha * 0.55}) 0%, transparent 70%)`,
                      }}
                    />
                  </div>
                )
              }

              return (
                <div
                  key={`pool-${fixture.id}`}
                  className="light-pool"
                  style={{
                    left: `${fixture.x * 100}%`,
                    top: `${fixture.y * 100}%`,
                    width: `${radiusPct}%`,
                    height: `${radiusPct * (site.widthM / site.depthM)}%`,
                    background: `radial-gradient(circle, rgba(${r},${g},${b},${alpha}) 0%, rgba(${r},${g},${b},${alpha * 0.3}) 45%, transparent 72%)`,
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
