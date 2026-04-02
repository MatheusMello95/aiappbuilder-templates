import { Send } from 'lucide-react'

export default function Newsletter() {
  return (
    <section className="newsletter-section">
      <div className="newsletter-content">
        <h2 className="newsletter-title">Stay in the Loop</h2>
        <p className="newsletter-desc">
          Get notified about new products, exclusive deals, and tech updates.
        </p>
        <div className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email..."
            className="newsletter-input"
          />
          <button className="newsletter-btn">
            <Send size={16} />
            Subscribe
          </button>
        </div>
        <span className="newsletter-note">No spam, unsubscribe anytime.</span>
      </div>
      <div className="newsletter-stats">
        <div className="newsletter-stat">
          <span className="newsletter-stat-value">50k+</span>
          <span className="newsletter-stat-label">Subscribers</span>
        </div>
        <div className="newsletter-stat">
          <span className="newsletter-stat-value">4.9</span>
          <span className="newsletter-stat-label">Rating</span>
        </div>
        <div className="newsletter-stat">
          <span className="newsletter-stat-value">99%</span>
          <span className="newsletter-stat-label">Satisfaction</span>
        </div>
      </div>
    </section>
  )
}
