import Navbar from './Components/NavBar'
import Footer from './Components/Footer'
import Search from './Components/HeroSearch'
import './App.css'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Search />
      <Footer />
    </div>
  )
}



