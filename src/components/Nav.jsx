import { Link, useLocation } from "react-router-dom";

const sections = [
  { path: "/thelema", label: "Thelema" },
  { path: "/music",   label: "Music"   },
  { path: "/coding",  label: "Coding"  },
  { path: "/reviews", label: "Reviews" },
];

export default function Nav() {
  const { pathname } = useLocation();
  return (
    <nav className="site-nav">
      <Link to="/" className="nav-home">𓅓 Sarah Kohl</Link>
      <div className="nav-links">
        {sections.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={pathname.startsWith(path) ? "active" : ""}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
