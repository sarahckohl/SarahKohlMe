import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav        from "./components/Nav";
import Footer     from "./components/Footer";
import Home       from "./pages/Home";
import PostFeed   from "./pages/PostFeed";
import PostSingle from "./pages/PostSingle";
import HighHolySeason from "./pages/HighHolySeason";

const feeds = [
  {
    path:         "thelema",
    categorySlug: "thelema",
    glyph:        "𓂀",
    title:        "Thelema",
    subtitle:     "The Great Work · 93 · Do what thou wilt",
  },
  {
    path:         "music",
    categorySlug: "music",
    glyph:        "♭",
    title:        "Music",
    subtitle:     "Compositions · Recordings · Sonic Explorations",
  },
  {
    path:         "coding",
    categorySlug: "coding",
    glyph:        "⌬",
    title:        "Coding",
    subtitle:     "Projects · Tools · The Craft",
  },
  {
    path:         "reviews",
    categorySlug: "reviews",
    glyph:        "✦",
    title:        "Reviews",
    subtitle:     "Hot Sauce · Absinthe · Fine Vices",
  },
];

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        {feeds.map(({ path, ...props }) => (
          <Route key={path} path={`/${path}`} element={<PostFeed {...props} />} />
        ))}
        <Route path="/post/:slug" element={<PostSingle />} />
        <Route path="/high-holy-season" element={<HighHolySeason />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
