import { authors } from '../data/posts';
import Newsletter from '../components/Newsletter';

export default function About() {
  const team = Object.values(authors);

  return (
    <>
      <section className="page-header">
        <h1>About BlogPlatform</h1>
        <p>We're passionate about sharing knowledge and building community.</p>
      </section>

      <section className="about-content">
        <div className="about-text">
          <h2>Our Mission</h2>
          <p>
            BlogPlatform was created to provide a space for developers, designers,
            and technologists to share their knowledge and experiences. We believe
            that the best way to learn is by teaching, and the best way to grow is
            by sharing.
          </p>
          <p>
            Our articles cover a wide range of topics from frontend development
            and design principles to career growth and productivity. Whether you're
            just starting your journey or you're a seasoned professional, there's
            something here for you.
          </p>

          <h2>What We Cover</h2>
          <ul>
            <li>Modern web development frameworks and tools</li>
            <li>UI/UX design principles and best practices</li>
            <li>Technology trends and industry insights</li>
            <li>Step-by-step tutorials and guides</li>
            <li>Career advice and professional development</li>
            <li>Productivity tips for developers</li>
          </ul>

          <h2>Open Source</h2>
          <p>
            This blog template is open source and built with React, Vite, and
            React Router. Feel free to use it as a starting point for your own
            blog or project.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Meet the Team</h2>
          <p>The people behind the content</p>
        </div>
        <div className="team-grid">
          {team.map((person) => (
            <div key={person.id} className="team-card">
              <img src={person.avatar} alt={person.name} className="team-card__avatar" />
              <h3>{person.name}</h3>
              <p>{person.bio}</p>
              <div className="team-card__social">
                <a href={person.social.twitter} aria-label="Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
                <a href={person.social.github} aria-label="GitHub">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Newsletter />
    </>
  );
}
