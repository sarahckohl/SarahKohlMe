// pages/PostSingle.jsx — individual post view
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPost, getFeaturedImage } from "../api";

export default function PostSingle() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getPost(slug)
      .then((p) => {
        if (!p) throw new Error("Post not found");
        setPost(p);
        // Set the page title
        document.title = p.title.rendered.replace(/&amp;/g, "&");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p>Loading…</p>;
  if (error)   return <p>Error: {error}. <Link to="/">Go back</Link></p>;
  if (!post)   return null;

  const img = getFeaturedImage(post);

  return (
    <article className="post-single">
      {img && (
        <img className="post-hero" src={img} alt="" />
      )}
      <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <p className="post-meta">
        {new Date(post.date).toLocaleDateString()} ·{" "}
        {post._embedded?.author?.[0]?.name}
      </p>
      {/* WordPress post content is trusted HTML — safe to render */}
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
      <Link to="/">← Back to posts</Link>
    </article>
  );
}
