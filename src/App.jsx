// App.jsx — top-level routing
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostList from "./pages/PostList";
import PostSingle from "./pages/PostSingle";
import Nav from "./components/Nav";

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main>
        <b>Test?</b>
        <Routes>
          <Route path="/"        element={<PostList />} />
          <Route path="/post/:slug" element={<PostSingle />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
