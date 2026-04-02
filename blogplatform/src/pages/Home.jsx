import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import Newsletter from '../components/Newsletter';
import { posts, getFeaturedPosts, categories, getAuthor } from '../data/posts';

const POSTS_PER_PAGE = 6;

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const latestPost = posts[0];
  const topReads = posts.slice(1, 4);
  const latestAuthor = getAuthor(latestPost.authorId);
  const latestCategory = categories.find((c) => c.slug === latestPost.category);

  const filteredPosts = useMemo(() => {
    let result = posts;
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  function handleCategoryChange(slug) {
    setActiveCategory(slug);
    setCurrentPage(1);
  }

  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }

  return (
    <>
      {/* ===== Hero: The Latest + Top Reads ===== */}
      <section className="hero-split">
        <div className="hero-split__main">
          <h2 className="hero-split__label">The Latest</h2>
          <Link to={`/post/${latestPost.slug}`} className="latest-card">
            <div className="latest-card__image">
              <img src={latestPost.coverImage} alt={latestPost.title} />
            </div>
            <div className="latest-card__body">
              <h3>{latestPost.title}</h3>
              <div className="latest-card__meta">
                <span>
                  {new Date(latestPost.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className="latest-card__dot">&middot;</span>
                <span>{latestAuthor.name}</span>
              </div>
              <p>{latestPost.excerpt}</p>
              <span className="latest-card__link">Read more &rarr;</span>
            </div>
          </Link>
        </div>

        <div className="hero-split__sidebar">
          <h2 className="hero-split__label">Top Reads</h2>
          <div className="top-reads">
            {topReads.map((post) => {
              const author = getAuthor(post.authorId);
              return (
                <Link
                  key={post.id}
                  to={`/post/${post.slug}`}
                  className="top-read-item"
                >
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="top-read-item__img"
                  />
                  <div className="top-read-item__body">
                    <h4>{post.title}</h4>
                    <p>
                      {post.excerpt.length > 80
                        ? post.excerpt.slice(0, 80) + '...'
                        : post.excerpt}
                    </p>
                    <span className="top-read-item__meta">
                      {author.name} &middot; {post.readTime} min read
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Browse by Categories ===== */}
      <section className="section browse-section">
        <div className="browse-header">
          <h2>Browse by categories</h2>
          <div className="browse-search">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="search posts..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="category-pills">
          <button
            className={`category-pill ${activeCategory === 'all' ? 'category-pill--active' : ''}`}
            onClick={() => handleCategoryChange('all')}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              className={`category-pill ${activeCategory === cat.slug ? 'category-pill--active' : ''}`}
              onClick={() => handleCategoryChange(cat.slug)}
              style={{ '--pill-color': cat.color }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* ===== Posts Grid ===== */}
        {paginatedPosts.length > 0 ? (
          <div className="posts-grid">
            {paginatedPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No posts found</h3>
            <p>Try a different category or search term.</p>
          </div>
        )}

        {/* ===== Pagination ===== */}
        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`pagination__btn ${page === currentPage ? 'pagination__btn--active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            {currentPage < totalPages && (
              <button
                className="pagination__btn"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                &rsaquo;
              </button>
            )}
          </div>
        )}
      </section>

      {/* ===== Newsletter ===== */}
      <Newsletter />
    </>
  );
}
