import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import Preferences from '../pages/Preferences.jsx'
import Movies from '../pages/Movies.jsx'


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/preferences' element={<Preferences />} />
        <Route path='/movies' element={<Movies />} />
      </Routes>
    </>
  )
}

export default App