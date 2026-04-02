import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react'

const links = {
  Products: ['Headphones', 'Earbuds', 'Speakers', 'Watches', 'Accessories'],
  Company: ['About Us', 'Careers', 'Press', 'Blog', 'Contact'],
  Support: ['Help Center', 'Returns', 'Warranty', 'Shipping', 'FAQ'],
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="footer-logo">Slashdev.</span>
          <p className="footer-tagline">
            Premium audio & tech products<br />for the modern lifestyle.
          </p>
          <div className="footer-socials">
            <a href="#" className="footer-social"><Instagram size={18} /></a>
            <a href="#" className="footer-social"><Twitter size={18} /></a>
            <a href="#" className="footer-social"><Facebook size={18} /></a>
            <a href="#" className="footer-social"><Youtube size={18} /></a>
          </div>
        </div>

        {Object.entries(links).map(([title, items]) => (
          <div key={title} className="footer-col">
            <h4 className="footer-col-title">{title}</h4>
            <ul className="footer-links">
              {items.map(item => (
                <li key={item}><a href="#">{item}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <span>&copy; 2026 Slashdev. All rights reserved.</span>
        <div className="footer-bottom-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  )
}
