import React, { useEffect, useState } from "react";
import { useEndpointTypeContext } from "./EndpointTypeState";
import { getEndpointTypeConfig } from "@/services/project/endpointType/endpointTypeApi";
import { addKeyToData } from "@/utils/utils";
import { EndpointTypeConfig } from "@/services/project/endpointType/endpointTypeModel";
import { Divider, Table, type TableProps } from "antd";

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
  const columns: TableProps<EndpointTypeConfig>["columns"] = [
    {
      key: "id",
      dataIndex: "id",
      hidden: true
    },
    {
      key: "name",
      dataIndex: "name",
      title: "名称",
      width: "10%"
    },
    {
      key: "title",
      dataIndex: "title",
      title: "标题",
      width: "15%"
    },
    {
      key: "type",
      dataIndex: "type",
      title: "类型",
      align: "center",
      width: "15%"
    },
    {
      key: "defaultValue",
      dataIndex: "defaultValue",
      title: "默认值",
      width: "10%"
    },
    {
      key: "options",
      dataIndex: "options",
      title: "配置项",
      width: "15%"
    },
    {
      key: "validationRules",
      dataIndex: "validationRules",
      title: "验证规则",
      width: "15%"
    },
    {
      key: "appliesTo",
      dataIndex: "appliesTo",
      title: "应用端",
      align: "center",
      width: "10%"
    },
    {
      key: "description",
      dataIndex: "description",
      title: "描述",
      width: "20%"
    }
  ];

  return (
    <div style={{ flex: "1" }}>
      <div className="title" style={{ fontSize: "18px", fontWeight: "bold" }}>
        规则集
      </div>
      <Divider style={{ margin: "12px 0" }} />
      {/* 编辑表格 */}
      <Table
        columns={columns}
        dataSource={configData}
        bordered
        size="small"
        scroll={{ x: true, y: "max-content" }} />
    </div>
  );
};
export default EndpointTypeEditTable;
