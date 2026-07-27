import { kelvinLabel, kelvinToCss } from '../utils/colorTemp'
import type { LightingStyle, PlacedFixture, PropertyTemplate, Site } from '../types'
import { PROPERTY_TEMPLATES, STYLE_PRESETS } from '../data/fixtures'

interface InspectorProps {
  fixture: PlacedFixture | null
  site: Site
  style: LightingStyle
  propertyId: string
  onChangeFixture: (id: string, patch: Partial<PlacedFixture>) => void
  onRemoveFixture: (id: string) => void
  onChangeSite: (patch: Partial<Site>) => void
  onChangeStyle: (style: LightingStyle) => void
  onChangeProperty: (template: PropertyTemplate) => void
}

export function Inspector({
  fixture,
  site,
  style,
  propertyId,
  onChangeFixture,
  onRemoveFixture,
  onChangeSite,
  onChangeStyle,
  onChangeProperty,
}: InspectorProps) {
  return (
    <aside className="panel panel--inspector">
      <h2 className="panel__title">Property</h2>
      <p className="panel__hint">Choose the outdoor site, then tune lighting style and fixtures.</p>

      <div className="field">
        <label htmlFor="property">Site type</label>
        <select
          id="property"
          className="select"
          value={propertyId}
          onChange={(e) => {
            const template = PROPERTY_TEMPLATES.find((p) => p.id === e.target.value)
            if (template) onChangeProperty(template)
          }}
        >
          {PROPERTY_TEMPLATES.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>Lighting style</label>
        <div className="style-grid">
          {STYLE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className={`style-chip${style === preset.id ? ' style-chip--active' : ''}`}
              style={{ ['--style-accent' as string]: preset.accent }}
              onClick={() => onChangeStyle(preset.id)}
              title={preset.description}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <div className="room-controls">
        <div className="field">
          <label htmlFor="site-w">Width (m)</label>
          <input
            id="site-w"
            type="range"
            min={12}
            max={60}
            step={1}
            value={site.widthM}
            onChange={(e) => onChangeSite({ widthM: Number(e.target.value) })}
          />
          <div className="field__value">{site.widthM} m</div>
        </div>
        <div className="field">
          <label htmlFor="site-d">Depth (m)</label>
          <input
            id="site-d"
            type="range"
            min={10}
            max={48}
            step={1}
            value={site.depthM}
            onChange={(e) => onChangeSite({ depthM: Number(e.target.value) })}
          />
          <div className="field__value">{site.depthM} m</div>
        </div>
      </div>

      <h2 className="panel__title">Fixture</h2>
      {!fixture ? (
        <p className="empty-state">
          Select a light on the plan to adjust color, intensity, and beam spread.
        </p>
      ) : (
        <>
          <p className="panel__hint">
            {fixture.name}
            {fixture.colorMode === 'kelvin' ? ` · ${kelvinLabel(fixture.kelvin)}` : ' · Color wash'}
          </p>

          {fixture.colorMode === 'kelvin' ? (
            <div className="field">
              <label htmlFor="kelvin">Color temperature</label>
              <input
                id="kelvin"
                type="range"
                min={2200}
                max={5000}
                step={50}
                value={fixture.kelvin}
                onChange={(e) => onChangeFixture(fixture.id, { kelvin: Number(e.target.value) })}
              />
              <div className="field__value">{fixture.kelvin} K</div>
              <div
                className="temp-swatch"
                style={{
                  background: `linear-gradient(90deg, ${kelvinToCss(2200)}, ${kelvinToCss(fixture.kelvin)}, ${kelvinToCss(5000)})`,
                }}
              />
            </div>
          ) : (
            <div className="field">
              <label htmlFor="hue">Holiday / accent color</label>
              <input
                id="hue"
                type="range"
                min={0}
                max={360}
                step={1}
                value={fixture.hue}
                onChange={(e) => onChangeFixture(fixture.id, { hue: Number(e.target.value) })}
              />
              <div className="field__value">{fixture.hue}°</div>
              <div
                className="temp-swatch"
                style={{
                  background: `linear-gradient(90deg, hsl(0 80% 55%), hsl(60 80% 50%), hsl(120 70% 45%), hsl(210 80% 55%), hsl(300 70% 55%), hsl(360 80% 55%))`,
                }}
              />
            </div>
          )}

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
            <label htmlFor="beam">Beam / spread</label>
            <input
              id="beam"
              type="range"
              min={10}
              max={150}
              step={1}
              value={fixture.beam}
              onChange={(e) => onChangeFixture(fixture.id, { beam: Number(e.target.value) })}
            />
            <div className="field__value">{fixture.beam}°</div>
          </div>

          {(fixture.kind === 'string' || fixture.kind === 'holiday') && (
            <div className="field">
              <label htmlFor="span">Run length</label>
              <input
                id="span"
                type="range"
                min={0.08}
                max={0.45}
                step={0.01}
                value={fixture.span}
                onChange={(e) => onChangeFixture(fixture.id, { span: Number(e.target.value) })}
              />
              <div className="field__value">{Math.round(fixture.span * site.widthM * 10) / 10} m</div>
            </div>
          )}

          <button type="button" className="danger-link" onClick={() => onRemoveFixture(fixture.id)}>
            Remove fixture
          </button>
        </>
      )}
    </aside>
  )
}
