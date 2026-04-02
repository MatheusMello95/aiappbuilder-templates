import { useParams, Link, Navigate } from 'react-router-dom';
import { getPost, getAuthor, categories, posts } from '../data/posts';
import Comments from '../components/Comments';
import BlogCard from '../components/BlogCard';
import Newsletter from '../components/Newsletter';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);

  if (!post) return <Navigate to="/" replace />;

  const author = getAuthor(post.authorId);
  const category = categories.find((c) => c.slug === post.category);
  const related = posts
    .filter((p) => p.id !== post.id && (p.category === post.category || p.tags.some((t) => post.tags.includes(t))))
    .slice(0, 3);

  function renderContent(content) {
    const lines = content.split('\n');
    const elements = [];
    let inCodeBlock = false;
    let codeLines = [];
    let codeKey = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={`code-${codeKey++}`} className="code-block">
              <code>{codeLines.join('\n')}</code>
            </pre>
          );
          codeLines = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        continue;
      }

      if (inCodeBlock) {
        codeLines.push(line);
        continue;
      }

      if (line.startsWith('## ')) {
        elements.push(<h2 key={i}>{line.slice(3)}</h2>);
      } else if (line.startsWith('### ')) {
        elements.push(<h3 key={i}>{line.slice(4)}</h3>);
      } else if (line.startsWith('- **')) {
        const match = line.match(/^- \*\*(.+?)\*\*:?\s*(.*)/);
        if (match) {
          elements.push(
            <li key={i} className="content-list-item">
              <strong>{match[1]}</strong>{match[2] ? `: ${match[2]}` : ''}
            </li>
          );
        }
      } else if (line.startsWith('- ')) {
        elements.push(<li key={i} className="content-list-item">{line.slice(2)}</li>);
      } else if (/^\d+\.\s/.test(line)) {
        elements.push(<li key={i} className="content-list-item">{line.replace(/^\d+\.\s/, '')}</li>);
      } else if (line.trim() === '') {
        continue;
      } else {
        const formatted = line
          .replace(/`([^`]+)`/g, '<code>$1</code>')
          .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.+?)\*/g, '<em>$1</em>');
        elements.push(
          <p key={i} dangerouslySetInnerHTML={{ __html: formatted }} />
        );
      }
    }

    return elements;
  }

  return (
    <>
      <article className="post">
        <header className="post__header">
          <div className="post__meta">
            {category && (
              <Link
                to={`/category/${category.slug}`}
                className="blog-card__category"
                style={{ '--cat-color': category.color }}
              >
                {category.name}
              </Link>
            )}
            <span>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span>{post.readTime} min read</span>
          </div>

          <h1>{post.title}</h1>
          <p className="post__excerpt">{post.excerpt}</p>

          <div className="post__author">
            <img src={author.avatar} alt={author.name} className="avatar avatar--lg" />
            <div>
              <strong>{author.name}</strong>
              <p>{author.bio}</p>
            </div>
          </div>
        </header>

        <img src={post.coverImage} alt={post.title} className="post__cover" />

        <div className="post__content">{renderContent(post.content)}</div>

        <div className="post__tags">
          {post.tags.map((tag) => (
            <Link key={tag} to={`/search?q=${tag}`} className="tag">
              #{tag}
            </Link>
          ))}
        </div>

        <div className="post__share">
          <span>Share this article:</span>
          <div className="share-buttons">
            <button className="icon-btn" aria-label="Share on Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </button>
            <button className="icon-btn" aria-label="Share on LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </button>
            <button className="icon-btn" aria-label="Copy link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </button>
          </div>
        </div>
      </article>

      <Comments />

      {related.length > 0 && (
        <section className="section">
          <div className="section-header">
            <h2>Related Posts</h2>
          </div>
          <div className="posts-grid">
            {related.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}

      <Newsletter />
    </>
  );
}
