import {LoginParams, LoginResultModel} from "@/services/system/model/userModel";
import {defHttp} from "@/utils/http";
import {UserAPI} from "@/services/system/user/UserAPI";

/**
 * 登录接口
 */
export function loginApi(params: LoginParams) {
    return defHttp.post<LoginResultModel>(
        {
            url: UserAPI.login,
            data: params
            // 如果写成params，则表示该参数会被拼接到URL地址上
        }
    )
}