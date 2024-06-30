import { Endpoint } from "@/pages/engine/project/Endpoint/Endpoint"
import { defHttp } from "@/utils/http"
import { EndpointApi } from "./endpointApi"

/**
 * 查询符合条件的端点信息
 * @param endpoint 端点查询条件
 */
export const getEndpoints = (endpoint: any) => {
    return defHttp.post<Endpoint[]>({url: EndpointApi.getEndpoints, data: endpoint}, {successMessageMode: 'none'});
}