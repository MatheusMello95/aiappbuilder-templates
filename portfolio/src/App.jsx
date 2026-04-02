import { useState, useEffect, useRef } from 'react'
import './App.css'

const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=90',
  project1: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=85',
  project2: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=85',
  project3: 'https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=800&q=85',
  project4: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&q=85',
  project5: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=800&q=85',
  project6: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&q=85',
  interior1: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85',
  interior2: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85',
  interior3: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=85',
  team1: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=85',
  team2: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=85',
  team3: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=85',
  about: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=85',
  vision: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1200&q=85',
  detail1: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=85',
  detail2: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=85',
  explore: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1200&q=85',
}

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

function RevealSection({ children, className = '', tag = 'section', delay = 0 }) {
  const ref = useReveal()
  const Tag = tag
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      if (menuOpen) setMenuOpen(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [menuOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner">
        <div className="header__left">
          <span className="header__tagline">Design Studio</span>
          <span className="header__dot">&bull;</span>
          <span className="header__tagline">Architecture</span>
        </div>
        <a href="#" className="header__logo">Architect</a>
        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#team" onClick={() => setMenuOpen(false)}>Team</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <button
          className={`header__burger ${menuOpen ? 'header__burger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg">
        <img src={IMAGES.hero} alt="Modern architecture" />
        <div className="hero__overlay" />
      </div>
      <div className="hero__content">
        <p className="hero__subtitle">Crafting Spaces That Inspire</p>
        <h1 className="hero__title">ARCHITECTURE</h1>
        <p className="hero__desc">Where vision meets structure, and imagination becomes reality</p>
        <a href="#projects" className="hero__cta">
          <span>Discover Our Work</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </a>
      </div>
      <div className="hero__scroll">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}

function ProjectsGrid() {
  const ref1 = useReveal()
  const ref2 = useReveal()
  const ref3 = useReveal()
  const ref4 = useReveal()
  const ref5 = useReveal()
  const ref6 = useReveal()

  const projects = [
    { img: IMAGES.project1, title: 'The Glass Pavilion', cat: 'Commercial', year: '2024', ref: ref1 },
    { img: IMAGES.project2, title: 'Urban Horizon Tower', cat: 'Residential', year: '2024', ref: ref2 },
    { img: IMAGES.project3, title: 'Skyline Bridge Complex', cat: 'Infrastructure', year: '2023', ref: ref3 },
    { img: IMAGES.project4, title: 'Waterfront Residences', cat: 'Residential', year: '2023', ref: ref4 },
    { img: IMAGES.project5, title: 'Cultural Arts Center', cat: 'Cultural', year: '2023', ref: ref5 },
    { img: IMAGES.project6, title: 'Coastal Villa Estate', cat: 'Residential', year: '2022', ref: ref6 },
  ]

  return (
    <section className="projects" id="projects">
      <RevealSection className="projects__header">
        <div className="section-label">Featured Work</div>
        <h2 className="projects__title">Selected Projects</h2>
        <p className="projects__subtitle">
          Each project is a dialogue between space, light, and purpose — meticulously crafted to transcend the ordinary.
        </p>
      </RevealSection>

      <div className="projects__grid">
        {projects.map((p, i) => (
          <div key={i} ref={p.ref} className={`reveal project-card project-card--${i + 1}`}>
            <div className="project-card__img">
              <img src={p.img} alt={p.title} loading="lazy" />
              <div className="project-card__overlay">
                <span className="project-card__view">View Project</span>
              </div>
            </div>
            <div className="project-card__info">
              <span className="project-card__cat">{p.cat} &mdash; {p.year}</span>
              <h3 className="project-card__title">{p.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function DesignsSection() {
  return (
    <section className="designs" id="about">
      <RevealSection className="designs__left">
        <div className="designs__badge">
          <svg viewBox="0 0 100 100" width="80" height="80">
            <circle cx="50" cy="50" r="48" fill="none" stroke="var(--gold)" strokeWidth="0.5" />
            <text x="50" y="42" textAnchor="middle" fill="var(--gold)" fontSize="10" fontFamily="var(--font-serif)" letterSpacing="2">ARCH</text>
            <text x="50" y="58" textAnchor="middle" fill="var(--gold)" fontSize="7" fontFamily="var(--font-sans)" letterSpacing="3">STUDIO</text>
          </svg>
        </div>
        <h2 className="designs__title">Designs for<br />Your Space</h2>
        <p className="designs__text">
          We believe architecture is more than shelter — it&apos;s an art form that shapes how people live,
          work, and connect. Our approach merges innovative design with sustainable practices to create
          spaces that endure.
        </p>
        <div className="designs__stats">
          <div className="stat">
            <span className="stat__number">150+</span>
            <span className="stat__label">Projects Completed</span>
          </div>
          <div className="stat">
            <span className="stat__number">24</span>
            <span className="stat__label">Design Awards</span>
          </div>
          <div className="stat">
            <span className="stat__number">18</span>
            <span className="stat__label">Years Experience</span>
          </div>
        </div>
      </RevealSection>
      <RevealSection className="designs__right">
        <div className="designs__images">
          <div className="designs__img designs__img--main">
            <img src={IMAGES.about} alt="Architecture interior" loading="lazy" />
          </div>
          <div className="designs__img designs__img--accent">
            <img src={IMAGES.interior1} alt="Modern interior" loading="lazy" />
          </div>
        </div>
      </RevealSection>
    </section>
  )
}

function ServicesSection() {
  const services = [
    {
      num: '01',
      title: 'Building Security',
      desc: 'Comprehensive structural analysis and safety protocols integrated into every phase of design.',
      img: IMAGES.interior2,
    },
    {
      num: '02',
      title: 'Interior Design',
      desc: 'Bespoke interior environments that harmonize aesthetics with functionality and comfort.',
      img: IMAGES.interior3,
    },
    {
      num: '03',
      title: 'Urban Planning',
      desc: 'Thoughtful master planning that creates cohesive, vibrant communities and public spaces.',
      img: IMAGES.detail1,
    },
    {
      num: '04',
      title: 'Sustainable Design',
      desc: 'Eco-conscious solutions that reduce environmental impact without compromising beauty.',
      img: IMAGES.detail2,
    },
  ]

  return (
    <section className="services" id="services">
      <RevealSection className="services__header">
        <div className="section-label section-label--light">What We Do</div>
        <h2 className="services__title">Our Services</h2>
      </RevealSection>
      <div className="services__list">
        {services.map((s, i) => (
          <RevealSection key={i} className="service-item" tag="div" delay={i * 100}>
            <div className="service-item__content">
              <span className="service-item__num">{s.num}</span>
              <h3 className="service-item__title">{s.title}</h3>
              <p className="service-item__desc">{s.desc}</p>
            </div>
            <div className="service-item__img">
              <img src={s.img} alt={s.title} loading="lazy" />
            </div>
          </RevealSection>
        ))}
      </div>
    </section>
  )
}

function VisionSection() {
  return (
    <section className="vision">
      <div className="vision__bg">
        <img src={IMAGES.vision} alt="Architectural vision" loading="lazy" />
        <div className="vision__overlay" />
      </div>
      <RevealSection className="vision__content">
        <div className="section-label section-label--light">Our Philosophy</div>
        <h2 className="vision__title">
          We Create Structures<br />For Your Vision
        </h2>
        <p className="vision__text">
          Every line we draw, every material we choose, every space we shape is guided by a single
          principle: architecture should elevate the human experience. We don&apos;t just build — we
          craft narratives in concrete, glass, and light.
        </p>
        <div className="vision__cta">
          <a href="#contact" className="btn btn--outline">Start a Conversation</a>
        </div>
      </RevealSection>
    </section>
  )
}

function TeamSection() {
  const team = [
    { img: IMAGES.team1, name: 'James Mitchell', role: 'Principal Architect' },
    { img: IMAGES.team2, name: 'Sarah Chen', role: 'Design Director' },
    { img: IMAGES.team3, name: 'Marcus Rivera', role: 'Project Lead' },
  ]

  return (
    <section className="team" id="team">
      <RevealSection className="team__header">
        <div className="section-label">Our People</div>
        <h2 className="team__title">The Team</h2>
        <p className="team__subtitle">
          Visionaries who transform bold ideas into extraordinary spaces.
        </p>
      </RevealSection>
      <div className="team__grid">
        {team.map((t, i) => (
          <RevealSection key={i} className="team-card" tag="div" delay={i * 150}>
            <div className="team-card__img">
              <img src={t.img} alt={t.name} loading="lazy" />
            </div>
            <h3 className="team-card__name">{t.name}</h3>
            <p className="team-card__role">{t.role}</p>
          </RevealSection>
        ))}
      </div>
    </section>
  )
}

function ExploreSection() {
  return (
    <section className="explore">
      <div className="explore__inner">
        <RevealSection className="explore__text">
          <div className="section-label">Discover More</div>
          <h2 className="explore__title">
            Explore Creativity<br />In Our Architecture
          </h2>
          <p className="explore__desc">
            From concept sketches to completed masterpieces, our portfolio represents decades of
            pushing boundaries and redefining what&apos;s possible in modern architecture.
          </p>
          <a href="#projects" className="btn btn--dark">
            <span>View All Projects</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </RevealSection>
        <RevealSection className="explore__image" tag="div">
          <img src={IMAGES.explore} alt="Architecture exploration" loading="lazy" />
        </RevealSection>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section className="contact" id="contact">
      <RevealSection className="contact__inner">
        <h2 className="contact__title">Let&apos;s Build<br />Something Extraordinary</h2>
        <p className="contact__text">
          Ready to bring your vision to life? We&apos;d love to hear about your next project.
        </p>
        <a href="mailto:studio@architect.com" className="contact__email">studio@architect.com</a>
        <div className="contact__details">
          <div>
            <span className="contact__label">Location</span>
            <span>New York, NY</span>
          </div>
          <div>
            <span className="contact__label">Phone</span>
            <span>+1 (212) 555-0190</span>
          </div>
          <div>
            <span className="contact__label">Follow</span>
            <div className="contact__social">
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
              <a href="#">Behance</a>
            </div>
          </div>
        </div>
      </RevealSection>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span className="footer__logo">Architect</span>
        <span className="footer__copy">&copy; 2026 Architect Studio. All rights reserved.</span>
        <div className="footer__links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProjectsGrid />
        <DesignsSection />
        <ServicesSection />
        <VisionSection />
        <TeamSection />
        <ExploreSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export default App
