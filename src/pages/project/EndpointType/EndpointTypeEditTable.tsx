import React, { useEffect, useState } from "react";
import { useEndpointTypeContext } from "./EndpointTypeState";
import { getEndpointTypeConfig } from "@/services/project/endpointType/endpointTypeApi";
import { addKeyToData } from "@/utils/utils";
import { EndpointTypeConfig } from "@/services/project/endpointType/endpointTypeModel";
import { Table, type TableProps } from "antd";

/**
 * 端点类型具体配置项（编辑表格配置）
 */
const EndpointTypeEditTable: React.FC = () => {
  const { state } = useEndpointTypeContext();
  const [configData, setConfigData] = useState<EndpointTypeConfig[]>([]);
  useEffect(() => {
    if (state.selectedRow.length > 0) {
      queryConfig();
    }
  }, state.selectedRow);

  /**
   * 查询配置数据
   */
  const queryConfig = async () => {
    // 获取选中行
    const { id } = state.selectedRow[0];
    const data = await getEndpointTypeConfig(id);
    // 给数据添加key
    const format = addKeyToData(data, "id");
    setConfigData(format);
  };

  // 定义表格的列
  const columns: TableProps<EndpointTypeConfig>["columns"] = [];

  return (
    <div style={{ flex: "1" }}>
      <div className="title" style={{ fontSize: "18px", fontWeight: "bold" }}>
        规则集
      </div>
      {/* 编辑表格 */}
      编辑表格
      <Table columns={columns} dataSource={configData} />
    </div>
  );
};
export default EndpointTypeEditTable;
