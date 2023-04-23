import {RouteMeta} from "react-router";

/**
 * 定义路由项
 */
export interface RouteItem {
  path: string;
  component: string;
  meta: RouteMeta,
  name?: string;
  alias?: string | string[];
  redirect?: string;
  caseSensitive?: boolean;
  children?: RouteItem[];
}

/**
 * 请求菜单的返回值类型
 */
export type getMenuListResultModel = RouteItem[];
