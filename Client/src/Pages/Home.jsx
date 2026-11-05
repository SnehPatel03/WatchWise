import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Navbar from "../../componentsRaw/Navbar.jsx"

function Home() {
  const navigate = useNavigate()

  return (
    <div className="app-shell">
      <Navbar />
      <main className="home-main">
        <section className="hero">
          <p className="eyebrow">MOVIE NIGHT, SORTED</p>
          <h1>Find a film <span>worth watching.</span></h1>
          <p className="hero-copy">
            Tell us what you&apos;re in the mood for. We&apos;ll find a few good matches.
          </p>
          <button className="button-primary" onClick={() => navigate("/preferences")}>
            Find my movie <ArrowRight size={17} />
          </button>
        </section>
      </main>
    </div>
  )
}

export default Home
