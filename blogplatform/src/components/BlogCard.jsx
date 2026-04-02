import { Link } from 'react-router-dom';
import { getAuthor, categories } from '../data/posts';

export default function BlogCard({ post, featured = false }) {
  const author = getAuthor(post.authorId);
  const category = categories.find((c) => c.slug === post.category);

  return (
    <article className={`blog-card ${featured ? 'blog-card--featured' : ''}`}>
      <Link to={`/post/${post.slug}`} className="blog-card__image">
        <img src={post.coverImage} alt={post.title} loading="lazy" />
      </Link>

      <div className="blog-card__content">
        <div className="blog-card__meta">
          {category && (
            <Link
              to={`/category/${category.slug}`}
              className="blog-card__category"
              style={{ '--cat-color': category.color }}
            >
              {category.name}
            </Link>
          )}
          <span className="blog-card__date">
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>

        <Link to={`/post/${post.slug}`}>
          <h3 className="blog-card__title">{post.title}</h3>
        </Link>

        <p className="blog-card__excerpt">{post.excerpt}</p>

        <div className="blog-card__footer">
          <div className="blog-card__author">
            <img src={author.avatar} alt={author.name} className="avatar" />
            <span>{author.name}</span>
          </div>
          <span className="blog-card__read-time">{post.readTime} min read</span>
        </div>
      </div>
    </article>
  );
}
