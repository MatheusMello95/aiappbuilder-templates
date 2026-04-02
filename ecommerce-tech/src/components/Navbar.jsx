import { Search, Sun, Moon, ShoppingBag, Heart, Bell } from 'lucide-react'

export default function Navbar({ dark, onToggleDark }) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-left">
          <div className="logo">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="logo-icon">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="currentColor"/>
              <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke="var(--bg)" strokeWidth="1.5" fill="none"/>
              <circle cx="12" cy="14" r="2" fill="#4CAF50"/>
            </svg>
            <span className="logo-text">Slashdev.</span>
          </div>
        </div>

        <div className="navbar-search">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="Search products..." className="search-input" />
        </div>

        <div className="navbar-right">
          <div className="nav-actions">
            <button className="nav-icon-btn" title="Notifications">
              <Bell size={18} />
            </button>
            <button className="nav-icon-btn" title="Favourites">
              <Heart size={18} />
            </button>
            <button className="nav-icon-btn cart-icon-btn" title="Cart">
              <ShoppingBag size={18} />
              <span className="cart-count">3</span>
            </button>
          </div>

          <div className="nav-divider" />

          <button className="theme-toggle" onClick={onToggleDark} title={dark ? 'Light mode' : 'Dark mode'}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="user-info">
            <span className="user-name">Rymen Alex</span>
            <div className="user-avatar">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
                alt="User"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
