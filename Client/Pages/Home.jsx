import React from 'react'
import { Clapperboard, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../componentsRaw/Navbar.jsx'


function Home() {
  const navigate = useNavigate()
  return (
    <>
    <Navbar/>
    <div className="h-[90.1vh] w-full bg-[#1b1b1b] flex justify-center items-center">
      <div className="
        h-[55vh] w-[43vw]
        rounded-2xl
        border border-[#F5C518]
        bg-[#0B0B0E]
        flex flex-col items-center
        gap-3
        py-10 px-8
        shadow-xl
        transition-all duration-300
        hover:shadow-2xl
      ">


        <div className="p-3 rounded-full bg-[#141418]">
          <Clapperboard size={56} color="#F5C518" strokeWidth={2} />
        </div>
        <h2 className="text-3xl font-extrabold tracking-wide text-[#F5C518]">
          WatchWise
        </h2>
        <p className="text-center text-[#EAEAEA] text-base max-w-sm leading-relaxed">
          Stop scrolling.
          <span className="text-[#F5C518] font-semibold"> Start watching </span>
          the perfect movie for your moment.
        </p>

        <div className="w-20 bg-[#F5C518]/40 my-1 rounded-full" />

        <button
          className="
            mt-3
            flex items-center gap-2
            px-6 py-2.5
            rounded-full
            bg-[#F5C518]
            text-black
            font-semibold
            text-base
            transition-all duration-300
            hover:bg-[#ffd84d]
            active:scale-95
          "
          onClick={() => navigate('/preferences')}

        >
          
          <Sparkles size={18} />
          Find My Movie
        </button>

      </div>
    </div>
    </>
  )
}

export default Home