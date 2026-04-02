import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import BentoCards from './components/BentoCards'
import BottomProducts from './components/BottomProducts'
import FeaturedCategories from './components/FeaturedCategories'
import TrendingProducts from './components/TrendingProducts'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <div className="app">
      <Navbar dark={dark} onToggleDark={() => setDark(d => !d)} />
      <main className="main-content">
        <div className="page-grid">
          <div className="page-left">
            <HeroSection />
            <BottomProducts />
          </div>
          <div className="page-right">
            <BentoCards />
          </div>
        </div>
        <FeaturedCategories />
        <TrendingProducts />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

export default App
