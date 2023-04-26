/**
 * 定义用户的model类型
 *
 */

/**
 * 定义请求参数类型
 */
export interface LoginParams {
    username: string;
    password: string;
}

/**
 *  定义角色信息
 */
export interface RoleInfo {
    roleName: string;
    value: string;
}

/**
 * 定义登录返回类型（这里需要和后台的一致，因此需要修改）
 *
 */

export interface LoginResultModel {
    userId: string | number;
    token: string;
    role: RoleInfo
}