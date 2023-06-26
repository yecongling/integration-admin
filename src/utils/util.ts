import {RouteObject} from "@/interface";
import {permission, RouteItem} from "@/services/system/model/menuModel";

/**
 * @description 使用递归处理路由菜单，生成一维数组，做菜单权限判断
 * @param {Array} routerList 所有菜单列表
 * @param {Array} newArr 菜单的一维数组
 * @param menuList 构建的路由信息
 * @return array
 */
export function handleRouter(routerList: RouteItem[], newArr: string[] = [], menuList: RouteObject[] = []) {
  routerList.forEach((item: RouteItem) => {
    let menu: RouteObject = {};
    if (typeof item === "object" && item.path) {
      newArr.push(item.path);
      menu['path'] = item.path
    }
    if (item.children && item.children.length) {
      menu.children = [];
      handleRouter(item.children, newArr, menu.children);
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
  let newArr: any[] = [];
  let arr = path.split("/").map(i => "/" + i);
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

}