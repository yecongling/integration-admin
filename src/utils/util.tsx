import {RouteObject} from "@/interface";
import * as Icons from "@ant-design/icons";
import {permission, RouteItem} from "@/services/system/permission/menuModel";
import React from "react";
import SvgIcon from "@/components/SvgIcon";

/**
 * @description 使用递归处理路由菜单，生成一维数组，做菜单权限判断
 * @param {Array} routerList 所有菜单列表
 * @param newArr
 * @return array
 */
export function handleRouter(routerList: RouteItem[], newArr: string[] = []) {
  routerList.forEach((item: RouteItem) => {
    const menu: RouteObject = {};
    if (typeof item === "object" && item.path) {
      newArr.push(item.path);
      menu['path'] = item.path
    }
    if (item.children && item.children.length) {
      menu.children = [];
      handleRouter(item.children, newArr);
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
  const arr = path.split("/").map(i => "/" + i);
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
export const handlePermission = (permissions: permission[]) => {
  permissions.forEach((item: permission) => {
    if (item.children && item.children.length > 0) {
      handlePermission(item.children);
    } else {
      delete item.children;
    }
  })
}

// 动态渲染 Icon 图标
const customIcons: { [key: string]: any } = Icons;
export const addIcon = (name: string) => {
  if (name.startsWith('icon')) {
    return <SvgIcon type={name}/>;
  }
  return React.createElement(customIcons[name]);
};
