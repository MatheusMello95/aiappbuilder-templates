import { ArrowUpRight } from 'lucide-react'
import xbudImg from '../assets/airpods-pro-cameras-ia-327x204.webp'
import visionImg from '../assets/Apple-WWCD23-Vision-Pro-EyeSight-230605.jpg.large_2x.jpg'

const popularColors = [
  { name: 'White', color: '#F5F5F5', shadow: 'rgba(0,0,0,0.08)' },
  { name: 'Gray', color: '#9E9E9E', shadow: 'rgba(0,0,0,0.15)' },
  { name: 'Green', color: '#7CB342', shadow: 'rgba(124,179,66,0.35)' },
  { name: 'Blue', color: '#42A5F5', shadow: 'rgba(66,165,245,0.35)' },
  { name: 'Rose', color: '#E57373', shadow: 'rgba(229,115,115,0.35)' },
]

export default function BentoCards() {
  return (
    <div className="bento-cards">
      {/* Popular Colors */}
      <div className="bento-card bento-popular">
        <h3 className="bento-popular-title">Popular Colors</h3>
        <div className="bento-color-dots">
          {popularColors.map(c => (
            <button
              key={c.name}
              className="bento-color-orb"
              title={c.name}
              style={{
                '--orb-color': c.color,
                '--orb-shadow': c.shadow,
              }}
            >
              <span className="orb-shine" />
            </button>
          ))}
        </div>
      </div>

      {/* New Gen X-Bud - dark card */}
      <div className="bento-card bento-newgen">
        <div className="bento-newgen-content">
          <h3 className="bento-newgen-title">New Gen<br />X-Bud</h3>
          <button className="bento-arrow-btn bento-arrow-light">
            <ArrowUpRight size={14} />
          </button>
        </div>
        <img
          src={xbudImg}
          alt="New Gen X-Bud"
          className="bento-card-img"
        />
      </div>

      {/* Vision Pro */}
      <div className="bento-card bento-surface">
        <div className="bento-surface-content">
          <h3 className="bento-surface-title">Light Grey Surface<br />Headphone</h3>
          <p className="bento-surface-sub">Seamless Hi-Fi Audio</p>
        </div>
        <img
          src={visionImg}
          alt="Light Grey Surface Headphone"
          className="bento-card-img"
        />
      </div>
    </div>
  )
}
