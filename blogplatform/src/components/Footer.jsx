import { Link } from 'react-router-dom';
import { categories } from '../data/posts';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link to="/" className="logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
            <span>BlogPlatform</span>
          </Link>
          <p>A modern blog platform built with React. Share your ideas with the world.</p>
        </div>

        <div className="footer-links">
          <h4>Categories</h4>
          <ul>
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link to={`/category/${cat.slug}`}>{cat.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-links">
          <h4>Pages</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/search?q=">All Posts</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Connect</h4>
          <ul>
            <li><a href="#" target="_blank" rel="noopener">Twitter</a></li>
            <li><a href="#" target="_blank" rel="noopener">GitHub</a></li>
            <li><a href="#" target="_blank" rel="noopener">RSS Feed</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 BlogPlatform. All rights reserved.</p>
      </div>
    </footer>
  );
}
