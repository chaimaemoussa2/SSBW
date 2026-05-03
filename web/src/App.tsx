import Perritos from './components/Perritos.tsx'
import Cuadros from './components/Cuadros.tsx'

function App() {
  return (
    <div className="flex gap-8 items-center justify-center h-screen font-montserrat bg-gray-100">
      <Perritos />
      <Cuadros />
    </div>
  )
}

export default App