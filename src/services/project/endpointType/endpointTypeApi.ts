import { HttpRequest } from "@/utils/request";
import { EndpointType, EndpointTypeConfig } from "./endpointTypeModel";

export enum EndpointTypeApi {
  // 获取所有端点类型
  getEndpointTypeTree = "/project/endpointType/getEndpointTypeTree",
  // 获取端点类型 行数据
  getEndpointTypes = "/project/endpointType/getEndpointTypes",
  // 查询端点类型配置项
  getEndpointTypeConfig = "/project/endpointType/getEndpointTypeConfig",
}

/**
 * 查询端点类型（树结构）
 *
 * @param type 查询条件
 */
export const getEndpointTypeTree = (type?: string) => {
  return HttpRequest.get<EndpointType[]>(
    { url: EndpointTypeApi.getEndpointTypeTree, params: { typeName: type } },
    { successMessageMode: "none" }
  );
};

/**
 * 查询端点类型数据 表格结构
 * @param title 查询条件
 */
export const getEndpointTypes = (title?: string) => {
  return HttpRequest.post<EndpointType[]>(
    { url: EndpointTypeApi.getEndpointTypes, data: { name: title } },
    { successMessageMode: "none" }
  );
};

/**
 * 根据端点类型获取他的相关配置项
 * @param typeId 端点类型ID
 * @returns 配置
 */
export const getEndpointTypeConfig = (typeId: string) => {
  return HttpRequest.get<EndpointTypeConfig[]>(
    { url: EndpointTypeApi.getEndpointTypeConfig, params: { typeId } },
    { successMessageMode: "none" }
  );
};
