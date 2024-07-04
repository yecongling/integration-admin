import {RouteMeta} from "react-router";

/**
 * 定义路由项
 */
export interface RouteItem {
  path: string;
  component: string;
  meta: RouteMeta,
  route?: string;
  name?: string;
  alias?: string | string[];
  redirect?: string;
  caseSensitive?: boolean;
  children?: RouteItem[];
  childrenRoute?: RouteItem[];
}

/**
 * 菜单
 */
export interface MenuModel {
  id: string;
  parentId: string;
  name: string;
  url: string;
  component: string;
  componentName: string;
  redirect: string
  menuType: number;
  perms: string;
  permsType: string;
  sortNo: number;
  alwaysShow: boolean;
  icon: string;
  route: boolean;
  leaf: boolean;
  keepAlive: boolean;
  hidden: boolean;
  hideTab: boolean;
  description: string;
  delFlag: number;
  ruleFlag: number;
  status: string;
  internalOrExternal: boolean;
  children?: MenuModel[]
}

export type permissionResult = {
  code: number;
  data: MenuModel[]
}

/**
 * 目录
 */
export interface Directory{
  title: string;
  value: string;
  children?: Directory[];
}

export type directoryResult = {
  code: number;
  directory: Directory[]
}

/**
 * 请求菜单的返回值类型
 */
export type getMenuListResultModel = RouteItem[];
