import { useState } from 'react';

const initialComments = [
  {
    id: 1,
    author: 'Alex Thompson',
    avatar: 'https://i.pravatar.cc/150?u=alex',
    content: 'Great article! Really helped me understand the concepts better.',
    date: '2026-03-21',
    likes: 5,
  },
  {
    id: 2,
    author: 'Jamie Park',
    avatar: 'https://i.pravatar.cc/150?u=jamie',
    content: 'I\'ve been looking for a clear explanation like this. Thanks for sharing!',
    date: '2026-03-20',
    likes: 3,
  },
];

export default function Comments() {
  const [comments, setComments] = useState(initialComments);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    setComments([
      {
        id: Date.now(),
        author: name,
        avatar: `https://i.pravatar.cc/150?u=${name.replace(/\s/g, '')}`,
        content,
        date: new Date().toISOString().split('T')[0],
        likes: 0,
      },
      ...comments,
    ]);
    setName('');
    setContent('');
  }

  function handleLike(id) {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
  }

  return (
    <section className="comments">
      <h3>Comments ({comments.length})</h3>

      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Write a comment..."
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Post Comment</button>
      </form>

      <div className="comment-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <img src={comment.avatar} alt={comment.author} className="avatar" />
            <div className="comment__body">
              <div className="comment__header">
                <strong>{comment.author}</strong>
                <time>
                  {new Date(comment.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
              </div>
              <p>{comment.content}</p>
              <button
                className="comment__like"
                onClick={() => handleLike(comment.id)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span>{comment.likes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
