import { HttpRequest } from "@/utils/request";
import { ProjectModel } from "./projectModel";

export enum DesignApi {
  // 获取所有项目
  getProjects = "/project/design/getProjects",
}

/**
 * 查询所有项目信息
 * @returns 项目列表
 */
export const getProjects = (params?: any) => {
  return HttpRequest.get<ProjectModel[]>(
    { url: DesignApi.getProjects, params },
    { successMessageMode: "none" }
  );
};
