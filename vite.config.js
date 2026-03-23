// vite.config.js
// Set "base" to your repo name if deploying to username.github.io/repo-name
// Set to "/" if using a custom domain
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",  // change to "/your-repo-name/" if no custom domain
});

// ---

// package.json (relevant parts)
// {
//   "scripts": {
//     "dev": "vite",
//     "build": "vite build",
//     "preview": "vite preview",
//     "deploy": "gh-pages -d dist"
//   },
//   "dependencies": {
//     "react": "^18.2.0",
//     "react-dom": "^18.2.0",
//     "react-router-dom": "^6.22.0"
//   },
//   "devDependencies": {
//     "@vitejs/plugin-react": "^4.2.0",
//     "gh-pages": "^6.1.1",
//     "vite": "^5.1.0"
//   }
// }
