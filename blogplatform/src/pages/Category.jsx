import { useParams, Navigate } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import Newsletter from '../components/Newsletter';
import { categories, getPostsByCategory } from '../data/posts';

export default function Category() {
  const { slug } = useParams();
  const category = categories.find((c) => c.slug === slug);

  if (!category) return <Navigate to="/" replace />;

  const categoryPosts = getPostsByCategory(slug);

  return (
    <>
      <section className="page-header" style={{ '--cat-color': category.color }}>
        <span className="page-header__badge" style={{ background: category.color }}>
          {category.name}
        </span>
        <h1>{category.name}</h1>
        <p>
          {categoryPosts.length} article{categoryPosts.length !== 1 ? 's' : ''} in this category
        </p>
      </section>

      <section className="section">
        {categoryPosts.length > 0 ? (
          <div className="posts-grid">
            {categoryPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No posts in this category yet. Check back soon!</p>
          </div>
        )}
      </section>

      <Newsletter />
    </>
  );
}
