import { FIXTURE_LIBRARY } from '../data/fixtures'
import type { FixtureTemplate } from '../types'

interface FixtureLibraryProps {
  selectedTemplateId: string | null
  onSelect: (template: FixtureTemplate) => void
}

export function FixtureLibrary({ selectedTemplateId, onSelect }: FixtureLibraryProps) {
  return (
    <aside className="panel panel--library">
      <h2 className="panel__title">Fixture library</h2>
      <p className="panel__hint">Select a fixture, then click the floor plan to place it.</p>
      <div className="fixture-list">
        {FIXTURE_LIBRARY.map((fixture) => (
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
