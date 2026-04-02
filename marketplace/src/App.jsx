import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'

const VENDORS = [
  { id: 1, name: 'TechNova', avatar: 'https://i.pravatar.cc/100?img=11', desc: 'Premium electronics & gadgets', products: 142, rating: 4.9, sales: '12.4k', verified: true },
  { id: 2, name: 'UrbanCraft', avatar: 'https://i.pravatar.cc/100?img=12', desc: 'Handcrafted home & lifestyle', products: 89, rating: 4.8, sales: '8.1k', verified: true },
  { id: 3, name: 'FitGear Pro', avatar: 'https://i.pravatar.cc/100?img=14', desc: 'Sports & fitness equipment', products: 67, rating: 4.7, sales: '6.3k', verified: true },
  { id: 4, name: 'StyleVault', avatar: 'https://i.pravatar.cc/100?img=16', desc: 'Fashion & accessories', products: 234, rating: 4.8, sales: '15.7k', verified: true },
  { id: 5, name: 'GreenLeaf', avatar: 'https://i.pravatar.cc/100?img=20', desc: 'Organic skincare & wellness', products: 56, rating: 4.9, sales: '4.2k', verified: true },
  { id: 6, name: 'AudioPhile', avatar: 'https://i.pravatar.cc/100?img=22', desc: 'High-end audio equipment', products: 38, rating: 4.6, sales: '3.8k', verified: false },
]

