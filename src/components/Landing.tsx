interface LandingProps {
  onEnter: () => void
}

export function Landing({ onEnter }: LandingProps) {
  return (
    <div className="landing">
      <div className="landing__atmosphere" aria-hidden="true" />
      <header className="landing__nav">
        <div className="brand-mark">Lumen</div>
        <button type="button" className="btn btn--ghost" onClick={onEnter}>
          Open studio
        </button>
      </header>

      <main className="landing__hero">
        <h1 className="landing__brand">LUMEN</h1>
        <p className="landing__headline">
          Landscape lighting renders for homes, commerce, and outdoor spaces.
        </p>
        <p className="landing__lede">
          Compose traditional path and facade lighting, bistro string glows, or full holiday
          sparkle — then preview how the night scene will feel before install day.
        </p>
        <div className="cta-row">
          <button type="button" className="btn btn--primary" onClick={onEnter}>
            Design a night scene
          </button>
        </div>
        <ul className="landing__styles">
          <li>
            <strong>Traditional</strong>
            <span>Uplights, path lights, wall wash</span>
          </li>
          <li>
            <strong>Bistro / Cafe</strong>
            <span>String lights and patio warmth</span>
          </li>
          <li>
            <strong>Holiday</strong>
            <span>Wraps, garlands, multicolor runs</span>
          </li>
        </ul>
      </main>

      <div className="landing__floor" aria-hidden="true">
        <div className="landing__beam" />
        <div className="landing__tree landing__tree--left" />
        <div className="landing__tree landing__tree--right" />
        <div className="landing__house" />
      </div>
    </div>
  )
}
