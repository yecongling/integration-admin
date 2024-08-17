import React from "react";
import { useEndpointContext } from "./endpointState";
import { EndpointModel } from "@/services/project/endpoint/endpointModel";
import { Button, Space, Table, Tag, Tooltip } from "antd";
import type { TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

/**
 * 端点表格
 */
const EndpointTable: React.FC = () => {
  // 获取全局的状态
  const { state, dispatch } = useEndpointContext();
  // 定义可多选
  const rowSelection: TableProps<EndpointModel>["rowSelection"] = {
    onChange: (_selectedRowKeys, selectedRows) => {
      dispatch({
        type: "SET_SELECTED_ROW",
        payload: selectedRows,
      });
    },
  };

  // 表格列配置
  const columns: TableProps<EndpointModel>["columns"] = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
      width: "10%",
      align: "left",
      ellipsis: true,
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      width: "8%",
      align: "center",
      ellipsis: true,
      render: (_, record) => {
        switch (record.status) {
          case 1:
            return <Tag color="#87d068">正常</Tag>;
          case 2:
            return (
              <Tooltip title="部分项目使用出现异常">
                <Tag color="orange">部分异常</Tag>
              </Tooltip>
            );
          case 3:
            return <Tag color="#f50">异常</Tag>;
          default:
            return "";
        }
      },
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
      width: "10%",
      align: "center",
      ellipsis: true,
    },
    {
      title: "模式",
      dataIndex: "mode",
      key: "mode",
      width: "10%",
      align: "center",
      ellipsis: true,
    },
    {
      title: "所属项目",
      dataIndex: "projectId",
      key: "projectId",
      width: "10%",
      align: "left",
      ellipsis: true,
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
      width: "20%",
      align: "left",
      ellipsis: true,
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
      width: "120",
      align: "center",
      ellipsis: true,
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      width: "10%",
      align: "center",
      fixed: "right",
      ellipsis: true,
      render: (_, record) => (
        <Space>
          <Tooltip title="编辑">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => {
                dispatch({
                  type: "SET_OPEN_MODAL",
                  payload: true,
                });
                dispatch({
                  type: "SET_EDIT_TYPE",
                  payload: 2,
                });
                console.log("编辑的行数据是", record);
              }}
            />
          </Tooltip>
          <Tooltip title="删除">
            <Button danger type="link" icon={<DeleteOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];
  return (
    <>
      <section style={{ flex: 1 }}>
        <Table
          rowSelection={{ ...rowSelection, checkStrictly: false }}
          scroll={{ x: 100, y: "calc(100vh - 270px)" }}
          style={{ marginTop: "6px" }}
          size="small"
          bordered
          onRow={(record) => {
            return {
              onDoubleClick: () => {
                dispatch({
                  type: "SET_OPEN_MODAL",
                  payload: true,
                });
                dispatch({
                  type: "SET_EDIT_TYPE",
                  payload: 3,
                });
                console.log("双击的行数据是", record);
              },
            };
          }}
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            defaultPageSize: 25,
            total: 1,
            showTotal: (total) => `共 ${total} 条`,
          }}
          columns={columns}
          dataSource={state.endpoints}
        />
      </section>
    </>
  );
};
export default EndpointTable;
