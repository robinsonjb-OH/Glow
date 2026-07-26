import { kelvinLabel, kelvinToCss } from '../utils/colorTemp'
import type { PlacedFixture, Room } from '../types'

interface InspectorProps {
  fixture: PlacedFixture | null
  room: Room
  onChangeFixture: (id: string, patch: Partial<PlacedFixture>) => void
  onRemoveFixture: (id: string) => void
  onChangeRoom: (patch: Partial<Room>) => void
}

export function Inspector({
  fixture,
  room,
  onChangeFixture,
  onRemoveFixture,
  onChangeRoom,
}: InspectorProps) {
  return (
    <aside className="panel panel--inspector">
      <h2 className="panel__title">Room</h2>
      <p className="panel__hint">Scale the space, then tune the selected fixture.</p>

      <div className="room-controls">
        <div className="field">
          <label htmlFor="room-w">Width (m)</label>
          <input
            id="room-w"
            type="range"
            min={4}
            max={16}
            step={0.5}
            value={room.widthM}
            onChange={(e) => onChangeRoom({ widthM: Number(e.target.value) })}
          />
          <div className="field__value">{room.widthM.toFixed(1)} m</div>
        </div>
        <div className="field">
          <label htmlFor="room-d">Depth (m)</label>
          <input
            id="room-d"
            type="range"
            min={3}
            max={14}
            step={0.5}
            value={room.depthM}
            onChange={(e) => onChangeRoom({ depthM: Number(e.target.value) })}
          />
          <div className="field__value">{room.depthM.toFixed(1)} m</div>
        </div>
      </div>

      <h2 className="panel__title">Fixture</h2>
      {!fixture ? (
        <p className="empty-state">Select a light on the plan to adjust kelvin, intensity, and beam.</p>
      ) : (
        <>
          <p className="panel__hint">
            {fixture.name} · {kelvinLabel(fixture.kelvin)}
          </p>

          <div className="field">
            <label htmlFor="kelvin">Color temperature</label>
            <input
              id="kelvin"
              type="range"
              min={2200}
              max={6500}
              step={50}
              value={fixture.kelvin}
              onChange={(e) => onChangeFixture(fixture.id, { kelvin: Number(e.target.value) })}
            />
            <div className="field__value">{fixture.kelvin} K</div>
            <div
              className="temp-swatch"
              style={{
                background: `linear-gradient(90deg, ${kelvinToCss(2200)}, ${kelvinToCss(fixture.kelvin)}, ${kelvinToCss(6500)})`,
              }}
            />
          </div>

          <div className="field">
            <label htmlFor="intensity">Intensity</label>
            <input
              id="intensity"
              type="range"
              min={0.05}
              max={1}
              step={0.01}
              value={fixture.intensity}
              onChange={(e) => onChangeFixture(fixture.id, { intensity: Number(e.target.value) })}
            />
            <div className="field__value">
              {Math.round(fixture.intensity * 100)}% · ~
              {Math.round(fixture.maxLumens * fixture.intensity)} lm
            </div>
          </div>

          <div className="field">
            <label htmlFor="beam">Beam angle</label>
            <input
              id="beam"
              type="range"
              min={10}
              max={140}
              step={1}
              value={fixture.beam}
              onChange={(e) => onChangeFixture(fixture.id, { beam: Number(e.target.value) })}
            />
            <div className="field__value">{fixture.beam}°</div>
          </div>

          <button type="button" className="danger-link" onClick={() => onRemoveFixture(fixture.id)}>
            Remove fixture
          </button>
        </>
      )}
    </aside>
  )
}
