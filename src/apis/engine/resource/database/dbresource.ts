import {defHttp} from "@/utils/http";
import {DBResourceApi} from "@/apis/engine/resource/database/dbresourceApi.ts";
import {DBResource} from "@/pages/engine/resource/Database/DBResource.ts";

/**
 * 获取数据库资源
 * @param params
 */
export function getAll(params: any) {
  return defHttp.post<DBResource[]>(
    {
      url: DBResourceApi.getDBResource,
      data: params
    }
  )
}