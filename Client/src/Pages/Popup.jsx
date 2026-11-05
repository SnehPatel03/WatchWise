import { CalendarDays, Globe2, Star, X } from "lucide-react"
import { useEffect, useState } from "react"

function Popup({ movie, onClose }) {
  const [imageFailed, setImageFailed] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  if (!movie) return null

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <section
        className="movie-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="movie-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="icon-button modal-close" type="button" onClick={onClose} aria-label="Close movie details">
          <X size={18} />
        </button>
        <div className="modal-content">
          <div className="modal-poster">
            {movie.poster && !imageFailed && (
              <img src={movie.poster} alt={`${movie.title} poster`} onError={() => setImageFailed(true)} />
            )}
          </div>
          <div className="modal-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> A WatchWise pick</div>
            <h2 id="movie-title">{movie.title}</h2>
            <div className="modal-meta">
              {movie.type && <span>{movie.type.toUpperCase()}</span>}
              <span className="movie-rating"><Star size={15} fill="currentColor" /> {movie.rating || "—"}<span>/10</span></span>
              {movie.year && <span>{movie.year}</span>}
            </div>

            <h3 className="modal-label">The story</h3>
            <p className="modal-plot">{movie.plot || "A little mystery remains. Open this one up and see where the story takes you."}</p>

            <div className="detail-grid">
              <div className="detail-item">
                <span><CalendarDays size={13} /> Release date</span>
                <strong>{movie.releaseDate || movie.year || "Not available"}</strong>
              </div>
              <div className="detail-item">
                <span><Globe2 size={13} /> Language</span>
                <strong>{movie.language || "Not available"}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Popup
