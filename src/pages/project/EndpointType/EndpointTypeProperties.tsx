import { Col, Divider, Form, Input, Row, Select } from "antd";
import React from "react";

/**
 * 端点类型基础配置（端点类型名称，描述）
 */
const EndpointTypeProperties: React.FC = () => {

  const [form] = Form.useForm();

  // 表单提交
  const onFinish = (value: any) => {
    console.log(value);
  }


  return (
    <>
      <div className="title" style={{ fontSize: '18px', fontWeight: 'bold' }}>基础信息</div>
      <Divider style={{margin: "12px 0"}}/>
      <Form form={form} onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name={"name"} label="名称" labelCol={{span: 5}} rules={[{ required: true, message: "类型名称不能为空" }]}>
              <Input placeholder="请输入端点类型名称" allowClear />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="title" label="标题" labelCol={{span: 5}}>
              <Input placeholder="请输入端点类型标题" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="supportedMode" label="支持模式" labelCol={{span: 5}} rules={[{ required: true, message: "模式选项不能为空" }]}>
              <Select mode="multiple" placeholder="请选择支持模式" options={[{ label: '消费端', value: "consumer" }, { label: "生产端", value: "producer" }]} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="parentId" label="所属分类" labelCol={{span: 5}} rules={[{ required: true, message: "分类选项不能为空" }]}>
              <Select placeholder="请选择端点类型所属分类" options={[{ label: "协议组件(HTTP、SOAP等)", value: "1" }, {
                label: "文件系统", value: "2"
              }, { label: "消息队列", value: "3" }, { label: "数据库", value: "4" }, { label: "云服务", value: "5" }]} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default EndpointTypeProperties;