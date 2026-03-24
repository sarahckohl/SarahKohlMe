const WP_BASE = "https://public-api.wordpress.com/wp/v2/sites/sarahkohl.me";

// Category slugs — set these to match what you create in WordPress
export const CATEGORY_SLUGS = {
  thelema: "thelema",
  music:   "music",
  coding:  "coding",
  reviews: "reviews",
};

// Fetch category ID from slug (cached in memory)
const categoryCache = {};
export async function getCategoryId(slug) {
  if (categoryCache[slug]) return categoryCache[slug];
  const res = await fetch(`${WP_BASE}/categories?slug=${slug}`);
  if (!res.ok) return null;
  const [cat] = await res.json();
  if (cat) categoryCache[slug] = cat.id;
  return cat?.id ?? null;
}

export async function getPosts({ page = 1, perPage = 10, categorySlug } = {}) {
  let url = `${WP_BASE}/posts?_embed&page=${page}&per_page=${perPage}`;
  if (categorySlug) {
    const id = await getCategoryId(categorySlug);
    if (id) url += `&categories=${id}`;
  }
  const res = await fetch(url);
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

export function getFeaturedImage(post) {
  return post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;
}

export function getPostCategories(post) {
  return post?._embedded?.["wp:term"]?.[0] ?? [];
}
