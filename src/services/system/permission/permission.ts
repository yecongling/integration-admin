import {defHttp} from "@/utils/http";
import {Api} from "@/services/system/permission/menuApi";
import {getMenuListResultModel, permission, permissionResult} from "@/services/system/model/menuModel";
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
  return new Promise((resolve, reject) => {
    defHttp.post<permissionResult>({url: Api.getAllPermission, data: params}).then((res) => {
      resolve(res);
    })
  })
}

/**
 * 获取上级菜单
 */
export const getDirectoryPermission = () => {
  return new Promise((resolve, reject) => {
    defHttp.post<permissionResult>({url: Api.getDirectoryPermission}).then((res) => {
      resolve(res);
    })
  })
}

/**
 * 字段校验
 * @param param
 */
export function validateFields(param: permission) {
  let result: Result = {success: true, code: 200, result: '', message: '', fieldName: ''};
  return result;
}

/**
 * 添加菜单
 * @param param
 */
export const addPermission = (param: permission) => {
  return new Promise((resolve, reject) => {
    defHttp.post<permissionResult>({url: Api.addPermission, data: param}).then((res) => {
      resolve(res);
    })
  });
}

/**
 * 编辑菜单
 * @param param
 */
export const editPermission = (param: permission) => {
  return new Promise((resolve, reject) => {
    defHttp.post<permissionResult>({url: Api.editPermission, data: param}).then((res) => {
      resolve(res);
    })
  });
}

/**
 * 删除菜单
 * @param id
 */
export const deletePermission = (id: string) => {
  return new Promise((resolve, reject) => {
    defHttp.post<permissionResult>({url: Api.deletePermission, data: id}).then((res) => {
      resolve(res);
    })
  });
}