import {defHttp} from "@/utils/http";

export enum LoginApi {
  login = '/api/system/login'
}

/**
 * 登录接口
 * @param params
 */
export const login = (params: any) => {
  return defHttp.post<any>({url: LoginApi.login, data: params}, {successMessageMode: 'none'});
}