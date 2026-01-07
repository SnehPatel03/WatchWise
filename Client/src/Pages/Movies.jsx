import { useLocation, useNavigate } from "react-router-dom";
import { getMovieRecommendation } from "../../Service/movieService.js";
import Loader from "../../componentsRaw/Loader.jsx";
import { useState, useEffect } from "react";
import Navbar from "../../componentsRaw/Navbar.jsx";
import Popup from "./Popup.jsx";

function Movies() {
  const { state } = useLocation();
  const preferences = state?.preferences

  const [movie, setmovie] = useState([])
  const [loader, setloader] = useState(true)
  const [selectedMovie, setselectedMovie] = useState(null)

  useEffect(() => {
    if (!preferences) return;

    const fetchMovies = async () => {
      try {
        const res = await getMovieRecommendation(preferences);
        setmovie(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setloader(false);
      }
    };
    fetchMovies();
  }, [preferences])

  if (loader) {
    return <Loader />
  }
  return (
    <>
      <div className="flex flex-col items-center justify-start min-h-screen w-full bg-[#1b1b1b]">
        <Navbar />

        <div className="min-h-screen bg-[#1b1b1b] px-8 py-6">
          <h1 className="text-2xl font-bold text-[#F5C518] mb-6">
            Your Movie Recommendations 🎬
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {movie.map((movie, index) => (
              <div
                key={index}
                onClick={() => setselectedMovie(movie)}
                className="
              relative
              transition duration-550 ease-in-out
              sm:h-[67vh]
              sm:w-[20vw]
              rounded-xl
              overflow-hidden
              border
              hover:border-7 hover:border-[#F5C518] 
              hover:scale-95
              
              border-[#F5C518]/30
              bg-[#1b1b1b] flex flex-col
            "
              >
                <img
                  src={movie.poster}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://imgs.search.brave.com/P8RUDEd7125NRWmN6fGrlcAyoYtr-gGqiFGCI4SERYk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzk3LzE0/L2IyLzk3MTRiMjA1/YWY2MTE2YmY5YWFi/ZjE1OWY0MjMzNzNi/LmpwZw';
                  }}
                  className="w-full h-[60vh] object-cover object-top"
                />
                <div

                  className="
                absolute
                inset-x-0
                bottom-0
                h-[60vh] 
                bg-gradient-to-t
                from-black
                via-black/90
                to-transparent
              "
                />

                <div className="absolute bottom-7 z-10 p-4 w-full flex flex-col  ">
                  <h2
                    className={`font-bold  text-white leading-tight ${movie.title.length > 10 ? "text-2xl" : "text-3xl"
                      }`}
                  >
                    {movie.title}
                  </h2>
                  <p className="text-sm  text-gray-300 absolute -bottom-3 font-bold">
                    {movie.year}
                  </p>
                  <p className="text-sm  text-gray-300 mt-4 font-bold">
                    IMDb: {movie.rating}
                  </p>
                </div>
              </div>
            ))}
            {selectedMovie && (
              <Popup movie={selectedMovie} onClose={() => setselectedMovie(null)} />
            )}
          </div>
        </div>
      </div>
    </>

  );
}

export default Movies;
