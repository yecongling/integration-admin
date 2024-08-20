import { EndpointType } from "@/services/project/endpointType/endpointTypeModel";
import { Card, Input, Table, Tag } from "antd";
import type { TableProps } from "antd";
import React, { useEffect, useState } from "react";
import { useEndpointContext } from "../Endpoint/endpointState";
import { getEndpointTypes } from "@/services/project/endpointType/endpointTypeApi";
import { addKeyToData } from "@/utils/utils";
const { Search } = Input;
/**
 * 端点类型表格
 */
const EndpointTypeTable: React.FC = () => {
  // 获取全局的状态
  const { dispatch } = useEndpointContext();

  const [selectedRowKey, setSelectedRowKey] = useState<React.Key | null>(null);

  const [types, setTypes] = useState<EndpointType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // 查询表格数据
    getTypes();
  }, []);

  /**
   * 获取类型数据
   * @param search 查询条件(通过端点类型名称检索的)
   */
  const getTypes = async (search?: string) => {
    setLoading(true);
    try {
      const types = await getEndpointTypes(search);
      // 数据添加key
      const transform = addKeyToData(types, "id");
      setTypes(transform);
    } finally {
      setLoading(false);
    }
  };

  // 定义表格列
  const columns: TableProps<EndpointType>["columns"] = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
      width: 80,
      align: "left",
      ellipsis: true,
    },
    {
      title: "支持模式",
      dataIndex: "supportedModes",
      key: "supportedModes",
      width: 80,
      align: "left",
      ellipsis: true,
    },
    {
      title: "所属分类",
      dataIndex: "parentId",
      key: "parentId",
      width: 120,
      align: "left",
      ellipsis: true,
      render(value) {
        switch (value) {
          case "1":
            return <>协议组件</>;
          case "2":
            return "文件系统";
          case "3":
            return "消息队列";
          case "4":
            return "数据库";
          case "5":
            return "云服务";
        }
      },
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      width: 80,
      align: "center",
      ellipsis: true,
      render: (text) => {
        if (text === 1) {
          return <Tag color="#87d068">正常</Tag>;
        }
        return <Tag color="#ddd">停用</Tag>;
      },
    },
  ];

  // 行点击事件
  const onRowClick = (record: EndpointType) => {
    setSelectedRowKey(record.id);
    dispatch({
      type: "SET_SELECTED_ROW",
      payload: [record],
    });
  };

  return (
    <Card style={{ height: "100%" }} styles={{ body: { height: "100%" } }}>
      <section style={{ marginBottom: "8px" }}>
        <Search
          autoFocus
          placeholder="请输入端点类型名进行检索"
          enterButton
          onSearch={getTypes}
        />
      </section>
      <section
        style={{
          height: "calc(100% - 48px)",
          display: "flex",
          flexDirection: "column",
          paddingTop: "8px",
        }}
      >
        <Table
          loading={loading}
          columns={columns}
          rowClassName={(record) =>
            record.id === selectedRowKey ? "ant-table-row-selected" : ""
          }
          onRow={(record) => ({
            onClick: () => onRowClick(record),
          })}
          bordered
          size="small"
          dataSource={types}
          scroll={{ x: true, y: "max-content" }}
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            defaultPageSize: 25,
            total: 1,
            showTotal: (total) => `共 ${total} 条`,
          }}
        />
      </section>
    </Card>
  );
};
export default EndpointTypeTable;
