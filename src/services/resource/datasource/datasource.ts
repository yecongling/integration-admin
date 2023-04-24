import {defHttp} from "@/utils/http";
import {datasourceApi} from "@/services/resource/datasource/datasourceApi";
import {DataType} from "@/views/resource/Database/DataType";
/**
 * 获取数据源
 */
export function getDatasource(params: any){
  return defHttp.post<DataType[]>(
    {
      url: datasourceApi.getDatasource,
      data: params
    }
  )
}