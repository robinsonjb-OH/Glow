import { fixturesForStyle } from '../data/fixtures'
import type { FixtureTemplate, LightingStyle } from '../types'

interface FixtureLibraryProps {
  style: LightingStyle
  selectedTemplateId: string | null
  onSelect: (template: FixtureTemplate) => void
}

export function FixtureLibrary({ style, selectedTemplateId, onSelect }: FixtureLibraryProps) {
  const fixtures = fixturesForStyle(style)

  return (
    <aside className="panel panel--library">
      <h2 className="panel__title">Fixture library</h2>
      <p className="panel__hint">
        Fixtures for this style. Select one, then click the property plan to place it.
      </p>
      <div className="fixture-list">
        {fixtures.map((fixture) => (
          <button
            key={fixture.id}
            type="button"
            className={`fixture-item${selectedTemplateId === fixture.id ? ' fixture-item--selected' : ''}`}
            onClick={() => onSelect(fixture)}
          >
            <span className="fixture-item__name">{fixture.name}</span>
            <span className="fixture-item__desc">{fixture.description}</span>
          </button>
        ))}
      </div>
    </aside>
  )
}
