import {defHttp} from "@/utils/http";
import {Api} from "@/services/system/permission/menuApi";
import {getMenuListResultModel} from "@/services/system/model/menuModel";

/**
 * 获取菜单列表
 */
export const getMenuList = () => {
    return new Promise((resolve)=> {
        defHttp.get<getMenuListResultModel>({url: Api.getMenuList}).then((res)=> {
            if (Array.isArray(res)) {
                resolve(res);
            } else {
                resolve(res['menu']);
            }
        })
    });
}