import { LoaderCircle, Sparkles } from "lucide-react"

export default function Loader() {
  return (
    <div className="app-shell">
      <main className="loading-page">
        <div className="loading-content">
          <div className="loading-orb"><LoaderCircle size={25} className="spin-icon" /></div>
          <div className="eyebrow"><span className="eyebrow-dot" /> Curating your shortlist</div>
          <p><Sparkles size={14} /> Finding the right movie for your kind of night...</p>
        </div>
      </main>
    </div>
  )
}
