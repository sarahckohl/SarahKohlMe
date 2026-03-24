// api.js — all WordPress REST API calls live here
const WP_BASE = "https://public-api.wordpress.com/wp/v2/sites/sarahkohl.me";//"https://sarahkohl.me/wp-json/wp/v2";

export async function getPosts({ page = 1, perPage = 10 } = {}) {
  const res = await fetch(
    `${WP_BASE}/posts?_embed&page=${page}&per_page=${perPage}`
  );
  if (!res.ok) throw new Error("Failed to fetch posts");
  const total = parseInt(res.headers.get("X-WP-TotalPages") ?? "1", 10);
  const posts = await res.json();
  return { posts, totalPages: total };
}

export async function getPost(slug) {
  const res = await fetch(`${WP_BASE}/posts?slug=${slug}&_embed`);
  if (!res.ok) throw new Error("Post not found");
  const [post] = await res.json();
  return post ?? null;
}

export async function getPages() {
  const res = await fetch(`${WP_BASE}/pages?_embed`);
  if (!res.ok) throw new Error("Failed to fetch pages");
  return res.json();
}

// Helper: extract featured image URL from embedded post data
export function getFeaturedImage(post) {
  return (
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null
  );
}
