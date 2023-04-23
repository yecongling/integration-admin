import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: "Home" },
    { path: "/docs", component: "docs" },
  ],
  npmClient: 'yarn',
  links: [{ rel: 'icon', href: '/vite.svg' }],
  plugins: [
    '@umijs/plugins/dist/initial-state',
    '@umijs/plugins/dist/model',
  ],
  initialState: {},
  model: {},
  proxy: {
    "/api": {
      target: "http://localhost:8080",
      changeOrigin: true,
      pathRewrite: { '^/api' : '' }
    },
  }
});
