export interface EndpointTypeModel {
  /** 端点类型ID */
  id: string;
  /** 端点类型名称 */
  name: string;
  /** 端点类型描述 */
  description: string;
  /** 端点类型支持的模式 */
  supportModeList: string[];
}
