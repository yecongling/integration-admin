/* 定义项目的字段类型 */
export interface Project {
  key: string;
  status: string;
  warning: boolean;
  projectName: string;
  level: number;
  description?: string;
  type: number;
  chart: number;
}