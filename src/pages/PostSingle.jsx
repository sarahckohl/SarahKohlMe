import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPost, getFeaturedImage, getPostCategories } from "../api";

// Map category slugs to back-link paths
const categoryPaths = {
  thelema: "/thelema",
  music:   "/music",
  coding:  "/coding",
  reviews: "/reviews",
};

export default function PostSingle() {
  const { slug } = useParams();
  const [post, setPost]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    setLoading(true);
    getPost(slug)
      .then((p) => {
        if (!p) throw new Error("Post not found");
        setPost(p);
        document.title = p.title.rendered.replace(/&amp;/g, "&") + " · Sarah Kohl";
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="status-msg">✦ &nbsp; Loading &nbsp; ✦</div>;
  if (error)   return (
    <main className="page">
      <div className="status-msg">{error}. <Link to="/" className="back-link">Return home</Link></div>
    </main>
  );
  if (!post) return null;

  const img        = getFeaturedImage(post);
  const categories = getPostCategories(post);
  const backPath   = categories.length
    ? (categoryPaths[categories[0].slug] ?? "/")
    : "/";
  const backLabel  = categories[0]?.name ?? "Home";

  return (
    <main className="page">
      <div className="post-single">
        {img && <img className="post-hero" src={img} alt="" />}

        <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

        <p className="post-meta">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric", month: "long", day: "numeric",
          })}
          {post._embedded?.author?.[0]?.name && (
            <> &nbsp;·&nbsp; {post._embedded.author[0].name}</>
          )}
        </p>

        <div className="rule" style={{ marginLeft: 0, marginRight: 0, width: "100%", maxWidth: "100%" }} />

        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        <div className="rule" style={{ marginLeft: 0, marginRight: 0, width: "100%", maxWidth: "100%", marginTop: "2.5rem" }} />

        <Link to={backPath} className="back-link">← Back to {backLabel}</Link>
      </div>
    </main>
  );
}
