import {defHttp} from "@/utils/http";
import {permissionResult} from "@/services/system/model/menuModel";
import {Project} from "@/pages/project/ProjectMaintain/Project";
import {ProjectApi} from "@/services/project/projectMaintain/projectApi";

/**
 * 获取所有项目
 * @param params
 */
export const getAllProject = (params: Project) => {
  return new Promise((resolve, reject) => {
    defHttp.post<permissionResult>({url: ProjectApi.getAllProject, data: params}).then((res) => {
      resolve(res);
    })
  })
}