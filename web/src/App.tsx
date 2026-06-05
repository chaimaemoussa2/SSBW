import { BrowserRouter, Routes, Route, Link } from 'react-router'
import Portada from './pages/Portada.tsx'
import GaleriaPage from './pages/GaleriaPage.tsx'
import CarouselPage from './pages/CarouselPage.tsx'

function App() {
  return (
    <BrowserRouter>
      <nav className="bg-dark p-4 flex gap-6 justify-center bg-gray-800">
        <Link to="/" className="text-white font-montserrat hover:text-yellow-300">Portada</Link>
        <Link to="/galeria" className="text-white font-montserrat hover:text-yellow-300">Galería</Link>
        <Link to="/carousel" className="text-white font-montserrat hover:text-yellow-300">Carousel</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Portada />} />
        <Route path="/galeria" element={<GaleriaPage />} />
        <Route path="/carousel" element={<CarouselPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App