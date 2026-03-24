import { Link } from "react-router-dom";

const sections = [
  {
    path:  "/thelema",
    slug:  "thelema",
    glyph: "𓂀",
    title: "Thelema",
    desc:  "Magical practice, ritual, and the Great Work",
  },
  {
    path:  "/music",
    slug:  "music",
    glyph: "♭",
    title: "Music",
    desc:  "Compositions, recordings, and sonic explorations",
  },
  {
    path:  "/coding",
    slug:  "coding",
    glyph: "⌬",
    title: "Coding",
    desc:  "Projects, tools, and thoughts on the craft",
  },
  {
    path:  "/reviews",
    slug:  "reviews",
    glyph: "✦",
    title: "Reviews",
    desc:  "Hot sauce, absinthe, and other fine vices",
  },
];

export default function Home() {
  return (
    <>
      <header className="hero">
        <span className="hero-glyph">𓅓</span>
        <div className="rule" />
        <h1>Sarah Kohl</h1>
        <p className="sub">Tulsa, Oklahoma &nbsp;·&nbsp; Anno IVxvii e.v.</p>
        <p className="law">Do what thou wilt shall be the whole of the Law.</p>

        <div className="hero-bio">
          I'm Sarah — a nurse, musician, computer programmer, and practicing
          Thelemite. This is a page about me and all my projects. Welcome to
          my corner of the Great Work.
        </div>

        <div className="rule" />
      </header>

      <main className="page">
        <div className="section-banner">
          {sections.map(({ path, slug, glyph, title, desc }) => (
            <Link key={path} to={path} className={`section-card ${slug}`}>
              <span className="card-glyph">{glyph}</span>
              <div className="card-title">{title}</div>
              <div className="card-desc">{desc}</div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
