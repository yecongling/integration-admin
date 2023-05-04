import defaultSettings from "../config/defaultSetting";
import {matchRoutes} from "umi";
export async function getInitialState(): Promise<{
  setting?: any;
  currentUser?:any;
  loading?: boolean;
}> {
  return {
    setting: defaultSettings
  }
}

// @ts-ignore
export function onRouteChange({clientRoutes, location}) {
  const route = matchRoutes(clientRoutes, location.pathname)?.pop()?.route;
  if (route) {
    document.title = route.title || '';
  }
}

let normalizedRoutes: any = [];

// umi3.x 需要将 routes 选项从第一个参数中解构: patchRoutes({ routes }) {}
export function patchRoutes(routes: any) {
  if (normalizedRoutes) {
    mergeRoutes(normalizedRoutes, routes);
  }
}

// oldRender 至少需要被调用一次
export function render(oldRender: () => void) {
  fetch('/api/sys/permission/getUserPermissionByToken')
    .then((res) => res.json())
    .then((res) => {
      normalizedRoutes = res.data;
      oldRender();
    });
}

const mergeRoutes = (
  routes: any[],
  parentRoute: {
    routes: { name: string; path: string; component: string }[];
  }[],
) => {
  if (!Array.isArray(routes)) return [];
  const route = parentRoute[0];
  routes?.map((item) => {});
};
