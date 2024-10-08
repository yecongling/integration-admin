// 项目模型
export interface ProjectModel {
  id: string;
  status: string;
  projectName: string;
  projectPriority: number;
  logType: number;
  description?: string;
  projectType: number;
  delFlag: boolean;
}
