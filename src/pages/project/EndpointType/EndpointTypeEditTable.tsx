import React, { useEffect, useState } from "react";
import { useEndpointTypeContext } from "./EndpointTypeState";
import { getEndpointTypeConfig } from "@/services/project/endpointType/endpointTypeApi";
import { addKeyToData } from "@/utils/utils";
import { EndpointTypeConfig } from "@/services/project/endpointType/endpointTypeModel";
import { Divider } from "antd";
import { EditableProTable, type ProColumns } from "@ant-design/pro-components";
import "./endpointType.scss";

/**
 * 端点类型具体配置项（编辑表格配置）
 */
const EndpointTypeEditTable: React.FC = () => {
  const { state } = useEndpointTypeContext();
  const [configData, setConfigData] = useState<EndpointTypeConfig[]>([
    {
      id: "111",
      typeId: "222",
      name: "timeout",
      title: "超时配置",
      type: "input",
      defaultValue: "20",
      options: "无",
      validationRules: "{ required: 'true' }",
      appliesTo: "consumer",
      description: "用于对于外部请求或响应外部请求的超时时间",
    },
  ]);

  const [position] = useState<string>("bottom");

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
  const columns: ProColumns<EndpointTypeConfig>[] = [
    {
      key: "id",
      dataIndex: "id",
      hidden: true,
    },
    {
      key: "name",
      dataIndex: "name",
      title: "名称",
      width: 100,
      valueType: "text",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "配置name必填",
          },
        ],
      },
    },
    {
      key: "title",
      dataIndex: "title",
      title: "标题",
      width: 120,
      formItemProps: {
        rules: [
          {
            required: true,
            message: "配置name必填",
          },
        ],
      },
    },
    {
      key: "type",
      dataIndex: "type",
      title: "类型",
      align: "center",
      width: 80,
      valueType: "select",
      valueEnum: {
        input: {
          text: "输入框",
        },
        select: {
          text: "下拉框",
        },
        radio: {
          text: "单选",
        },
        checkbox: {
          text: "复选",
        },
        switch: {
          text: "开关",
        },
        date: {
          text: "日期",
        },
        datetime: {
          text: "日期时间",
        },
        inputNumber: {
          text: "数字输入框",
        },
        textarea: {
          text: "文本域",
        },
        password: {
          text: "密码框",
        },
      },
    },
    {
      key: "defaultValue",
      dataIndex: "defaultValue",
      title: "默认值",
      valueType: "text",
      width: 80,
    },
    {
      key: "options",
      dataIndex: "options",
      title: "配置项",
      valueType: "text",
      ellipsis: true,
      width: 120,
    },
    {
      key: "validationRules",
      dataIndex: "validationRules",
      valueType: "text",
      ellipsis: true,
      title: "验证规则",
      width: 120,
    },
    {
      key: "appliesTo",
      dataIndex: "appliesTo",
      title: "应用端",
      align: "center",
      valueType: "select",
      valueEnum: {
        consumer: {
          text: "消费端",
        },
        producer: {
          text: "生产端",
        },
      },
      width: 80,
    },
    {
      key: "description",
      dataIndex: "description",
      title: "描述",
      width: 180,
      valueType: "text",
      ellipsis: true,
    },
    {
      title: "操作",
      valueType: "option",
      key: "option",
      width: 80,
      align: "center",
      fixed: "right",
      render: (_text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a key="delete">删除</a>,
      ],
    },
  ];

  return (
    <div style={{ flex: "1" }}>
      <div className="title" style={{ fontSize: "18px", fontWeight: "bold" }}>
        规则集
      </div>
      <Divider style={{ margin: "12px 0" }} />
      {/* 编辑表格 */}
      <EditableProTable<EndpointTypeConfig>
        rowKey="id"
        cardProps={{ bodyStyle: { padding: 0 } }}
        columns={columns}
        bordered
        editable={{ type: "multiple", saveText: "确定" }}
        size="small"
        scroll={{ x: 1600, y: "max-content" }}
        request={() => {
          return Promise.resolve({
            data: configData,
            success: true,
          });
        }}
        recordCreatorProps={
          position !== "hidden"
            ? {
                position: position as "top",
                record: {
                  id: (Math.random() * 1000000).toFixed(0).toString(),
                  type: "text",
                  appliesTo: "producer",
                },
                creatorButtonText: "新增一条配置",
              }
            : false
        }
      />
    </div>
  );
};
export default EndpointTypeEditTable;
