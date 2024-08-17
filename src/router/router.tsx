import { RouteObject } from "@/types/route";
import { lazyLoad } from "./lazyLoad";
import { Suspense, useEffect, useState } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { App, Skeleton } from "antd";
import { useStore } from "@/hooks/sotreContext";
import { handleRouter } from "@/utils/utils";
import { antdUtils } from "@/utils/antd";
import React from "react";
import { observer } from "mobx-react-lite";

// 默认错误路由
const errorRoutes: RouteObject[] = [
  {
    path: "*",
    component: () => <Navigate replace to="/404" />,
  },
  {
    path: "/500",
    component: lazyLoad("500.tsx").type,
  },
  {
    path: "/404",
    component: lazyLoad("404.tsx").type,
  },
];

// 动态路由
export const routes: RouteObject[] = [
  {
    path: "/",
    component: React.lazy(() => import("@/layouts/MainLayout")) as unknown as React.ReactNode,
    children: [],
  },
  {
    path: "/login",
    component: lazyLoad("Login").type,
  },
];

// 路由处理方式
const generateRouter = (routers: RouteObject[]) => {
  return routers.map((item: any) => {
    if (item.index) {
      return item;
    }
    item.element = (
      <Suspense fallback={<Skeleton />}>
        <item.component />
      </Suspense>
    );
    if (item.children) {
      item.children = generateRouter(item.children);
      if (item.children.length) {
        item.children.unshift({
          index: true,
          element: <Navigate to={item.children[0].path} replace />,
        });
      }
    }
    return item;
  });
}

// 生成路由
export const Router = observer(() => {
  // 方便非react组件内部使用
  const { notification, message, modal } = App.useApp();
  useEffect(() => {
    antdUtils.setMessageInstance(message);
    antdUtils.setNotificationInstance(notification);
    antdUtils.setModalInstance(modal);
  }, [notification, message, modal]);

  const [route, setRoute] = useState([...routes]);

  // 从Store中获取Menu
  const { globalStore } = useStore();
  const { menus } = globalStore;

  useEffect(() => {
    route[0].children = [...handleRouter(menus), ...errorRoutes];
    setRoute([...route]);
  }, [menus]);
  return useRoutes(generateRouter(route));
})
