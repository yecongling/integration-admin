import { RouteObject } from "@/types/route";
import { routes } from "./router";

// 根据路径获取路由
const checkAuth = (routes: RouteObject[], path: string) => {
  for (const data of routes) {
    if (data.path == path) return data
    if (data.children) {
        const res: any = checkAuth(data.children, path)
        if (res) return res
    }
}
return null
};

// 检查路由权限
export const checkRouterAuth = (path: string) => {
  return checkAuth(routes, path);
};
