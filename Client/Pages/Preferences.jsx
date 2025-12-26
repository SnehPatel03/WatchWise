import React from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react'
function Preferences() {
  const [mood, setmood] = useState("")
  const [genre, setgenre] = useState("")
  const [language, setlanguage] = useState("")
  const [era, setera] = useState("")
  const [notes, setnotes] = useState("")
  const [numbesOfRec, setnumbesOfRec] = useState(null)

  const submiteHandler = (e) => {
    e.preventDefault()

    const preferences = {
      mood,
      genre,
      language,
      era,
      notes,
      numbesOfRec
    }


  }

  return (
    <>
      <Navbar />
      <div className='h-[90.1vh] w-full bg-[#1b1b1b] flex items-center justify-center'>
        <form onSubmit={(e) => {
          submiteHandler(e)
        }} className='h-[70vh] w-[40vw]  px-10 py-12 rounded-xl border-2 border-[#F5C518]'>
          <div className='text-gray-300'>
            <h2 className="text-md font-semibold text-[#F5C518] mb-2">
              What vibe are you in?
            </h2>

            <select
              value={mood}
              onChange={(e) => setmood(e.target.value)}
              className="
    w-full
    bg-[#1b1b1b]
    text-gray-200
    border
    border-gray-600
    rounded-xl
    px-4 py-1.5
    focus:outline-none
    focus:border-[#F5C518]
    focus:ring-1
    focus:ring-[#F5C518]
    transition-all
  "
            >
              <option value="action">Craving high-octane action</option>
              <option value="adventure">In the mood for a grand adventure</option>
              <option value="comedy">Just want a good laugh</option>
              <option value="horror">Ready for something truly scary</option>
              <option value="inspiring">Looking for something uplifting</option>
              <option value="thriller">In the mood for dark suspense</option>
              <option value="romance">Feeling romantic tonight</option>
              <option value="nostalgic">Missing the good old days</option>

            </select>

          </div>
        </form>
      </div>
    </>
  )
}

export default Preferences