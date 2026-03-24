import { useState } from "react";
import { Link } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import { getFeaturedImage } from "../api";

export default function PostFeed({ categorySlug, glyph, title, subtitle }) {
  const [page, setPage] = useState(1);
  const { posts, totalPages, loading, error } = usePosts(page, categorySlug);

  if (loading) return <div className="status-msg">✦ &nbsp; Loading &nbsp; ✦</div>;
  if (error)   return <div className="status-msg">Error: {error}</div>;

  return (
    <main className="page">
      <div className="feed-header">
        <span className="feed-glyph">{glyph}</span>
        <div className="rule" />
        <h1>{title}</h1>
        {subtitle && <p className="feed-sub">{subtitle}</p>}
        <div className="rule" style={{ marginTop: "1rem" }} />
      </div>

      {posts.length === 0 ? (
        <div className="status-msg" style={{ animation: "none", opacity: .5 }}>
          No posts yet.
        </div>
      ) : (
        <ul className="post-list">
          {posts.map((post) => {
            const img = getFeaturedImage(post);
            return (
              <li key={post.id} className="post-card">
                {img && <img src={img} alt="" loading="lazy" />}
                <div className="post-card-meta">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric", month: "long", day: "numeric",
                  })}
                </div>
                <div className="post-card-title">
                  <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                </div>
                <div
                  className="post-card-excerpt"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
                <Link to={`/post/${post.slug}`} className="read-more">
                  Read more →
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>
            ← Previous
          </button>
          <span>{page} / {totalPages}</span>
          <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>
            Next →
          </button>
        </div>
      )}
    </main>
  );
}
