import {defineConfig} from "umi";

export default defineConfig({
  routes: [
    {path: "/", redirect: "/home"},
    {path: "/login", component: "user/Login", title: '登录'},
    {path: "/home", component: "Home", title: '首页'},
    {path: "/sys/menu", component: "system/Menu", title: '菜单管理'},
    {path: "/sys/role", component: "system/Role", title: '角色管理'},
    {path: "/sys/user", component: "system/User", title: '用户管理'},
    {path: "/resource/database", component: "resource/Database", title: '数据源管理'},
    {path: "/emr/designer", component: "emr/Designer", title: '病历设计'},
    {path: "*", component: "@/pages/404"}
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
