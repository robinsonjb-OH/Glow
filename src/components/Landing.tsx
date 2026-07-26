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
        <p className="landing__headline">Shape light the way architects shape space.</p>
        <p className="landing__lede">
          Place fixtures, tune color temperature, and preview how warmth and beam fall across a
          room — before a single cable is pulled.
        </p>
        <div className="cta-row">
          <button type="button" className="btn btn--primary" onClick={onEnter}>
            Start designing
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            How it works
          </button>
        </div>
      </main>

      <div className="landing__floor" aria-hidden="true">
        <div className="landing__beam" />
      </div>

      <section id="how" className="sr-only">
        Place fixtures on a floor plan, adjust kelvin and intensity, and preview light pools in
        real time.
      </section>
    </div>
  )
}
