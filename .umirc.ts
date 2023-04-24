import {defineConfig} from "umi";

export default defineConfig({
  routes: [
    {path: "/", redirect: "/home"},
    {path: "/login", component: "user/Login"},
    {path: "/home", component: "Home"},
    {path: "/sys/menu", component: "system/Menu"},
    {path: "/sys/role", component: "system/Role"},
    {path: "/sys/user", component: "system/User"},
    {path: "/resource/database", component: "resource/Database"},
    {path: "/emr/editor", component: "emr/Editor"},
  ],
  npmClient: 'yarn',
  links: [{rel: 'icon', href: '/vite.svg'}],
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
      pathRewrite: {'^/api': ''}
    },
  }
});
