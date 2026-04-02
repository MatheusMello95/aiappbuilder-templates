import { Music, Check, Instagram, Twitter, Facebook } from 'lucide-react'
import heroImg from '../assets/AirPods-Max-Space-Gray-and-Purple-Feature.jpg'

export default function HeroSection() {
  return (
    <section className="hero-section" style={{ backgroundImage: `url(${heroImg})` }}>
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-tag">
          <Music size={14} />
          <span>Music in Classic</span>
        </div>

        <h1 className="hero-title">
          Sequoia Inspiring<br />
          Musico.
        </h1>

        <div className="hero-feature">
          <div className="hero-feature-badge">
            <Check size={14} />
          </div>
          <div>
            <span className="hero-feature-label">Clear Sounds</span>
            <p className="hero-feature-text">
              Making your music come true<br />
              but with Sequoia Sounds
            </p>
          </div>
        </div>

        <button className="hero-cta">
          View All Products
        </button>

        <div className="hero-bottom">
          <div className="hero-social">
            <span className="hero-social-label">Follow us on</span>
            <div className="hero-social-icons">
              <button className="social-icon-btn"><Instagram size={16} /></button>
              <button className="social-icon-btn"><Twitter size={16} /></button>
              <button className="social-icon-btn"><Facebook size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
