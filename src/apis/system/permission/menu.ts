import {defHttp} from "@/utils/http";
import {Api} from "@/apis/system/permission/menuApi";
import {
  Directory,
  getMenuListResultModel,
  MenuModel,
  permissionResult
} from "@/apis/system/permission/menuModel";

/**
 * 获取菜单列表
 */
export const getMenuList = (params: any) => {
  return new Promise((resolve) => {
    defHttp.get<getMenuListResultModel>({url: Api.getMenuList, params}, {successMessageMode: 'none'}).then((res) => {
      if (Array.isArray(res)) {
        resolve(res);
      } else {
        resolve(res['menu']);
      }
    })
  });
}

/**
 * 获取所有菜单
 * @param params
 */
export const getMenus = (params: any) => {
  return defHttp.post<MenuModel[]>({url: Api.getAllMenus, data: params});
}

/**
 * 获取上级菜单
 */
export const getDirectoryMenu = (params: any) => {
  return defHttp.get<Directory[]>({url: Api.getDirectoryMenu, params}, {successMessageMode: "none"});
}

/**
 * 字段校验
 */
export function validateFields() {
  const result: any = {success: true, code: 200, data: '', msg: ''};
  return result;
}

/**
 * 添加菜单
 * @param param
 */
export const addPermission = (param: MenuModel) => {
  return defHttp.post<permissionResult>({url: Api.addPermission, data: param}, {isTransformResponse: false});
}

/**
 * 编辑菜单
 * @param param
 */
export const updatePermission = (param: MenuModel) => {
  return defHttp.post<permissionResult>({url: Api.updatePermission, data: param}, {isTransformResponse: false});
}

/**
 * 删除菜单
 * @param id
 */
export const deletePermission = (id: string) => {
  return new Promise((resolve) => {
    defHttp.post<permissionResult>({url: Api.deletePermission, data: id}).then((res) => {
      resolve(res);
    })
  });
}