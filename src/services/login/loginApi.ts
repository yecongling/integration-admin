import { HttpRequest } from "@/utils/request";

/**
 * 枚举登录需要的接口地址
 */
export enum LoginApi {
  /**
   * 登录
   */
  login = "/login",
  /**
   * 获取验证码
   */
  getCode = "/getCode",
}

/**
 * 登录接口的实现
 */
export const login = (params: any) => {
  return HttpRequest.post({
    url: LoginApi.login,
    data: params,
  });
};

/**
 * 获取验证码
 * @returns 验证码
 */
export const getCode = () => {
  return HttpRequest.get({
    url: LoginApi.getCode,
  });
};
