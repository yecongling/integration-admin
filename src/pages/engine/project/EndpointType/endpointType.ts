import React from "react";

export interface EndpointTypeModel {
  /** 端点类型ID */
  id: string;
  /** 端点类型名称 */
  name: string;
  /** 端点类型描述 */
  description: string;
  /** 端点类型支持的模式 */
  supportModeList: string[];
  // 支持的模式
  supportMode: string;
}

export type DataSourceType = {
  id: React.Key;
  name?: string;
  type?: string;
  readonly?: string;
  desc?: string;
  state?: string;
  create_time?: string;
  update_time?: string;
}