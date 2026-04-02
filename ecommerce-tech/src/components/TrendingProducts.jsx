import { Star, ShoppingBag, ArrowRight } from 'lucide-react'
import airpodsMaxImg from '../assets/AirPods-Max-Space-Gray-and-Purple-Feature.jpg'
import airpodsProImg from '../assets/AirPods-Pro-Review-ainda-vale-a-pena.webp'
import watchImg from '../assets/apple-watch-series-8-nova-post-1.jpg'
import ipadImg from '../assets/ipad-pro-11-preto-u8w5xzl2m8.webp'
import iphoneImg from '../assets/Apple-iPhone-17-Pro-Max-Potentielles-Kamera-Redesign-nun-auch-in-einem-schicken-Konzeptvideo-zu-sehen.jpg'

const products = [
  {
    id: 1, name: 'AirPods Max Silver', price: '$549.00', oldPrice: '$599.00',
    rating: 4.9, reviews: 2341,
    image: airpodsMaxImg,
    tag: 'Best Seller',
  },
  {
    id: 2, name: 'AirPods Pro 2nd Gen', price: '$249.00',
    rating: 4.8, reviews: 3156,
    image: airpodsProImg,
    tag: 'Top Rated',
  },
  {
    id: 3, name: 'Apple Watch Series 8', price: '$399.00', oldPrice: '$449.00',
    rating: 4.9, reviews: 987,
    image: watchImg,
    tag: 'Popular',
  },
  {
    id: 4, name: 'iPad Pro M4 11"', price: '$1,099.00', oldPrice: '$1,199.00',
    rating: 4.7, reviews: 1423,
    image: ipadImg,
  },
  {
    id: 5, name: 'iPhone 17 Pro Max', price: '$1,199.00',
    rating: 4.8, reviews: 1856,
    image: iphoneImg,
    tag: 'New',
  },
]

export default function TrendingProducts() {
  return (
    <section className="trending-section">
      <div className="section-top">
        <div>
          <h2 className="section-title">Trending Now</h2>
          <p className="section-desc">Most popular products this week</p>
        </div>
        <button className="section-link">
          See All <ArrowRight size={14} />
        </button>
      </div>
      <div className="trending-grid">
        {products.map(p => (
          <div key={p.id} className="trending-card">
            <div className="trending-img">
              {p.tag && <span className="trending-tag">{p.tag}</span>}
              <img src={p.image} alt={p.name} />
              <button className="trending-cart-btn">
                <ShoppingBag size={16} />
              </button>
            </div>
            <div className="trending-info">
              <h4 className="trending-name">{p.name}</h4>
              <div className="trending-rating">
                <Star size={12} fill="#FFB800" color="#FFB800" />
                <span>{p.rating}</span>
                <span className="trending-reviews">({p.reviews})</span>
              </div>
              <div className="trending-price-row">
                <span className="trending-price">{p.price}</span>
                {p.oldPrice && <span className="trending-old-price">{p.oldPrice}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
