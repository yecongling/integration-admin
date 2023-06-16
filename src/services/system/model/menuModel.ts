import {RouteMeta} from "react-router";

/**
 * 定义路由项
 */
export interface RouteItem {
  path: string;
  component: string;
  meta: RouteMeta,
  route?: boolean;
  name?: string;
  alias?: string | string[];
  redirect?: string;
  caseSensitive?: boolean;
  children?: RouteItem[];
}

/**
 * 菜单
 */
export interface permission {
  id: string;
  parent_id: string;
  name: string;
  url: string;
  component: string;
  component_name: string;
  redirect: string
  menu_type: number;
  perms: string;
  perms_type: string;
  sort_no: number;
  always_show: boolean;
  icon: string;
  is_route: boolean;
  is_leaf: boolean;
  keep_alive: boolean;
  hidden: boolean;
  hide_tab: boolean;
  description: string;
  del_flag: boolean;
  rule_flag: number;
  status: string;
  internal_or_external: boolean;
  children?: permission[]
}

export type permissionResult = {
  code: number;
  data: permission[]
}

/**
 * 请求菜单的返回值类型
 */
export type getMenuListResultModel = RouteItem[];
