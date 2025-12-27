import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getMovieRecommendation } from "../Service/movieService.js";
import Loader from "../componentsRaw/Loader.jsx";
import { useState,useEffect } from "react";

function Movies() {
  const {state} = useLocation();
  const preferences = state?.preferences

  const [movie, setmovie] = useState([])
  const [loader, setloader] = useState(true)

  
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
  },[preferences])

  if(loader){
      return <Loader/>
  }
 return (
    <div className="min-h-screen bg-[#1b1b1b] px-8 py-6">
      <h1 className="text-2xl font-bold text-[#F5C518] mb-6">
        Your Movie Recommendations 🎬
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {movie.map((movie, index) => (
          <div
            key={index}
            className="bg-[#252525] border border-[#F5C518]/30 rounded-lg p-4"
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="rounded-md mb-3"
            />
            <h2 className="text-lg font-semibold text-white">
              {movie.title}
            </h2>
            <p className="text-sm text-gray-400">
              {movie.year} • ⭐ {movie.rating}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;
