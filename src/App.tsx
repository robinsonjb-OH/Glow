import { useState } from 'react'
import { Landing } from './components/Landing'
import { Studio } from './components/Studio'

type View = 'landing' | 'studio'

export default function App() {
  const [view, setView] = useState<View>('landing')

  return (
    <div className="app-shell">
      {view === 'landing' ? (
        <Landing onEnter={() => setView('studio')} />
      ) : (
        <Studio onBack={() => setView('landing')} />
      )}
    </div>
  )
}
