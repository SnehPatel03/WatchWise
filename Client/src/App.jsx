import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Preferences from './Pages/Preferences.jsx'
import Movies from './Pages/Movies.jsx'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/preferences" element={<Preferences />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App