// hooks/usePosts.js — reusable data-fetching hook
import { useState, useEffect } from "react";
import { getPosts } from "../api";

export function usePosts(page = 1) {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getPosts({ page })
      .then(({ posts, totalPages }) => {
        if (!cancelled) {
          setPosts(posts);
          setTotalPages(totalPages);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [page]);

  return { posts, totalPages, loading, error };
}
