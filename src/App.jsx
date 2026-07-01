import Navbar from './Components/NavBar'
import Footer from './Components/Footer'
import Search from './Components/HeroSearch'
import VehiclesPage from './Pages/VehiclePages'
import './App.css'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Search />
      <VehiclesPage/>
      <Footer />
    </div>
  )
}



