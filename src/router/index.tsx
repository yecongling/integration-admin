import {useRoutes} from "react-router-dom";
import React, {Suspense, useEffect} from 'react'
import {App, Skeleton} from "antd";
import {antdUtils} from "@/utils/antd.ts";

const lazyLoad = (moduleName: string) => {
  const viteModule = import.meta.glob('../**/*.tsx');
  //组件地址
  let URL = "";
  if (moduleName === "layouts") {
    URL = `../layouts/index.tsx`;
  } else if (moduleName.endsWith(".tsx")) {
    URL = `../pages/${moduleName}`;
  } else {
    URL = `../pages/${moduleName}/index.tsx`;
  }
  const Module = React.lazy(viteModule[`${URL}`] as any);
  return (
    <Module/>
  );
}

const routes = [
  {
    path: '/',
    auth: false,
    component: React.lazy(() => import("@/layouts")),
    children: [
      {
        path: "/home",
        auth: false,
        title: '首页',
        component: lazyLoad('Home').type
      },
      {
        path: "/system/menu",
        title: "菜单管理",
        auth: false,
        component: lazyLoad('system/Menu').type
      },
      {
        path: "/system/user",
        title: "用户管理",
        auth: false,
        component: lazyLoad('system/User').type
      },
      {
        path: '/system/personal',
        title: '个人中心',
        auth: false,
        component: lazyLoad('system/Personal').type
      },
      {
        path: "/project/design",
        auth: false,
        component: lazyLoad('engine/project/Design').type
      },
      {
        path: "/project/terminal",
        auth: false,
        component: lazyLoad('engine/project/Terminal').type
      },
      {
        path: "/project/design/designer",
        auth: false,
        component: lazyLoad('engine/project/Design/Designer').type
      },
      {
        path: "/connection/database",
        auth: false,
        component: lazyLoad('engine/connection/Database').type
      },
      {
        path: "/resource/database",
        auth: false,
        component: lazyLoad('engine/resource/Database').type
      },
      {
        path: '/dataHandle/dataTransfer',
        auth: false,
        title: '数据转换',
        component: lazyLoad('engine/dataHandle/DataTransfer').type
      },

      {
        path: "/editor/docEditor",
        auth: false,
        component: lazyLoad('editor/DocEditor').type
      },
      {
        path: '*',
        auth: false,
        component: lazyLoad('404.tsx').type
      },
      {
        path: '/500',
        auth: false,
        component: lazyLoad('500.tsx').type
      }
    ]
  },
  {
    path: '/login',
    auth: false,
    component: lazyLoad('Login').type
  }
]

//根据路径获取路由
const checkAuth = (routers: any, path: string) => {
  for (const data of routers) {
    if (data.path == path) return data
    if (data.children) {
      const res: any = checkAuth(data.children, path)
      if (res) return res
    }
  }
  return null
}

// 路由处理方式
const generateRouter = (routers: any) => {
  return routers.map((item: any) => {
    if (item.children) {
      item.children = generateRouter(item.children)
    }
    item.element = <Suspense fallback={<Skeleton/>}>
      <item.component/>
    </Suspense>;
    {/* 把懒加载的异步路由变成组件装载进去 */
    }
    return item
  })
}

const Router = () => {
  const route = generateRouter(routes);
  const {notification, message, modal} = App.useApp();
  useEffect(() => {
    antdUtils.setMessageInstance(message);
    antdUtils.setNotificationInstance(notification);
    antdUtils.setModalInstance(modal);
  }, [notification, message, modal]);
  return useRoutes(route);
}
const checkRouterAuth = (path: string) => {
  let auth = null
  auth = checkAuth(routes, path)
  return auth
}

/**
 * 更新路由
 * @param routesData
 */
// const updateRoutes = (routesData) => {
//
// }

export {Router, checkRouterAuth}