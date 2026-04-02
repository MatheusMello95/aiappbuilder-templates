import { Play, Star } from 'lucide-react'
import airpodsImg from '../assets/AirPods-Pro-Review-ainda-vale-a-pena.webp'
import ipadImg from '../assets/ipad-pro-11-preto-u8w5xzl2m8.webp'
import iphoneImg from '../assets/Apple-iPhone-17-Pro-Max-Potentielles-Kamera-Redesign-nun-auch-in-einem-schicken-Konzeptvideo-zu-sehen.jpg'
import watchImg from '../assets/apple-watch-series-8-nova-post-1.jpg'

export default function BottomProducts() {
  return (
    <section className="bottom-section">
      {/* Combined: Header + Stat */}
      <div className="bottom-left">
        <div className="bottom-header">
          <h2 className="bottom-title">More Products</h2>
          <span className="bottom-subtitle">400 plus items</span>
        </div>
        <div className="bottom-left-cards">
          <div className="bottom-mini-card">
            <img src={ipadImg} alt="iPad Pro" className="bottom-mini-img" />
          </div>
          <div className="bottom-mini-card">
            <img src={iphoneImg} alt="iPhone" className="bottom-mini-img" />
          </div>
          <div className="bottom-mini-card">
            <img src={watchImg} alt="Apple Watch" className="bottom-mini-img" />
          </div>
        </div>
      </div>

      {/* Social Proof Card */}
      <div className="bottom-social-card">
        <div className="bottom-social-avatars">
          <div className="bottom-avatar" style={{ background: '#6C8EBF' }}>
            <svg viewBox="0 0 36 36" width="36" height="36">
              <circle cx="18" cy="14" r="7" fill="#F5DEB3"/>
              <path d="M8 32c0-6 4-10 10-10s10 4 10 10" fill="#4A6FA5"/>
              <circle cx="18" cy="14" r="7" fill="#F5DEB3"/>
              <rect x="14" y="8" width="8" height="4" rx="2" fill="#5C3317"/>
            </svg>
          </div>
          <div className="bottom-avatar" style={{ background: '#7CB342' }}>
            <svg viewBox="0 0 36 36" width="36" height="36">
              <circle cx="18" cy="14" r="7" fill="#F5DEB3"/>
              <path d="M8 32c0-6 4-10 10-10s10 4 10 10" fill="#558B2F"/>
              <rect x="12" y="6" width="12" height="5" rx="2" fill="#3E2723"/>
            </svg>
          </div>
          <div className="bottom-avatar" style={{ background: '#42A5F5' }}>
            <svg viewBox="0 0 36 36" width="36" height="36">
              <circle cx="18" cy="14" r="7" fill="#F5DEB3"/>
              <path d="M8 32c0-6 4-10 10-10s10 4 10 10" fill="#1565C0"/>
              <rect x="13" y="5" width="10" height="6" rx="2" fill="#1A237E"/>
            </svg>
          </div>
        </div>
        <div className="bottom-social-stat">
          <span className="bottom-social-value">5m+</span>
          <span className="bottom-social-label">Downloads</span>
        </div>
        <div className="bottom-social-rating">
          <Star size={14} fill="#FFB800" color="#FFB800" />
          <span>4.6 reviews</span>
        </div>
      </div>

      {/* Feature Card - Listening Released */}
      <div className="bottom-card bottom-feature-card">
        <img
          src={airpodsImg}
          alt="Listening Released"
          className="bottom-card-bg"
        />
        <div className="bottom-feature-content">
          <div className="bottom-feature-play">
            <Play size={14} fill="white" />
          </div>
          <div>
            <span className="bottom-feature-title">Listening Has<br />Been Released</span>
            <span className="bottom-feature-sub">Seamless Hi-Fi Music</span>
          </div>
        </div>
      </div>
    </section>
  )
}
