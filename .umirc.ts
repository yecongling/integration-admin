import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "Home" },
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
});
