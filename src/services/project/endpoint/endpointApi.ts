import { HttpRequest } from "@/utils/request";
import { EndpointModel } from "./endpointModel";

export enum EndpointApi {
  // 查询所有端点
  getEndpoints = "/project/endpoint/getEndpoints",
}

/**
 * 查询所有的端点信息
 * @param endpoint 端点的查询条件
 */
export const getEndpoints = (endpoint?: EndpointModel) => {
  return HttpRequest.get<EndpointModel[]>(
    { url: EndpointApi.getEndpoints, params: endpoint },
    { successMessageMode: "none" }
  );
};
