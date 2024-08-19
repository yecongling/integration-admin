/**
 * 定义端点类型
 */
export interface EndpointType {
  id: string;
  name: string;
  supportedModes: string;
  status: number;
  parentId: string;
  children?: EndpointType[];
}

/**
 * 端点类型配置
 */
export interface EndpointTypeConfig {
  id: string;
  typeId: string;
  name: string;
  title: string;
  description?: string;
  type: string;
  defaultValue?: string;
  options?: any[];
  validationRules?: Record<string, any>;
  appliesTo: "consumer" | "producer";
}
