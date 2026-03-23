// pages/PostList.jsx — blog index with pagination
import { useState } from "react";
import { Link } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import { getFeaturedImage } from "../api";

export default function PostList() {
  const [page, setPage] = useState(1);
  const { posts, totalPages, loading, error } = usePosts(page);

  if (loading) return <p>Loading posts…</p>;
  if (error)   return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Blog</h1>
      <ul className="post-list">
        {posts.map((post) => {
          const img = getFeaturedImage(post);
          return (
            <li key={post.id} className="post-card">
              {img && <img src={img} alt="" loading="lazy" />}
              <div>
                <h2>
                  <Link to={`/post/${post.slug}`}>
                    {/* WordPress returns HTML-encoded titles — render safely */}
                    <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  </Link>
                </h2>
                <p className="post-date">
                  {new Date(post.date).toLocaleDateString()}
                </p>
                <div
                  className="post-excerpt"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
              </div>
            </li>
          );
        })}
      </ul>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>
          ← Previous
        </button>
        <span>{page} / {totalPages}</span>
        <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>
          Next →
        </button>
      </div>
    </div>
  );
}
