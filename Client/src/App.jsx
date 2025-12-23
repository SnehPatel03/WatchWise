import { useState } from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom' 
import Home from './Pages/Home.jsx'
import Movies from './Pages/Movies.jsx'
import Preferences from './Pages/Preferences.jsx' 

function App() {
  return (
    <>
    <Routes>
    <Route path='/'element={<Home/>}/>
    <Route path='/preferences'element={<Preferences/>}/>
    <Route path='/movies'element={<Movies/>}/>
    </Routes>
    </>
  )
}

export default App
