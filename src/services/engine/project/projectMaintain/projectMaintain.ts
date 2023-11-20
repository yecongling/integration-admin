import {Project} from "@/pages/engine/project/ProjectMaintain/Project.ts";
import {defHttp} from "@/utils/http";
import {ProjectApi} from "@/services/engine/project/projectMaintain/projectApi.ts";
import {Result} from "@/types/global";


export const getAllProject = (params: Project) => {
  return defHttp.post<Project[]>(
    {
      url: ProjectApi.getAllProject,
      data: params
    }
  );
}

export const addProject = (params: Project) => {
  return defHttp.post<Result<any>>(
    {
      url: ProjectApi.addProject,
      data: params
    },
    {
      isTransformResponse: false
    }
  )
}

/**
 * 更新项目
 *
 * @param params
 */
export const updateProject = (params: Project) => {
  return defHttp.post<Result<any>>(
    {
      url: ProjectApi.updateProject,
      data: params
    },
    {
      isTransformResponse: false
    }
  )
}

export const deleteProject = (projectId: string) => {
  return defHttp.delete<Result<any>>(
    {
      url: ProjectApi.deleteProject,
      params: {projectId}
    },
    {
      isTransformResponse: false,
      joinParamsToUrl: true
    }
  )
}