const PRODUCTS = [
  { id: 1, title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones', price: 348, originalPrice: 399, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&h=450&fit=crop', vendorId: 1, badge: 'sale', rating: 4.8, reviews: 2847, category: 'Electronics', desc: 'Industry-leading noise cancellation with Auto NC Optimizer. Crystal clear hands-free calling with 4 beamforming microphones. Up to 30 hours of battery life.' },
  { id: 2, title: 'Minimalist Leather Crossbody Bag — Italian Calfskin', price: 189, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=450&fit=crop', vendorId: 4, badge: 'new', rating: 4.9, reviews: 632, category: 'Fashion', desc: 'Handcrafted from premium Italian calfskin leather. Adjustable strap, brass hardware, and suede-lined interior. Perfect for everyday elegance.' },
  { id: 3, title: 'Smart Home Air Purifier with HEPA H13 Filter', price: 279, originalPrice: 349, image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=450&fit=crop', vendorId: 1, badge: 'sale', rating: 4.7, reviews: 1203, category: 'Home', desc: 'Captures 99.97% of particles as small as 0.3 microns. Smart app control, auto mode, and sleep mode. Covers up to 1,200 sq ft.' },
  { id: 4, title: 'Organic Rosehip Facial Serum — Cold Pressed', price: 42, image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&h=450&fit=crop', vendorId: 5, badge: 'hot', rating: 4.9, reviews: 3156, category: 'Beauty', desc: 'Pure cold-pressed rosehip oil enriched with vitamin C and retinol. Reduces dark spots, fine lines, and evens skin tone. 100% organic.' },
  { id: 5, title: 'Mechanical Keyboard — Cherry MX Brown, RGB Backlit', price: 159, originalPrice: 199, image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&h=450&fit=crop', vendorId: 1, badge: 'sale', rating: 4.6, reviews: 892, category: 'Electronics', desc: 'Cherry MX Brown switches for the perfect balance of typing and gaming. Per-key RGB lighting, aluminum frame, detachable USB-C cable.' },
  { id: 6, title: 'Handwoven Macramé Wall Hanging — Boho Decor', price: 67, image: 'https://images.unsplash.com/photo-1622127922040-13cab637ee78?w=600&h=450&fit=crop', vendorId: 2, rating: 4.8, reviews: 445, category: 'Home', desc: 'Beautifully handwoven macramé wall hanging made from 100% natural cotton cord. Each piece is unique and adds warmth to any room.' },
  { id: 7, title: 'Adjustable Dumbbell Set — 5 to 52.5 lbs', price: 349, image: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=600&h=450&fit=crop', vendorId: 3, badge: 'hot', rating: 4.7, reviews: 1567, category: 'Sports', desc: 'Replace 15 sets of dumbbells with one compact design. Quick-change weight selection from 5 to 52.5 lbs. Durable steel construction.' },
  { id: 8, title: 'Vintage Canvas Backpack — Waxed Cotton, Leather Trim', price: 129, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=450&fit=crop', vendorId: 4, badge: 'new', rating: 4.5, reviews: 278, category: 'Fashion', desc: 'Water-resistant waxed canvas with genuine leather accents. Padded 15" laptop compartment, multiple pockets, and brass buckles.' },
  { id: 9, title: 'Bluetooth Speaker — 360° Sound, Waterproof IPX7', price: 89, originalPrice: 129, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=450&fit=crop', vendorId: 6, badge: 'sale', rating: 4.4, reviews: 2104, category: 'Electronics', desc: '360-degree immersive sound with deep bass. IPX7 waterproof — pool, beach, and shower ready. 24-hour battery life.' },
  { id: 10, title: 'Ceramic Pour-Over Coffee Dripper Set', price: 45, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=450&fit=crop', vendorId: 2, rating: 4.8, reviews: 967, category: 'Home', desc: 'Hand-glazed ceramic dripper with elegant wood stand. Includes 40 natural paper filters. Brews 1-3 cups of exceptional coffee.' },
  { id: 11, title: 'Yoga Mat — Non-Slip, Eco-Friendly Natural Rubber', price: 78, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=450&fit=crop', vendorId: 3, rating: 4.6, reviews: 823, category: 'Sports', desc: 'Made from sustainably harvested natural rubber. 5mm thickness for optimal cushioning. Non-slip surface on both sides.' },
  { id: 12, title: 'Retinol Night Cream — Anti-Aging, Peptide Complex', price: 56, originalPrice: 72, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=450&fit=crop', vendorId: 5, badge: 'sale', rating: 4.7, reviews: 1834, category: 'Beauty', desc: 'Advanced retinol formula with peptides and hyaluronic acid. Reduces wrinkles and firms skin overnight. Dermatologist tested.' },
]

const REVIEWS = [
  { id: 1, author: 'Sarah M.', avatar: 'https://i.pravatar.cc/100?img=1', date: 'Mar 18, 2026', rating: 5, text: 'Absolutely love these headphones! The noise cancellation is next level. Worth every penny.', productId: 1, verified: true },
  { id: 2, author: 'James K.', avatar: 'https://i.pravatar.cc/100?img=3', date: 'Mar 15, 2026', rating: 5, text: "The leather quality is outstanding. You can tell it's genuine Italian calfskin. Incredibly elegant.", productId: 2, verified: true },
  { id: 3, author: 'Emily R.', avatar: 'https://i.pravatar.cc/100?img=5', date: 'Mar 12, 2026', rating: 4, text: 'Great serum! My skin looks noticeably brighter after 3 weeks. Product itself is amazing.', productId: 4, verified: true },
  { id: 4, author: 'David L.', avatar: 'https://i.pravatar.cc/100?img=7', date: 'Mar 10, 2026', rating: 5, text: "These dumbbells replaced my entire rack. Build quality is exceptional. Best fitness purchase.", productId: 7, verified: false },
  { id: 5, author: 'Maria C.', avatar: 'https://i.pravatar.cc/100?img=9', date: 'Mar 8, 2026', rating: 5, text: 'The pour-over set makes the most delicious coffee. Beautifully crafted ceramic dripper.', productId: 10, verified: true },
  { id: 6, author: 'Alex T.', avatar: 'https://i.pravatar.cc/100?img=8', date: 'Mar 5, 2026', rating: 4, text: 'Solid mechanical keyboard. Cherry MX Browns feel great for both typing and gaming.', productId: 5, verified: true },
]

const CATEGORIES = [
  { name: 'Electronics', icon: '⚡', count: 1240, color: '#60a5fa', bg: 'rgba(96,165,250,0.15)', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=300&fit=crop' },
  { name: 'Fashion', icon: '👜', count: 890, color: '#f472b6', bg: 'rgba(244,114,182,0.15)', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop' },
  { name: 'Home', icon: '🏠', count: 654, color: '#fbbf24', bg: 'rgba(251,191,36,0.15)', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop' },
  { name: 'Beauty', icon: '✨', count: 432, color: '#e879f9', bg: 'rgba(232,121,249,0.15)', image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=300&fit=crop' },
  { name: 'Sports', icon: '🏋️', count: 378, color: '#4ade80', bg: 'rgba(74,222,128,0.15)', image: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=400&h=300&fit=crop' },
  { name: 'Books', icon: '📚', count: 567, color: '#22d3ee', bg: 'rgba(34,211,238,0.15)', image: 'https://images.unsplash.com/photo-1622127922040-13cab637ee78?w=400&h=300&fit=crop' },
]

const TRENDING_SEARCHES = [
  { label: 'Headphones', icon: '🎧' },
  { label: 'Leather bags', icon: '👜' },
  { label: 'Skincare', icon: '🧴' },
  { label: 'Keyboards', icon: '⌨️' },
  { label: 'Fitness', icon: '💪' },
  { label: 'Coffee', icon: '☕' },
]

function useScrollReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('revealed'); observer.unobserve(el) } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

function Stars({ rating, size = 13 }) {
  return (
    <span className="stars" style={{ fontSize: size }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i}>{i <= Math.floor(rating) ? '★' : i - 0.5 <= rating ? '★' : '☆'}</span>
      ))}
    </span>
  )
}

/* ===== Header ===== */
function Header({ cartCount, onSearch, searchQuery, cartBounce, theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const searchRef = useRef(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false)
        setSearchFocused(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  const suggestions = searchQuery.length > 0
    ? PRODUCTS.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : []

  return (
    <header className={`header${scrolled ? ' header-scrolled' : ''}`}>
      <div className="header-top">
        <div className="logo">
          <div className="logo-icon">🛍</div>
          NightMarket
        </div>
        <nav className="nav-links">
          <a href="#" className="active">Home</a>
          <a href="#">Categories</a>
          <a href="#">Vendors</a>
          <a href="#">Deals</a>
        </nav>
        <div className="header-actions">
          <button className={`cart-btn${cartBounce ? ' cart-bounce' : ''}`} aria-label="Shopping cart">
            🛒
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          <button className="btn btn-ghost btn-theme-toggle" onClick={onToggleTheme}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button className="btn btn-ghost btn-sign-in">Sign In</button>
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile slide-out menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <nav className="mobile-menu" onClick={e => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <div className="logo"><div className="logo-icon">🛍</div>NightMarket</div>
              <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>✕</button>
            </div>
            <div className="mobile-menu-links">
              <a href="#" className="active">Home</a>
              <a href="#">Categories</a>
              <a href="#">Vendors</a>
              <a href="#">Deals</a>
            </div>
            <div className="mobile-menu-footer">
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Sign In</button>
              <button className="btn btn-ghost" onClick={onToggleTheme} style={{ width: '100%', justifyContent: 'center' }}>
                {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
            </div>
          </nav>
        </div>
      )}

      <div className={`search-section${scrolled ? ' search-collapsed' : ''}`}>
        <div className="search-wrapper" ref={searchRef}>
          <span className="search-icon">🔍</span>
          <input
            className="mega-search"
            type="text"
            placeholder="Search products, brands, categories..."
            value={searchQuery}
            onChange={e => { onSearch(e.target.value); setShowDropdown(true) }}
            onFocus={() => { setShowDropdown(true); setSearchFocused(true) }}
          />
          <span className="search-shortcut">⌘K</span>

          {showDropdown && (
            <div className="search-dropdown">
              {suggestions.length > 0 ? (
                <>
                  <div className="search-dropdown-label">Products</div>
                  {suggestions.map(p => (
                    <div key={p.id} className="search-suggestion" onClick={() => { onSearch(p.title); setShowDropdown(false) }}>
                      <img src={p.image} alt="" className="search-suggestion-img" />
                      <div className="search-suggestion-info">
                        <div className="search-suggestion-title">{p.title}</div>
                        <div className="search-suggestion-price">${p.price}</div>
                      </div>
                    </div>
                  ))}
                </>
              ) : searchQuery.length === 0 ? (
                <>
                  <div className="search-dropdown-label">Popular Categories</div>
                  {CATEGORIES.slice(0, 4).map(c => (
                    <div key={c.name} className="search-suggestion" onClick={() => { onSearch(c.name); setShowDropdown(false) }}>
                      <span className="search-suggestion-icon">{c.icon}</span>
                      <div className="search-suggestion-info">
                        <div className="search-suggestion-title">{c.name}</div>
                        <div className="search-suggestion-price">{c.count.toLocaleString()} items</div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="search-no-results">No products found for "{searchQuery}"</div>
              )}
            </div>
          )}
        </div>
        {(searchFocused || !scrolled) && (
          <div className="trending-tags">
            <span className="trending-label">Trending:</span>
            {TRENDING_SEARCHES.map(t => (
              <button key={t.label} className="trending-tag" onClick={() => { onSearch(t.label); setShowDropdown(false) }}>
                <span className="trending-tag-icon">{t.icon}</span> {t.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

/* ===== Mobile Bottom Nav ===== */
function MobileBottomNav() {
  return (
    <nav className="mobile-bottom-nav">
      <a href="#" className="mobile-nav-item active">
        <span className="mobile-nav-icon">🏠</span>
        <span className="mobile-nav-label">Home</span>
      </a>
      <a href="#" className="mobile-nav-item">
        <span className="mobile-nav-icon">📂</span>
        <span className="mobile-nav-label">Categories</span>
      </a>
      <a href="#" className="mobile-nav-item">
        <span className="mobile-nav-icon">🔍</span>
        <span className="mobile-nav-label">Search</span>
      </a>
      <a href="#" className="mobile-nav-item">
        <span className="mobile-nav-icon">🛒</span>
        <span className="mobile-nav-label">Cart</span>
      </a>
      <a href="#" className="mobile-nav-item">
        <span className="mobile-nav-icon">👤</span>
        <span className="mobile-nav-label">Account</span>
      </a>
    </nav>
  )
}

/* ===== Hero (simplified: 2 products) ===== */
function Hero({ onProductClick }) {
  const featured = [PRODUCTS[2], PRODUCTS[1]]
  const ref = useScrollReveal()

  return (
    <section className="hero" ref={ref}>
      <div className="hero-glow" />
      <div className="hero-layout reveal-target">
        <div className="hero-content">
          <span className="hero-badge">🔥 New: Spring Collection 2026 just dropped</span>
          <h1>Discover <span className="gradient-text">Amazing Products</span> from Trusted Sellers</h1>
          <p>Explore thousands of curated products from verified sellers worldwide. Quality guaranteed, fast shipping, and secure checkout.</p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg">Explore Products</button>
            <button className="btn btn-ghost btn-lg">Become a Seller</button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><div className="hero-stat-value">50K+</div><div className="hero-stat-label">Products</div></div>
            <div className="hero-stat-divider" />
            <div className="hero-stat"><div className="hero-stat-value">2.4K</div><div className="hero-stat-label">Vendors</div></div>
            <div className="hero-stat-divider" />
            <div className="hero-stat"><div className="hero-stat-value">180K</div><div className="hero-stat-label">Customers</div></div>
            <div className="hero-stat-divider" />
            <div className="hero-stat"><div className="hero-stat-value">4.8★</div><div className="hero-stat-label">Avg Rating</div></div>
          </div>
        </div>
        <div className="hero-showcase hero-showcase-2">
          {featured.map((p, i) => (
            <div key={p.id} className={`hero-showcase-item float-${i}`} onClick={() => onProductClick(p)}>
              <img src={p.image} alt={p.title} loading={i === 0 ? 'eager' : 'lazy'} />
              <div className="hero-showcase-overlay" />
              <div className="hero-showcase-label">
                <span className="hero-showcase-name">{p.title.split('—')[0].trim()}</span>
                <span className="hero-showcase-price">${p.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ===== Categories ===== */
function Categories({ activeCategory, onSelect }) {
  const ref = useScrollReveal()
  return (
    <section className="categories reveal-section" ref={ref}>
      <div className="section-header">
        <h2 className="section-title"><span className="section-title-icon">📂</span> Shop by Category</h2>
      </div>
      <div className="categories-grid">
        {CATEGORIES.map(cat => (
          <div key={cat.name} className={`category-card${activeCategory === cat.name ? ' active' : ''}`}
            onClick={() => onSelect(activeCategory === cat.name ? null : cat.name)}
            style={{ '--cat-color': cat.color, '--cat-bg': cat.bg }}>
            <img src={cat.image} alt="" className="category-bg-image" loading="lazy" />
            <div className="category-overlay" />
            <div className="category-content">
              <span className="category-icon">{cat.icon}</span>
              <span className="category-name">{cat.name}</span>
              <span className="category-count">{cat.count.toLocaleString()} items</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ===== Deal of the Day (sticky banner inside product section) ===== */
function DealBanner({ onProductClick, onAddToCart }) {
  const deal = PRODUCTS[0]
  const vendor = VENDORS.find(v => v.id === deal.vendorId)
  const [time, setTime] = useState({ hours: 7, minutes: 42, seconds: 18 })

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { hours, minutes, seconds } = prev
        seconds--
        if (seconds < 0) { seconds = 59; minutes-- }
        if (minutes < 0) { minutes = 59; hours-- }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59 }
        return { hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const pad = n => String(n).padStart(2, '0')

  return (
    <div className="deal-banner" onClick={() => onProductClick(deal)}>
      <div className="deal-banner-image">
        <img src={deal.image} alt={deal.title} />
      </div>
      <div className="deal-banner-info">
        <div className="deal-banner-header">
          <span className="deal-flash-badge-sm">⚡ Deal of the Day</span>
          <div className="deal-timer-inline">
            <span className="timer-inline-block">{pad(time.hours)}</span>:
            <span className="timer-inline-block">{pad(time.minutes)}</span>:
            <span className="timer-inline-block timer-inline-sec">{pad(time.seconds)}</span>
          </div>
        </div>
        <div className="deal-banner-title">{deal.title}</div>
        <div className="deal-banner-meta">
          <div className="product-rating">
            <Stars rating={deal.rating} />
            <span className="rating-value">{deal.rating}</span>
            <span className="review-count">({deal.reviews.toLocaleString()})</span>
          </div>
          <div className="product-vendor">
            <img className="vendor-avatar" src={vendor.avatar} alt={vendor.name} />
            <span className="vendor-name">{vendor.name}</span>
            {vendor.verified && <span className="verified-badge">✓</span>}
          </div>
        </div>
        <div className="deal-banner-bottom">
          <div className="product-price">
            <span className="current-price">${deal.price}</span>
            {deal.originalPrice && <span className="original-price">${deal.originalPrice}</span>}
            {deal.originalPrice && <span className="deal-save">Save ${deal.originalPrice - deal.price}</span>}
          </div>
          <div className="deal-urgency-inline">
            <div className="deal-progress-sm"><div className="deal-progress-bar" style={{ width: '73%' }} /></div>
            <span className="deal-claimed">🔥 73% claimed</span>
          </div>
        </div>
        <button className="btn btn-primary deal-banner-cta" onClick={e => { e.stopPropagation(); onAddToCart() }}>Add to Cart</button>
      </div>
    </div>
  )
}

/* ===== Product Card ===== */
function ProductCard({ product, vendor, onWishlist, wishlisted, onClick, onQuickAdd }) {
  return (
    <div className="product-card" onClick={onClick}>
      <div className="product-image">
        <img src={product.image} alt={product.title} loading="lazy" />
        {product.badge && <span className={`product-badge badge-${product.badge}`}>{product.badge === 'hot' && '🔥 '}{product.badge}</span>}
        <button className={`wishlist-btn${wishlisted ? ' active' : ''}`} onClick={e => { e.stopPropagation(); onWishlist(product.id) }} aria-label="Add to wishlist">{wishlisted ? '❤️' : '♡'}</button>
        <button className="quick-add-btn" onClick={e => { e.stopPropagation(); onQuickAdd(product) }}>+ Quick Add</button>
      </div>
      <div className="product-info">
        <div className="product-vendor">
          <img className="vendor-avatar" src={vendor.avatar} alt={vendor.name} />
          <span className="vendor-name">{vendor.name}</span>
          {vendor.verified && <span className="verified-badge">✓</span>}
        </div>
        <div className="product-title">{product.title}</div>
        <div className="product-rating">
          <Stars rating={product.rating} />
          <span className="rating-value">{product.rating}</span>
          <span className="review-count">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="product-price-row">
          <span className="current-price">${product.price}</span>
          {product.originalPrice ? (
            <>
              <span className="original-price">${product.originalPrice}</span>
              <span className="discount-pct">-{Math.round((1 - product.price / product.originalPrice) * 100)}%</span>
            </>
          ) : (
            <span className="price-spacer" />
          )}
        </div>
      </div>
    </div>
  )
}

/* ===== Featured Product Card ===== */
function FeaturedProductCard({ product, vendor, onWishlist, wishlisted, onClick, onAddToCart }) {
  return (
    <div className="featured-product-card" onClick={onClick}>
      <div className="featured-product-image">
        <img src={product.image} alt={product.title} />
        <span className="featured-badge">⭐ Top Seller</span>
        <button className={`wishlist-btn${wishlisted ? ' active' : ''}`} onClick={e => { e.stopPropagation(); onWishlist(product.id) }} aria-label="Add to wishlist" style={{ opacity: 1, transform: 'scale(1)' }}>{wishlisted ? '❤️' : '♡'}</button>
      </div>
      <div className="featured-product-info">
        <div className="product-vendor">
          <img className="vendor-avatar" src={vendor.avatar} alt={vendor.name} />
          <span className="vendor-name">{vendor.name}</span>
          {vendor.verified && <span className="verified-badge">✓</span>}
        </div>
        <div className="featured-product-title">{product.title}</div>
        <div className="product-rating">
          <Stars rating={product.rating} />
          <span className="rating-value">{product.rating}</span>
          <span className="review-count">({product.reviews.toLocaleString()} reviews)</span>
        </div>
        <p className="featured-product-desc">{product.desc}</p>
        <div className="featured-product-bottom">
          <div className="product-price">
            <span className="current-price">${product.price}</span>
            {product.originalPrice && (
              <><span className="original-price">${product.originalPrice}</span><span className="discount-pct">-{Math.round((1 - product.price / product.originalPrice) * 100)}%</span></>
            )}
          </div>
          <button className="btn btn-primary" onClick={e => { e.stopPropagation(); onAddToCart() }}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

/* ===== Modal ===== */
function ProductModal({ product, vendor, onClose, onAddToCart }) {
  if (!product) return null
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handler)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handler) }
  }, [onClose])
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-body">
          <div className="modal-image"><img src={product.image} alt={product.title} /></div>
          <div className="modal-details">
            <div className="product-vendor">
              <img className="vendor-avatar" src={vendor.avatar} alt={vendor.name} />
              <span className="vendor-name">{vendor.name}</span>
              {vendor.verified && <span className="verified-badge">✓</span>}
            </div>
            <div className="product-title">{product.title}</div>
            <div className="product-rating">
              <Stars rating={product.rating} /><span className="rating-value">{product.rating}</span><span className="review-count">({product.reviews.toLocaleString()} reviews)</span>
            </div>
            <div className="product-price">
              <span className="current-price">${product.price}</span>
              {product.originalPrice && (<><span className="original-price">${product.originalPrice}</span><span className="discount-pct">-{Math.round((1 - product.price / product.originalPrice) * 100)}%</span></>)}
            </div>
            <p className="modal-description">{product.desc}</p>
            <div className="modal-features">
              <div className="modal-feature"><span className="modal-feature-icon">✓</span> Free shipping over $50</div>
              <div className="modal-feature"><span className="modal-feature-icon">✓</span> 30-day return guarantee</div>
              <div className="modal-feature"><span className="modal-feature-icon">✓</span> Secure checkout with SSL</div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-primary" onClick={() => onAddToCart(product)}>Add to Cart</button>
              <button className="btn btn-ghost">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ===== Vendors (with rank) ===== */
function VendorCards() {
  const ref = useScrollReveal()
  const ranks = ['🥇', '🥈', '🥉']
  return (
    <section className="section reveal-section" ref={ref}>
      <div className="section-header">
        <div><h2 className="section-title"><span className="section-title-icon">🏪</span> Top Vendors</h2><p className="section-subtitle">Trusted sellers with verified track records</p></div>
        <a href="#" className="view-all">View all →</a>
      </div>
      <div className="vendors-grid">
        {VENDORS.slice(0, 3).map((vendor, i) => (
          <div key={vendor.id} className={`vendor-card${i === 0 ? ' vendor-card-top' : ''}`}>
            <span className="vendor-rank">{ranks[i]}</span>
            <img className="vendor-card-avatar" src={vendor.avatar} alt={vendor.name} />
            <div className="vendor-card-info">
              <div className="vendor-card-name">{vendor.name}{vendor.verified && <span className="verified-badge">✓</span>}</div>
              <div className="vendor-card-desc">{vendor.desc}</div>
              <div className="vendor-card-stats">
                <span className="vendor-stat"><strong>{vendor.products}</strong> products</span>
                <span className="vendor-stat"><strong>{vendor.rating}</strong> ★</span>
                <span className="vendor-stat"><strong>{vendor.sales}</strong> sales</span>
              </div>
              <div className="vendor-trust"><span className="vendor-trust-label">Trust score</span><div className="vendor-rating-bar"><div className="vendor-rating-fill" style={{ width: `${(vendor.rating / 5) * 100}%` }} /></div></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ===== Reviews (with verified badge + count) ===== */
function ReviewCards() {
  const ref = useScrollReveal()
  return (
    <section className="section reveal-section" ref={ref}>
      <div className="section-header">
        <div>
          <h2 className="section-title"><span className="section-title-icon">💬</span> Recent Reviews</h2>
          <p className="section-subtitle">From 12,400+ verified reviews</p>
        </div>
        <a href="#" className="view-all">View all →</a>
      </div>
      <div className="reviews-grid">
        {REVIEWS.slice(0, 3).map(review => {
          const product = PRODUCTS.find(p => p.id === review.productId)
          return (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <img className="review-avatar" src={review.avatar} alt={review.author} />
                <div className="review-author">
                  <div className="review-name">
                    {review.author}
                    {review.verified && <span className="verified-purchase">✓ Verified</span>}
                  </div>
                  <div className="review-date">{review.date}</div>
                </div>
              </div>
              <div className="review-stars"><Stars rating={review.rating} size={14} /></div>
              <p className="review-text">{review.text}</p>
              {product && (
                <div className="review-product">
                  <img className="review-product-img" src={product.image} alt={product.title} />
                  <span className="review-product-name">{product.title}</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ===== Trending ===== */
function Recommended({ products, onProductClick }) {
  const ref = useScrollReveal()
  return (
    <section className="section reveal-section" ref={ref}>
      <div className="section-header">
        <div><h2 className="section-title"><span className="section-title-icon">🔥</span> Trending This Week</h2><p className="section-subtitle">What shoppers are loving right now</p></div>
        <a href="#" className="view-all">See more →</a>
      </div>
      <div className="recommended-grid">
        {products.map(p => {
          const v = VENDORS.find(vv => vv.id === p.vendorId)
          return (
            <div key={p.id} className="recommended-item" onClick={() => onProductClick(p)}>
              <img src={p.image} alt={p.title} loading="lazy" />
              <div className="recommended-info">
                <div className="recommended-vendor">{v?.name}</div>
                <div className="recommended-title">{p.title}</div>
                <div className="recommended-price">${p.price}</div>
                <div className="recommended-rating">★ {p.rating} ({p.reviews.toLocaleString()})</div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ===== Buyer CTA (replaced seller CTA) ===== */
function BuyerCTA() {
  const ref = useScrollReveal()
  return (
    <div className="promo-banner reveal-section" ref={ref}>
      <div className="promo-content">
        <h2>Get 15% Off Your First Order</h2>
        <p>Sign up for NightMarket and enjoy exclusive deals, early access to sales, and free shipping on your first purchase.</p>
      </div>
      <div className="promo-actions"><button className="btn btn-primary btn-lg">Sign Up Free →</button></div>
    </div>
  )
}

function TrustBar() {
  return (
    <div className="trust-bar">
      {[
        { icon: '🔒', title: 'Secure Payments', desc: 'SSL encrypted checkout' },
        { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $50' },
        { icon: '↩️', title: 'Easy Returns', desc: '30-day money-back' },
        { icon: '💬', title: '24/7 Support', desc: 'Live chat & email' },
      ].map(t => (
        <div key={t.title} className="trust-item">
          <div className="trust-icon">{t.icon}</div>
          <div className="trust-text"><div className="trust-title">{t.title}</div><div className="trust-desc">{t.desc}</div></div>
        </div>
      ))}
    </div>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo"><div className="logo-icon">🛍</div>NightMarket</div>
            <p>The modern multi-vendor marketplace where quality meets discovery.</p>
            <div className="payment-icons">
              <span className="payment-icon payment-visa"><span className="pay-logo">VISA</span></span>
              <span className="payment-icon payment-mc"><span className="pay-logo">MC</span></span>
              <span className="payment-icon payment-amex"><span className="pay-logo">AMEX</span></span>
              <span className="payment-icon payment-paypal"><span className="pay-logo">PP</span></span>
              <span className="payment-icon payment-apple"><span className="pay-logo"> Pay</span></span>
            </div>
          </div>
          {[
            { title: 'Marketplace', links: ['All Categories', 'New Arrivals', 'Best Sellers', 'Deals & Offers', 'Gift Cards'] },
            { title: 'For Sellers', links: ['Start Selling', 'Seller Dashboard', 'Pricing Plans', 'Seller Guidelines'] },
            { title: 'Support', links: ['Help Center', 'Contact Us', 'Shipping Info', 'Privacy Policy', 'Terms'] },
          ].map(col => (
            <div key={col.title}>
              <div className="footer-title">{col.title}</div>
              <ul className="footer-links">{col.links.map(l => <li key={l}><a href="#">{l}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2026 NightMarket. All rights reserved.</span>
          <div className="footer-socials">
            {['𝕏', 'in', 'IG', 'YT'].map(s => <span key={s} className="social-icon">{s}</span>)}
          </div>
        </div>
      </div>
    </footer>
  )
}

function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  if (!visible) return null
  return <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">↑</button>
}

/* ===== App ===== */
function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(null)
  const [wishlist, setWishlist] = useState(new Set())
  const [cartCount, setCartCount] = useState(3)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [sortBy, setSortBy] = useState('featured')
  const [priceFilter, setPriceFilter] = useState('all')
  const [ratingFilter, setRatingFilter] = useState(0)
  const [cartBounce, setCartBounce] = useState(false)
  const [theme, setTheme] = useState(() => localStorage.getItem('nightmarket-theme') || 'light')
  const productsRef = useScrollReveal()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('nightmarket-theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    document.documentElement.classList.add('theme-transition')
    setTheme(t => t === 'dark' ? 'light' : 'dark')
    setTimeout(() => document.documentElement.classList.remove('theme-transition'), 400)
  }, [])

  const toggleWishlist = (id) => {
    setWishlist(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next })
  }

  const openProduct = (product) => setSelectedProduct(product)

  const triggerCartBounce = useCallback(() => {
    setCartCount(c => c + 1)
    setCartBounce(true)
    setTimeout(() => setCartBounce(false), 500)
  }, [])

  const addToCart = () => { triggerCartBounce(); setSelectedProduct(null) }

  const DEAL_PRODUCT_ID = 1
  let filtered = PRODUCTS.filter(p => {
    if (p.id === DEAL_PRODUCT_ID) return false
    const matchesSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !activeCategory || p.category === activeCategory
    const matchesPrice = priceFilter === 'all' ? true : priceFilter === 'under50' ? p.price < 50 : priceFilter === 'under100' ? p.price < 100 : priceFilter === 'under200' ? p.price < 200 : p.price >= 200
    const matchesRating = ratingFilter === 0 || p.rating >= ratingFilter
    return matchesSearch && matchesCategory && matchesPrice && matchesRating
  })

  if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price)
  else if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price)
  else if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating)
  else if (sortBy === 'reviews') filtered.sort((a, b) => b.reviews - a.reviews)

  const getVendor = (vendorId) => VENDORS.find(v => v.id === vendorId)
  const recommended = [...PRODUCTS].filter(p => ![1, 3, 7].includes(p.id)).sort((a, b) => b.reviews - a.reviews).slice(0, 6)

  return (
    <>
      <div className="bg-blobs" />
      <div className="noise-overlay" />
      <Header cartCount={cartCount} searchQuery={searchQuery} onSearch={setSearchQuery} cartBounce={cartBounce} theme={theme} onToggleTheme={toggleTheme} />
      <Hero onProductClick={openProduct} />
      <Categories activeCategory={activeCategory} onSelect={setActiveCategory} />

      <div className="content-card">
      <section className="section reveal-section" ref={productsRef}>
        <div className="section-header">
          <div>
            <h2 className="section-title"><span className="section-title-icon">🛒</span> {activeCategory || 'All Products'}</h2>
            <p className="section-subtitle">{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>
          </div>
          <a href="#" className="view-all">View all →</a>
        </div>
        <div className="sticky-filters">
          <div className="sticky-filters-context">
            <span className="sticky-filters-title">{activeCategory || 'All Products'}</span>
            <span className="sticky-filters-count">{filtered.length} items</span>
          </div>
          <div className="filters-bar">
            <div className="filter-group">
              <span className="filter-group-label">Category</span>
              <button className={`filter-chip${!activeCategory ? ' active' : ''}`} onClick={() => setActiveCategory(null)}>All</button>
              {CATEGORIES.slice(0, 4).map(c => (
                <button key={c.name} className={`filter-chip${activeCategory === c.name ? ' active' : ''}`} onClick={() => setActiveCategory(activeCategory === c.name ? null : c.name)}>{c.icon} {c.name}</button>
              ))}
            </div>
            <span className="filters-separator" />
            <div className="filter-group">
              <span className="filter-group-label">Price</span>
              {['all', 'under50', 'under100', 'under200', '200plus'].map(f => (
                <button key={f} className={`filter-chip${priceFilter === f ? ' active' : ''}`} onClick={() => setPriceFilter(f)}>
                  {f === 'all' ? 'All' : f === 'under50' ? '<$50' : f === 'under100' ? '<$100' : f === 'under200' ? '<$200' : '$200+'}
                </button>
              ))}
            </div>
            <span className="filters-separator" />
            <div className="filter-group">
              <span className="filter-group-label">Rating</span>
              {[4, 4.5, 4.8].map(r => (
                <button key={r} className={`filter-chip rating-chip${ratingFilter === r ? ' active' : ''}`} onClick={() => setRatingFilter(ratingFilter === r ? 0 : r)}>★ {r}+</button>
              ))}
            </div>
            <div className="sort-wrapper">
              <span className="filter-group-label">Sort by</span>
              <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
                <option value="rating">Top Rated</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="products-grid">
          <DealBanner onProductClick={openProduct} onAddToCart={triggerCartBounce} />
          {filtered.map((product, i) => (
            i === 0 ? (
              <FeaturedProductCard key={product.id} product={product} vendor={getVendor(product.vendorId)} wishlisted={wishlist.has(product.id)} onWishlist={toggleWishlist} onClick={() => openProduct(product)} onAddToCart={triggerCartBounce} />
            ) : (
              <ProductCard key={product.id} product={product} vendor={getVendor(product.vendorId)} wishlisted={wishlist.has(product.id)} onWishlist={toggleWishlist} onClick={() => openProduct(product)} onQuickAdd={triggerCartBounce} />
            )
          ))}
        </div>
      </section>

      <VendorCards />
      <ReviewCards />
      <Recommended products={recommended} onProductClick={openProduct} />
      <BuyerCTA />
      <TrustBar />
      </div>
      <Footer />
      <BackToTop />
      <MobileBottomNav />

      {selectedProduct && (
        <ProductModal product={selectedProduct} vendor={getVendor(selectedProduct.vendorId)} onClose={() => setSelectedProduct(null)} onAddToCart={addToCart} />
      )}
    </>
  )
}

export default App
