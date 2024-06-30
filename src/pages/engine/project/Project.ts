/* 定义项目的字段类型 */
export interface Project {
  key: string;
  id: string;
  status: string;
  warning: string;
  projectName: string;
  projectPriority: number;
  log?: number;
  description?: string;
  projectType: number;
  chart: number;
}