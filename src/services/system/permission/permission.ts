import {defHttp} from "@/utils/http";
import {Api} from "@/services/system/permission/menuApi";
import {
  directoryResult,
  getMenuListResultModel,
  permission,
  permissionResult
} from "@/services/system/permission/menuModel";
import {Result} from "@/types/axios";

/**
 * 获取菜单列表
 */
export const getMenuList = () => {
  return new Promise((resolve) => {
    defHttp.get<getMenuListResultModel>({url: Api.getMenuList}).then((res) => {
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
export const getAllPermission = (params: any) => {
  return defHttp.post<permissionResult>({url: Api.getAllPermission, data: params});
}

/**
 * 获取上级菜单
 */
export const getDirectoryPermission = () => {
  return defHttp.get<directoryResult>({url: Api.getDirectoryPermission}, {successMessageMode: "none"});
}

/**
 * 字段校验
 */
export function validateFields() {
  const result: Result = {success: true, code: 200, result: '', message: '', fieldName: ''};
  return result;
}

/**
 * 添加菜单
 * @param param
 */
export const addPermission = (param: permission) => {
  return defHttp.post<permissionResult>({url: Api.addPermission, data: param}, {isTransformResponse: false});
}

/**
 * 编辑菜单
 * @param param
 */
export const updatePermission = (param: permission) => {
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