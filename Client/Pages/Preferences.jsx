import React, { useState } from 'react'
import { Popcorn } from 'lucide-react';
import Navbar from '../componentsRaw/Navbar';
import CustomSelect from '../componentsRaw/CustomSelect';
import { Button, buttonVariants } from '@/components/ui/button';
import { MultiSelect } from '@/components/ui/multi-select.jsx';
import { useNavigate } from 'react-router-dom';
import { getMovieRecommendation } from '../Service/movieService.js';


function Preferences() {

  const navigateTo = useNavigate()
  const [mood, setmood] = useState("")
  const [genre, setgenre] = useState([])
  const [language, setlanguage] = useState("")
  const [era, setera] = useState("")
  const [notes, setnotes] = useState("")
  const [numberOfRec, setnumbesOfRec] = useState("")

  const moodOptions = [
    { value: "action", label: "Craving high-octane action" },
    { value: "adventure", label: "In the mood for a grand adventure" },
    { value: "comedy", label: "Just want a good laugh" },
    { value: "horror", label: "Ready for something truly scary" },
    { value: "inspiring", label: "Looking for something uplifting" },
    { value: "thriller", label: "In the mood for dark suspense" },
    { value: "romance", label: "Feeling romantic tonight" },
    { value: "nostalgic", label: "Missing the good old days" }
  ]

  const genreOptions = [
    { value: "Action", label: "Action" },
    { value: "Comedy", label: "Comedy" },
    { value: "Horror", label: "Horror" },
    { value: "Romance", label: "Romance" },
    { value: "Sci-Fi", label: "Sci-Fi" },
    { value: "Fantasy", label: "Fantasy" },
    { value: "Crime/Thriller", label: "Crime/Thriller" },
    { value: "Drama", label: "Drama" },
  ]

  const languageOption = [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "Korean", label: "Korean" },
    { value: "Franch", label: "Franch" },
    { value: "Spanish", label: "Spanish" },
  ]

  const eraOptions = [
    { value: "2020+", label: '2020+' },
    { value: "2000s", label: '2000s' },
    { value: "2010s", label: '2010s' },
    { value: "Retro", label: 'Retro' },
  ]

  const numberOfRecOptions = [
    { value: "5", label: "5" },
    { value: "10", label: "10" },
    { value: "15", label: "15" },
    { value: "20", label: "20" },
  ]
  const submiteHandler = async (e) => {
    e.preventDefault()

    const preferences = {
      mood,
      genre,
      language,
      era,  
      notes,
      numberOfRec : Number(numberOfRec)
    }
    // console.log("Preferences", preferences)
    navigateTo('/movies')
     try {
    const result = await getMovieRecommendation(preferences);

    navigateTo("/movies", {
      state: {
        preferences
      },
    });
  } catch (error) {
    console.error("Error in passing params from /Preference to /Movies movies", error);
  }

  }
  return (
    <>
      <Navbar />
      <div className='min-h-screen w-full bg-[#1b1b1b] flex items-start justify-center p-4 '>
        <div className='w-full max-w-2xl bg-[#252525] px-10 py-12 rounded-xl border-2 mt-[4vw] border-[#F5C518] shadow-lg shadow-[#F5C518]/10'>
          <div className='flex items-center justify-center flex-col gap-3 mb-8'>
            <Popcorn size={65} color="#F5C518" />
            <div className='flex flex-col justify-start items-center'>
              <h1 className="text-3xl font-bold tracking-tight text-[#F5C518]">
                Movies that match your moment
              </h1>
              <p className="mt-1 text-sm text-gray-200">
                Tell us your preferences and let WatchWise do the thinking.
              </p>
            </div>
          </div>

          <form onSubmit={submiteHandler} className='flex flex-col gap-3 text-gray-400'>
            <CustomSelect options={moodOptions} value={mood} onChange={setmood} placeholder={"What vibe are you in?"} label="Current mood" />
            
            <h1 className="block text-md font-semibold text-[#F5C518] mb-2">
              Your Genre Pick
            </h1>
            <MultiSelect  maxSelection={3} className='w-full bg-[#1b1b1b] text-gray-200 hover:text-gray-200  border-2 border-gray-700 hover:border-[#F5C518] rounded-lg px-4 py-3 focus:outline-none focus:border-[#F5C518] focus:ring-2 focus:ring-[#F5C518]/50 transition-all' options={genreOptions} value={genre} onValueChange={setgenre}/>
            <CustomSelect options={languageOption} value={language} onChange={setlanguage} placeholder="Language You Like  " label="Choose a language" />
            <CustomSelect options={eraOptions} value={era} onChange={setera} placeholder="What Era you enjoy most?" label="Pick a movie Era" />
            <div className="flex flex-col gap-2">
              <label className="text-md font-semibold text-[#F5C518]">
                Extra Notes
              </label>

              <input
                type="text"
                value={notes}
                onChange={(e) => { setnotes(e.target.value) }}
                placeholder="Anything specific you’re in the mood for?"
                className="
      w-full
      bg-[#1b1b1b]
      placeholder:text-gray-500
      border-2 border-gray-700
      text-[13px]
      transition-all duration-300
      focus:outline-none
      focus:border-[#F5C518]
      focus:ring-2 focus:ring-[#F5C518]/40
      hover:border-[#F5C518]/70
      text-gray-100 hover:bg-[#F5C518]/20  focus:bg-[#F5C518]/20  cursor-pointer py-2 
      px-3.5 rounded-lg
    "
              />
            </div>
            <CustomSelect options={numberOfRecOptions} value={numberOfRec} onChange={setnumbesOfRec} placeholder="Number of movies for Recommendation" label="How many Movies?" />
            <div className='flex justify-center w-[43vw]'>
              <Button
               type="submit" 
                className='mt-5 -mb-3 w-[17vw] bg-[#F5C518] hover:bg-[#e6b510] text-[#1b1b1b] font-bold text-md py-4   rounded-lg transition-all duration-300 shadow-lg hover:shadow-[#F5C518]/50 hover:scale-[1.02] active:scale-[0.98] border-none'
              >
                Get Recommendations 🎬
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Preferences