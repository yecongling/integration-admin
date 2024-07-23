import {RouteObject} from "@/interface";
import * as Icons from "@ant-design/icons";
import {MenuModel, RouteItem} from "@/apis/system/permission/menuModel";
import React from "react";
import SvgIcon from "@/components/SvgIcon";
import {lazyLoad} from "@/router/lazyLoad.tsx";
import {Link} from "react-router-dom";

/**
 * @description 使用递归处理路由菜单，生成一维数组，做菜单权限判断
 * @param {Array} routerList 所有菜单列表
 * @param newArr
 * @return array
 */
export function handleRouter(
  routerList: RouteItem[],
  newArr: RouteObject[] = []
) {
  routerList.forEach((item: RouteItem) => {
    const menu: RouteObject = {};
    if (typeof item === "object" && item.path && item.route == "1") {
      menu["path"] = item.path;
      menu["component"] = lazyLoad(item.component).type;
      newArr.push(menu);
    }
    if (item.children && item.children.length) {
      menu.children = [];
      handleRouter(item.children, newArr);
    }
    if (item.childrenRoute && item.childrenRoute.length) {
      menu.children = [];
      handleRouter(item.childrenRoute, newArr);
    }
  });
  return newArr;
}

/**
 * @description 获取需要展开的 subMenu
 * @param {String} path 当前访问地址
 * @returns array
 */
export const getOpenKeys = (path: string) => {
  let newStr: string = "";
  const newArr: any[] = [];
  const arr = path.split("/").map((i) => "/" + i);
  for (let i = 1; i < arr.length - 1; i++) {
    newStr += arr[i];
    newArr.push(newStr);
  }
  return newArr;
};

/**
 * 处理菜单数据，对没有children的，移除children节点，不然表格会有展开的图标
 *
 * @param permissions 菜单数据
 */
export const handlePermission = (permissions: MenuModel[]) => {
  permissions.forEach((item: MenuModel) => {
    if (item.children && item.children.length > 0) {
      handlePermission(item.children);
    } else {
      delete item.children;
    }
  });
};

// 动态渲染 Icon 图标
const customIcons: { [key: string]: any } = Icons;
export const addIcon = (name: string) => {
  if (name.startsWith("icon")) {
    return <SvgIcon type={name}/>;
  }
  return React.createElement(customIcons[name]);
};

/**
 * 判断两个数组是否存在交集
 * @param arr1
 * @param arr2
 */
export function hasIntersection(arr1: any[], arr2: any[]): boolean {
  const set1 = new Set(arr1);
  return arr2.some((item) => set1.has(item));
}

/**
 * 根据路径生成面包屑的路径内容
 * @param routerList 菜单集合
 * @param pathname 路径
 * @returns 面包屑内容集合
 */
export function patchBreadcrumb(
  routerList: RouteItem[],
  pathname: string
): Record<string, any>[] {
  const result: Record<string, any>[] = [];
  if (routerList) {
    for (let i = 0; i < routerList.length; i++) {
      const item = routerList[i];
      if (pathname === item.path || pathname.includes(item.path) && pathname.length > item.path.length && pathname.substring(item.path.length, item.path.length + 1) === '/') {
        const pth: Record<string, any> = {};
        pth['title'] = (<><span style={{padding: "0 4px"}}>{item.meta.title}</span></>);
        pth['key'] = item.path;
        if (pathname === item.path) {
          pth['title'] = (<><Link to={item.path}>{item.meta.title}</Link></>)
        }
        result.push(pth);
      }
      if (item.children && item.children.length > 0) {
        const rst = patchBreadcrumb(item.children, pathname);
        if (rst.length > 0) {
          return [...result, ...rst];
        }
      }
    }
  }
  return result;
}
