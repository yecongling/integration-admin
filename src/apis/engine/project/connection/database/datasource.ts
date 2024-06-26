import {defHttp} from "@/utils/http";
import {DataType} from "@/pages/engine/connection/Database/DataType.ts";
import {datasourceApi} from "@/apis/engine/project/connection/database/datasourceApi";

/**
 * 获取数据源
 */
export function getDatasource(params: any) {
  return defHttp.post<DataType[]>(
    {
      url: datasourceApi.getDatasource,
      data: params
    }
  )
}