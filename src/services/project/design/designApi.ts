import { HttpRequest } from "@/utils/request";
import { ProjectModel } from "./projectModel";

export enum ProjectApi {
  // 获取所有项目
  getProjects = "/project/getProjects",
  // 添加项目
  addProject = "/project/addProject",
  // 更新项目
  updateProject = "/project/updateProject",
  // 删除项目
  deleteProject = "/project/deleteProject",
}

/**
 * 查询所有项目信息
 * @returns 项目列表
 */
export const getProjects = (params?: any) => {
  return HttpRequest.get<ProjectModel[]>(
    { url: ProjectApi.getProjects, params },
    { successMessageMode: "none" }
  );
};

/**
 * 新增项目
 * @param params 项目模型
 * @returns
 */
export const addProject = (params: ProjectModel) => {
  return HttpRequest.post({
    url: ProjectApi.addProject,
    data: params,
  });
};

/**
 * 更新项目
 *
 * @param params
 */
export const updateProject = (params: ProjectModel) => {
  return HttpRequest.post({
    url: ProjectApi.updateProject,
    data: params,
  });
};

/**
 * 项目移动到回收站
 * @param projectId 项目id
 */
export const addToRecycle = (projectId: string) => {
  return HttpRequest.post({
    url: ProjectApi.updateProject,
    data: {
      id: projectId,
      delFlag: 1,
    },
  });
};

/**
 * 删除项目（需要区分真删除和放入回收站）
 * @param projectId
 * @returns
 */
export const deleteProject = (projectId: string) => {
  return HttpRequest.delete(
    {
      url: ProjectApi.deleteProject,
      params: { projectId },
    },
    {
      joinParamsToUrl: true,
    }
  );
};
