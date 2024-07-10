import { Card, Col, Row, Input, Table } from "antd";
import React, { useState } from "react";
import { ColumnsType } from "antd/es/table";
import { DataSourceType, EndpointTypeModel } from "./endpointType";
import type { ProColumns } from "@ant-design/pro-components";
import { EditableProTable } from "@ant-design/pro-components";

const { Search } = Input;
import "./index.less";


const EndpointType: React.FC = () => {
  /**
   * 类型表格列
   */
  const typeTableColumn: ColumnsType<EndpointTypeModel> = [
    {
      title: "id",
      dataIndex: "id",
      hidden: true,
    },
    {
      title: "名称",
      dataIndex: "name",
      width: "40%",
      align: "left",
    },
    {
      title: "支持模式",
      dataIndex: "supportMode",
      width: "60%",
      align: "left"
    }
  ];

  // 编辑列
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  // 属性表格数据
  const [properties, setProperties] = useState<readonly DataSourceType[]>([
    {
      id: '624748504',
      name: '活动名称一',
      type: "open",
      state: 'open',
      create_time: "",
      update_time: "",
    },
    {
      id: '624691229',
      name: '活动名称二',
      state: 'closed',
      create_time: "1590481162000",
      update_time: "1590481162000",
    },
  ]);

  // 属性表格列
  const propertiesColumns: ProColumns<DataSourceType>[] = [
    {
      title: "属性名称",
      dataIndex: "name",
      formItemProps: () => {
        return {
          rules: [{ required: true, message: "属性名称必填" }]
        }
      },
    },
    {
      title: "属性类型",
      dataIndex: "type",
      valueType: "select",
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
        },
      },
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
        },
      },
    },

    {
      title: '活动时间',
      dataIndex: 'created_at',
      valueType: 'date',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (_text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => { }}
        >
          删除
        </a>,
      ],
    },
  ]

  /**
   * 检索功能
   * @param params 检索参数
   */
  const onSearch = (params: any) => {
    console.log(params);
  };
  return (
    <Row gutter={8} style={{ height: "100%" }}>
      {/* 左边表格布局 */}
      <Col span={6}>
        <Card style={{ height: "100%" }} styles={{ body: { height: "100%", padding: '24px 24px 0 24px' } }}>
          <section style={{ marginBottom: "16px" }}>
            <Search
              autoFocus
              placeholder="请输入端点类型名或支持模式进行检索"
              onSearch={onSearch}
              enterButton
            />
          </section>
          <section style={{ height: "calc(100% - 48px)", display: "flex", flexDirection: "column" }}>
            <Table
              bordered
              className="endpointTypeTable"
              scroll={{ x: "100", y: "calc(100vh - 240px)" }}
              style={{ marginTop: "6px", height: '100%' }}
              size="middle"
              pagination={{
                showQuickJumper: true,
                showSizeChanger: true,
                defaultPageSize: 25,
                total: 1,
                showTotal: (total) => `共 ${total} 条`,
              }}
              columns={typeTableColumn}
            />
          </section>
        </Card>
      </Col>
      {/* 右边表单布局 */}
      <Col span={18}>
        <Card style={{ height: "250px" }} styles={{ body: { height: "100%" } }}>
          基础配置，名称-类型
        </Card>
        <Card
          style={{ height: "calc(100% - 256px)", marginTop: "6px" }}
          styles={{ body: { height: "100%", padding: "0"} }}
        >
          <EditableProTable<DataSourceType>
            rowKey="id"
            bordered
            headerTitle="端点类型属性"
            maxLength={5}
            scroll={{ x: 960 }}
            loading={false}
            value={properties}
            columns={propertiesColumns}
            onChange={setProperties}
            editable={{
              type: "multiple",
              editableKeys,
              onSave: async (rowKey, data, row) => {
                console.log(rowKey, data, row);
              },
              onChange: setEditableRowKeys
            }}
            recordCreatorProps={
              {
                position: "bottom",
                record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
              }
            }
          />
        </Card>
      </Col>
    </Row>
  );
};
export default EndpointType;
