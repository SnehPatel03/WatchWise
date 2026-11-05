import { ArrowLeft, Film, LoaderCircle, RefreshCw, Star } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Navbar from "../../componentsRaw/Navbar.jsx"
import { getMovieRecommendation } from "../../Service/movieService.js"
import Popup from "./Popup.jsx"

function MoviePoster({ movie, className = "" }) {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <div className={`movie-poster ${className}`}>
      {(!movie.poster || imageFailed) && <div className="poster-fallback"><Film size={34} /></div>}
      {movie.poster && !imageFailed && (
        <img src={movie.poster} alt={`${movie.title} poster`} onError={() => setImageFailed(true)} />
      )}
    </div>
  )
}

function Movies() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const preferences = state?.preferences
  const initialMovies = state?.movies
  const [movies, setMovies] = useState(Array.isArray(initialMovies) ? initialMovies : [])
  const [loading, setLoading] = useState(!Array.isArray(initialMovies))
  const [error, setError] = useState("")
  const [selectedMovie, setSelectedMovie] = useState(null)

  const fetchMovies = useCallback(async () => {
    setLoading(true)
    setError("")
    try {
      const result = await getMovieRecommendation(preferences)
      setMovies(Array.isArray(result.data) ? result.data : [])
    } catch (requestError) {
      setError(requestError.response?.data?.message || "We couldn't reach the recommendation service. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [preferences])

  useEffect(() => {
    if (Array.isArray(initialMovies)) return
    if (!preferences) {
      navigate("/preferences", { replace: true })
      return
    }
    fetchMovies()
  }, [fetchMovies, initialMovies, navigate, preferences])

  const editPreferences = () => navigate("/preferences")

  return (
    <div className="app-shell">
      <Navbar />
      {loading ? (
        <main className="loading-page">
          <div className="loading-content">
            <div className="loading-orb"><LoaderCircle size={25} className="spin-icon" /></div>
            <div className="eyebrow"><span className="eyebrow-dot" /> Curating your shortlist</div>
            <p>Finding the right movie for your kind of night...</p>
          </div>
        </main>
      ) : (
        <main className="results-main">
          <button className="text-link" type="button" onClick={editPreferences}>
            <ArrowLeft size={15} /> Edit my picks
          </button>
          <div>
            <header className="results-heading">
              <div>
                <p className="eyebrow">YOUR RECOMMENDATIONS</p>
                <h1>Movies for tonight</h1>
              </div>
            </header>

            {error ? (
              <section className="empty-state" aria-live="polite">
                <div>
                  <h2>We hit a small snag.</h2>
                  <p>{error}</p>
                  <button className="button-primary" type="button" onClick={fetchMovies}>
                    <RefreshCw size={16} /> Try again
                  </button>
                </div>
              </section>
            ) : movies.length ? (
              <section className="movie-grid" aria-label="Recommended movies">
                {movies.map((movie, index) => (
                  <button
                    className="movie-card"
                    key={`${movie.title}-${movie.year ?? index}`}
                    type="button"
                    onClick={() => setSelectedMovie(movie)}
                    aria-label={`View details for ${movie.title}`}
                  >
                    <MoviePoster movie={movie} />
                    <div className="movie-card-info">
                      <h2>{movie.title}</h2>
                      <div className="movie-card-meta">
                        <span>{movie.year || movie.type || "Movie"}</span>
                        <span className="movie-rating"><Star size={13} fill="currentColor" /> {movie.rating || "—"}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </section>
            ) : (
              <section className="empty-state" aria-live="polite">
                <div>
                  <h2>No matches this time.</h2>
                  <p>Try a different mood or genre and we&apos;ll find another shortlist for you.</p>
                  <button className="button-primary" type="button" onClick={editPreferences}>
                    <RefreshCw size={16} /> Adjust my picks
                  </button>
                </div>
              </section>
            )}
          </div>
        </main>
      )}

      {selectedMovie && <Popup movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </div>
  )
}

export default Movies
