import {defineConfig} from "umi";

export default defineConfig({
  routes: [
    {path: "/", redirect: "/login", layout: false},
    {path: "/login", component: "user/Login", title: '登录'},
    {path: "/home", component: "Home", title: '首页'},
    {path: "/system/menu", component: "system/Menu", title: '菜单管理'},
    {path: "/system/role", component: "system/Role", title: '角色管理'},
    {path: "/system/user", component: "system/User", title: '用户管理'},
    {path: "/connection/database", component: "connection/Database", title: '数据源连接'},
    {path: "/emr/designer", component: "emr/Designer", title: '病历设计'},
    {path: "*", component: "@/pages/404", title: "未知页面"},
    {path: "/dataStatics/messageSearch", component: "dataStatics/MessageSearch",title: "消息检索"},
    {path: "/dataStatics/errorStatics", component: "dataStatics/ErrorStatics",title: "错误统计"},
    {path: "/dataStatics/terminal", component: "dataStatics/Terminal",title: "终端监控"},
    {path: "/dataStatics/testMessage", component: "dataStatics/TestMessage",title: "测试消息"},

    {path: "/project/projectMaintain", component: "project/ProjectMaintain",title: "项目维护"},
    {path: "/project/terminalManager", component: "project/TerminalManager",title: "终端管理"}
  ],
  npmClient: 'yarn',
  links: [{rel: 'icon', href: '/vite.svg'}],
  plugins: [
    '@umijs/plugins/dist/initial-state',
    '@umijs/plugins/dist/model',
  ],
  mock: false,
  initialState: {},
  model: {},
  proxy: {
    "/api": {
      target: "http://localhost:8080/integration",
      changeOrigin: true,
      pathRewrite: {'^/api': ''}
    },
  }
});
