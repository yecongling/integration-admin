// 项目模型
export interface ProjectModel {
  key: string;
  id: string;
  status: string;
  warning: boolean;
  projectName: string;
  projectPriority: number;
  log?: number;
  description?: string;
  projectType: number;
  chart: number;
}
