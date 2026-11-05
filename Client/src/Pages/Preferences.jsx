import { ArrowLeft, ArrowRight, LoaderCircle } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../../componentsRaw/Navbar.jsx"
import { getMovieRecommendation } from "../../Service/movieService.js"

const moods = [
  { value: "action", label: "Big action" },
  { value: "adventure", label: "Epic adventure" },
  { value: "comedy", label: "A good laugh" },
  { value: "horror", label: "A little spooky" },
  { value: "inspiring", label: "Feel-good" },
  { value: "thriller", label: "Edge of my seat" },
  { value: "romance", label: "Romantic" },
  { value: "nostalgic", label: "Nostalgic" },
]

const genres = ["Action", "Comedy", "Horror", "Romance", "Sci-Fi", "Fantasy", "Crime/Thriller", "Drama"]
const languages = ["English", "Hindi", "Korean", "French", "Spanish"]
const eras = ["2020+", "2010s", "2000s", "Retro"]
const resultCounts = ["5", "10", "15", "20"]

function Preferences() {
  const navigate = useNavigate()
  const [mood, setMood] = useState("")
  const [genre, setGenre] = useState([])
  const [language, setLanguage] = useState("")
  const [era, setEra] = useState("")
  const [notes, setNotes] = useState("")
  const [numberOfRec, setNumberOfRec] = useState("5")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const toggleGenre = (selectedGenre) => {
    setError("")
    if (genre.includes(selectedGenre)) {
      setGenre((current) => current.filter((item) => item !== selectedGenre))
    } else if (genre.length >= 3) {
      setError("Choose up to 3 genres to keep your shortlist focused.")
    } else {
      setGenre((current) => [...current, selectedGenre])
    }
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    setError("")

    if (!mood || !genre.length || !language || !era) {
      setError("Choose a mood, 1–3 genres, a language, and an era to get your recommendations.")
      return
    }

    const preferences = { mood, genre, language, era, notes: notes.trim(), numberOfRec: Number(numberOfRec) }
    setLoading(true)
    try {
      const result = await getMovieRecommendation(preferences)
      const movies = Array.isArray(result?.data) ? result.data : []
      navigate("/movies", { state: { movies, preferences } })
    } catch (requestError) {
      const message = requestError.response?.data?.message
        || "We couldn't reach the recommendation service. Please try again."
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-shell">
      <Navbar />
      <main className="preferences-main">
        <button className="text-link" type="button" onClick={() => navigate("/")}>
          <ArrowLeft size={15} /> Back to home
        </button>
        <div>
          <header className="page-heading">
            <p className="eyebrow">YOUR NEXT MOVIE</p>
            <h1>What are you in the mood for?</h1>
            <p>Choose a few preferences to get recommendations.</p>
          </header>

          <form className="form-panel" onSubmit={submitHandler}>
            <section className="form-section">
              <h2 className="section-title">Mood</h2>
              <div className="choice-grid">
                {moods.map((option) => (
                  <button
                    className={`choice-chip${mood === option.value ? " is-selected" : ""}`}
                    key={option.value}
                    type="button"
                    aria-pressed={mood === option.value}
                    onClick={() => { setMood(option.value); setError("") }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </section>

            <section className="form-section">
              <h2 className="section-title">
                Genres
                <small>{genre.length}/3 selected</small>
              </h2>
              <div className="choice-grid">
                {genres.map((item) => (
                  <button
                    className={`choice-chip${genre.includes(item) ? " is-selected" : ""}`}
                    key={item}
                    type="button"
                    aria-pressed={genre.includes(item)}
                    onClick={() => toggleGenre(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </section>

            <section className="form-section">
              <div className="form-row">
                <div>
                  <label className="field-label" htmlFor="language">Language</label>
                  <select className="select-field" id="language" value={language} onChange={(event) => { setLanguage(event.target.value); setError("") }}>
                    <option value="">Any language you like</option>
                    {languages.map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                </div>
                <div>
                  <label className="field-label" htmlFor="era">Era</label>
                  <select className="select-field" id="era" value={era} onChange={(event) => { setEra(event.target.value); setError("") }}>
                    <option value="">Choose an era</option>
                    {eras.map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                </div>
              </div>
            </section>

            <section className="form-section">
              <div className="form-row">
                <div>
                  <label className="field-label" htmlFor="notes">Anything else on your mind? <span className="form-hint">(optional)</span></label>
                  <input
                    className="text-field"
                    id="notes"
                    type="text"
                    maxLength={240}
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="A clever twist, a cozy setting..."
                  />
                </div>
                <div>
                  <label className="field-label" htmlFor="count">How many suggestions?</label>
                  <select className="select-field" id="count" value={numberOfRec} onChange={(event) => setNumberOfRec(event.target.value)}>
                    {resultCounts.map((count) => <option key={count} value={count}>{count} movies</option>)}
                  </select>
                </div>
              </div>
            </section>

            {error && <p className="form-error" role="alert">{error}</p>}

            <footer className="preferences-footer">
              <button className="button-primary" type="submit" disabled={loading}>
                {loading && <LoaderCircle size={17} className="spin-icon" />}
                {loading ? "Finding movies..." : "Show recommendations"}
                {!loading && <ArrowRight size={16} />}
              </button>
            </footer>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Preferences
