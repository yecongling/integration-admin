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

export const getAllPermission = (params: any) => {
  return new Promise((resolve, reject) => {
    defHttp.post<permissionResult>({url: Api.getAllPermission, data: params}).then((res) => {
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