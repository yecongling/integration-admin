import {defHttp} from "@/utils/http";
import {UserApi} from "@/services/system/user/userApi.ts";
import {UserModel} from "@/services/system/user/userModel.ts";

/**
 * 获取所有用户信息
 * @param params
 */
export const getAllUser = (params: any) => {
  return defHttp.post<UserModel[]>(
    {
      url: UserApi.getAllUser,
      data: params
    }
  );
}