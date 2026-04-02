import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const observerRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // Scroll animation observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document
      .querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in')
      .forEach((el) => {
        observerRef.current.observe(el)
      })

    // Navbar scroll effect
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar')
      if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 50)
      }
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      observerRef.current?.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      {/* NAVBAR */}
      <nav className={`navbar${menuOpen ? ' menu-open' : ''}`}>
        <div className="nav-logo">Elevate</div>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#showcase">Why Us</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
          <li><a href="#cta" className="nav-cta">Get Started Free</a></li>
        </ul>
        <button
          className="mobile-menu-btn"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? '\u2715' : '\u2630'}
        </button>
        {menuOpen && (
          <div className="mobile-menu">
            <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#showcase" onClick={() => setMenuOpen(false)}>Why Us</a>
            <a href="#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
            <a href="#cta" className="nav-cta" onClick={() => setMenuOpen(false)}>Get Started Free</a>
          </div>
        )}
      </nav>

      {/* HERO — clean gradient bg, no photo */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Now Available — Version 3.0
            </div>
            <h1>
              Build Something{' '}
              <span className="gradient-text">Extraordinary</span>
            </h1>
            <p>
              The all-in-one platform that empowers teams to design, develop,
              and deploy world-class digital experiences at lightning speed.
            </p>
            <div className="hero-buttons">
              <a href="#cta" className="btn-primary">
                Start Free Trial &#8594;
              </a>
              <a href="#showcase" className="btn-secondary">
                &#9654; Watch Demo
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-card">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                alt="Dashboard analytics"
              />
            </div>
            <div className="hero-floating-card">
              <div className="floating-icon">&#9889;</div>
              <div className="floating-info">
                <strong>Performance Score</strong>
                <span>99/100 — Lightning Fast</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS — own section */}
      <section className="stats-bar">
        <div className="stats-grid">
          <div className="stat-item fade-in fade-in-delay-1">
            <div className="stat-number">10K+</div>
            <div className="stat-label">Active Teams</div>
          </div>
          <div className="stat-item fade-in fade-in-delay-2">
            <div className="stat-number">99.9%</div>
            <div className="stat-label">Uptime SLA</div>
          </div>
          <div className="stat-item fade-in fade-in-delay-3">
            <div className="stat-number">3.2x</div>
            <div className="stat-label">Faster Delivery</div>
          </div>
          <div className="stat-item fade-in fade-in-delay-4">
            <div className="stat-number">150+</div>
            <div className="stat-label">Integrations</div>
          </div>
        </div>
      </section>

      {/* LOGOS BAR */}
      <section className="logos-bar">
        <p>Trusted by forward-thinking companies</p>
        <div className="logos-grid">
          {/* Stripe */}
          <span className="logo-item">
            <svg viewBox="0 0 60 25" height="28">
              <path fill="#635BFF" d="M5 10.2c0-.7.6-1 1.5-1 1.4 0 3.1.4 4.5 1.2V6.3C9.5 5.7 8 5.4 6.5 5.4 2.6 5.4 0 7.4 0 10.5c0 4.8 6.6 4 6.6 6.1 0 .8-.7 1.1-1.7 1.1-1.5 0-3.4-.6-4.9-1.4v4.2c1.7.7 3.3 1 4.9 1 4 0 6.8-2 6.8-5.1C11.7 11.2 5 12.2 5 10.2zm14.3-4.7L16 6.2v13.1h3.3V5.5zm0-5.5l-3.3.7v2.7l3.3-.7V0zm5.5 1.3l-3.2.7v17.3c0 3.2 1.5 4.3 3.8 4.3 1.2 0 2-.2 2-.2v-2.9s-.5.1-1 .1c-.9 0-1.6-.3-1.6-1.8V1.3zm8.8 4.2c-1.5 0-2.5.7-3 1.2l-.2-1h-2.9v18.8l3.2-.7v-4.6c.6.4 1.4 1 2.8 1 2.8 0 5.4-2.3 5.4-7.2-.1-4.6-2.7-7.5-5.3-7.5zm-.9 11.5c-.9 0-1.5-.3-1.9-.8V9.7c.4-.5 1-.9 1.9-.9 1.5 0 2.5 1.7 2.5 3.6 0 2-.9 3.6-2.5 3.6zm13.6-11.5c-3.6 0-5.8 3.1-5.8 7.3 0 4.8 2.6 7.3 6.3 7.3 1.8 0 3.2-.4 4.2-1l-.7-2.6c-.9.4-1.8.6-3.1.6-1.2 0-2.3-.4-2.5-2h6.5c0-.2.1-1 .1-1.4 0-4.2-2-8.2-5-8.2zm-2.5 5.9c0-1.5.9-2.1 1.7-2.1.8 0 1.7.6 1.7 2.1h-3.4z" />
            </svg>
          </span>
          {/* Notion */}
          <span className="logo-item">
            <svg viewBox="0 0 100 28" height="24">
              <path fill="#000" d="M2.8 3.4C4 4.4 4.4 4.3 6.7 4.2L30.2 2.8c.5 0 .1-.5-.1-.5l-3.9-.8C25 1.1 23.6.5 19.9.8L-2.6 2.6c-.8.1-1 .4-.6.7l6 .1zM4.1 8.5V27.1c0 1 .5 1.4 1.6 1.3l25.8-1.5c1.1-.1 1.2-.7 1.2-1.5V7.9c0-.8-.3-1.2-1-.1L5 8.3c-.7.1-.9.4-.9 1.2v-.9zm25.4 1.1c.1.6 0 1.1-.6 1.2l-1.2.2V24c-1.1.6-2 .9-2.8.9-1.3 0-1.6-.4-2.6-1.6L14.4 10.9v12l2.5.6s0 1.1-1.6 1.1l-4.3.2c-.1-.3 0-.9.5-1l1.3-.4V11.2l-1.8-.1c-.1-.6.2-1.4 1.1-1.5l4.7-.3 8.2 12.6V10.8l-2.1-.2c-.1-.7.4-1.2 1-1.3l4.4-.3z" transform="translate(3,0)" />
              <text x="38" y="21" fontFamily="Inter,system-ui,sans-serif" fontSize="16" fontWeight="600" fill="#000" letterSpacing="-0.5">Notion</text>
            </svg>
          </span>
          {/* Vercel */}
          <span className="logo-item">
            <svg viewBox="0 0 76 20" height="20">
              <path fill="#000" d="M13 1l13 22H0L13 1z" transform="scale(0.55) translate(0,2)" />
              <text x="18" y="16" fontFamily="Inter,system-ui,sans-serif" fontSize="16" fontWeight="600" fill="#000" letterSpacing="-0.5">Vercel</text>
            </svg>
          </span>
          {/* Linear */}
          <span className="logo-item">
            <svg viewBox="0 0 76 20" height="20">
              <path fill="#5E6AD2" d="M1.2 13.8a10 10 0 005 5l8.2-8.2c.3-.3.3-.8 0-1.1l-5-5L1.2 13.8zm3.1-4.3a10 10 0 016.2-6.2l-2.6 2.6c-.3.3-.3.8 0 1.1l2.5 2.5-2 2L6.3 9.5zm7.8-6.8a10 10 0 015 2.8L12 10.6l-2-2 2.1-2.1-2-2 2-1.8zM17.5 7a10 10 0 011.3 5.8L14 8l2-2 1.5 1zm1 7.2a10 10 0 01-8.3 5.6l8.3-8.3v2.7z" transform="translate(-1, 0)" />
              <text x="22" y="16" fontFamily="Inter,system-ui,sans-serif" fontSize="16" fontWeight="600" fill="#5E6AD2" letterSpacing="-0.5">Linear</text>
            </svg>
          </span>
          {/* Figma */}
          <span className="logo-item">
            <svg viewBox="0 0 68 22" height="22">
              <g transform="translate(0, 1)">
                <path d="M5 18c1.7 0 3-1.3 3-3v-3H5a3 3 0 000 6z" fill="#0ACF83" />
                <path d="M2 9a3 3 0 013-3h3v6H5a3 3 0 01-3-3z" fill="#A259FF" />
                <path d="M2 3a3 3 0 013-3h3v6H5a3 3 0 01-3-3z" fill="#F24E1E" />
                <path d="M8 0h3a3 3 0 010 6H8V0z" fill="#FF7262" />
                <path d="M14 9a3 3 0 11-6 0 3 3 0 016 0z" fill="#1ABCFE" />
              </g>
              <text x="19" y="16" fontFamily="Inter,system-ui,sans-serif" fontSize="16" fontWeight="600" fill="#333" letterSpacing="-0.5">Figma</text>
            </svg>
          </span>
          {/* Slack */}
          <span className="logo-item">
            <svg viewBox="0 0 68 22" height="22">
              <g transform="translate(0, 1)">
                <path d="M3.6 11.3a1.8 1.8 0 10-1.8 1.8h1.8v-1.8zm.9 0a1.8 1.8 0 113.6 0v4.5a1.8 1.8 0 11-3.6 0v-4.5z" fill="#2EB67D" />
                <path d="M6.3 3.6a1.8 1.8 0 111.8-1.8v1.8H6.3zm0 .9a1.8 1.8 0 110 3.6H1.8a1.8 1.8 0 110-3.6h4.5z" fill="#36C5F0" />
                <path d="M14 6.3a1.8 1.8 0 101.8 1.8V6.3H14zm-.9 0a1.8 1.8 0 11-3.6 0V1.8a1.8 1.8 0 113.6 0v4.5z" fill="#ECB22E" />
                <path d="M11.3 14a1.8 1.8 0 10-1.8 1.8h1.8V14zm-.9 0a1.8 1.8 0 11-3.6 0v-4.5a1.8 1.8 0 113.6 0V14z" fill="#E01E5A" />
              </g>
              <text x="20" y="16" fontFamily="Inter,system-ui,sans-serif" fontSize="16" fontWeight="600" fill="#333" letterSpacing="-0.5">Slack</text>
            </svg>
          </span>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" id="features">
        <div className="section-header fade-in">
          <span className="section-label">Features</span>
          <h2>One platform, from idea to production</h2>
          <p>
            Design, build, deploy, and iterate — all without switching tools.
            Elevate replaces your entire fragmented stack.
          </p>
        </div>
        <div className="features-grid">
          {[
            {
              icon: '&#9889;',
              color: 'blue',
              title: 'Lightning Performance',
              desc: 'Optimized for speed with edge computing, CDN delivery, and intelligent caching that keeps your app blazing fast.',
            },
            {
              icon: '&#128274;',
              color: 'purple',
              title: 'Enterprise Security',
              desc: 'SOC 2 compliant with end-to-end encryption, SSO, role-based access, and comprehensive audit logging.',
            },
            {
              icon: '&#128640;',
              color: 'green',
              title: 'One-Click Deploy',
              desc: 'Push to production in seconds with automated CI/CD, zero-downtime deploys, and instant rollback capabilities.',
            },
            {
              icon: '&#127912;',
              color: 'orange',
              title: 'Visual Builder',
              desc: 'Drag-and-drop interface builder with real-time preview, responsive design tools, and 200+ pre-built components.',
            },
            {
              icon: '&#128202;',
              color: 'pink',
              title: 'Advanced Analytics',
              desc: 'Real-time dashboards, custom metrics, cohort analysis, and AI-powered insights to drive data-informed decisions.',
            },
            {
              icon: '&#129302;',
              color: 'cyan',
              title: 'AI-Powered',
              desc: 'Built-in AI assistant that generates code, optimizes performance, writes tests, and automates repetitive tasks.',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className={`feature-card fade-in fade-in-delay-${i + 1}`}
            >
              <div className={`feature-icon ${feature.color}`}>
                <span dangerouslySetInnerHTML={{ __html: feature.icon }} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="showcase" id="showcase">
        <div className="showcase-content">
          <div className="showcase-text slide-in-left">
            <span className="section-label">Why Elevate</span>
            <h2>Built for teams who refuse to compromise</h2>
            <p>
              We obsess over the details so you can focus on what matters —
              building products your users love.
            </p>
            <ul className="showcase-features">
              <li>
                <span className="check-icon">&#10003;</span>
                Collaborative real-time editing with multiplayer cursors
              </li>
              <li>
                <span className="check-icon">&#10003;</span>
                Version control with visual diff and one-click restore
              </li>
              <li>
                <span className="check-icon">&#10003;</span>
                Custom workflows with webhooks and API automation
              </li>
              <li>
                <span className="check-icon">&#10003;</span>
                24/7 priority support with {"<"}15 min response time
              </li>
            </ul>
            <a href="#cta" className="btn-primary">
              Start Building Today &#8594;
            </a>
          </div>
          <div className="showcase-image slide-in-right">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
              alt="Team collaboration"
            />
            <div className="showcase-image-badge">
              <strong>4.9/5</strong>
              <span>2,400+ reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials" id="testimonials">
        <div className="section-header fade-in">
          <span className="section-label">Testimonials</span>
          <h2>Loved by thousands of teams</h2>
          <p>
            See why the world&apos;s best teams choose Elevate to power their
            digital products.
          </p>
        </div>
        <div className="testimonials-grid">
          {[
            {
              quote:
                'Elevate completely transformed our development workflow. We shipped our new product 3x faster than expected. The AI features are genuinely game-changing.',
              name: 'Sarah Chen',
              role: 'CTO, TechVault',
              avatar:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
            },
            {
              quote:
                "The best developer experience I've ever had. The visual builder saved us months of work, and the deploy pipeline is flawless. We haven't looked back.",
              name: 'Marcus Rodriguez',
              role: 'Lead Engineer, ScaleUp',
              avatar:
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
            },
            {
              quote:
                'We evaluated 12 platforms before choosing Elevate. The combination of performance, security, and developer tools is unmatched. It just works.',
              name: 'Emily Watson',
              role: 'VP of Product, CloudNine',
              avatar:
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
            },
          ].map((testimonial, i) => (
            <div
              key={i}
              className={`testimonial-card scale-in fade-in-delay-${i + 1}`}
            >
              <div className="testimonial-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <blockquote>&ldquo;{testimonial.quote}&rdquo;</blockquote>
              <div className="testimonial-author">
                <img
                  className="testimonial-avatar"
                  src={testimonial.avatar}
                  alt={testimonial.name}
                />
                <div>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta" id="cta">
        <div className="cta-container scale-in">
          <h2>Ready to build something amazing?</h2>
          <p>
            Join 10,000+ teams already using Elevate. Start your free trial
            today — no credit card required.
          </p>
          <div className="cta-buttons">
            <a href="#" className="btn-white">
              Get Started Free &#8594;
            </a>
            <a href="#" className="btn-ghost">
              Talk to Sales
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="nav-logo">Elevate</div>
            <p>
              The all-in-one platform for modern teams to build, deploy, and
              scale digital experiences.
            </p>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <ul>
              <li><a href="#">Features</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Integrations</a></li>
              <li><a href="#">Changelog</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">API Reference</a></li>
              <li><a href="#">Status</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 Elevate. All rights reserved.</span>
          <div className="footer-social">
            <a href="#" aria-label="Twitter">&#120143;</a>
            <a href="#" aria-label="GitHub">&#128187;</a>
            <a href="#" aria-label="LinkedIn">&#128101;</a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
