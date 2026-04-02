import { useSearchParams } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import { searchPosts, posts } from '../data/posts';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = query ? searchPosts(query) : posts;

  return (
    <>
      <section className="page-header">
        <h1>{query ? `Search: "${query}"` : 'All Posts'}</h1>
        <p>
          {results.length} result{results.length !== 1 ? 's' : ''} found
        </p>
      </section>

      <section className="section">
        {results.length > 0 ? (
          <div className="posts-grid">
            {results.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <h3>No results found</h3>
            <p>Try searching for something else.</p>
          </div>
        )}
      </section>
    </>
  );
}
