import headphonesImg from '../assets/AirPods-Max-Space-Gray-and-Purple-Feature.jpg'
import watchImg from '../assets/apple-watch-series-8-nova-post-1.jpg'
import phoneImg from '../assets/Apple-iPhone-17-Pro-Max-Potentielles-Kamera-Redesign-nun-auch-in-einem-schicken-Konzeptvideo-zu-sehen.jpg'
import tabletImg from '../assets/ipad-pro-11-preto-u8w5xzl2m8.webp'
import earbudsImg from '../assets/airpods-pro-cameras-ia-327x204.webp'
import visionImg from '../assets/Apple-WWCD23-Vision-Pro-EyeSight-230605.jpg.large_2x.jpg'

const categories = [
  { name: 'Headphones', count: 245, image: headphonesImg },
  { name: 'Watches', count: 183, image: watchImg },
  { name: 'Phones', count: 312, image: phoneImg },
  { name: 'Tablets', count: 127, image: tabletImg },
  { name: 'Earbuds', count: 198, image: earbudsImg },
  { name: 'VR Headsets', count: 64, image: visionImg },
]

export default function FeaturedCategories() {
  return (
    <section className="categories-section">
      <div className="section-top">
        <div>
          <h2 className="section-title">Featured Categories</h2>
          <p className="section-desc">Browse our most popular product categories</p>
        </div>
        <button className="section-link">View All</button>
      </div>
      <div className="categories-grid">
        {categories.map(cat => (
          <div key={cat.name} className="category-card">
            <div className="category-img">
              <img src={cat.image} alt={cat.name} />
            </div>
            <span className="category-name">{cat.name}</span>
            <span className="category-count">{cat.count} products</span>
          </div>
        ))}
      </div>
    </section>
  )
}
