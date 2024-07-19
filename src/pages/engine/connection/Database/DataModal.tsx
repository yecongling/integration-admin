import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Button, Form, Input, Layout, Modal, ModalProps, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { DataType } from "./DataType";

const { Sider, Content } = Layout;

/**
 * 数据库编辑弹窗
 */
const DataModal: React.FC<DataModalProps & ModalProps> = (
  props: DataModalProps & ModalProps
) => {
  const { data } = props;

  console.log("弹窗渲染");

  /**
   * 测试数据库连接
   *
   * @param values
   */
  const testQuery = (values: DataType) => {
    alert("测试连接");
    console.log(values);
  };

  return (
    <Modal
      centered
      maskClosable={false}
      okButtonProps={{ icon: <CheckCircleOutlined /> }}
      cancelButtonProps={{ icon: <CloseCircleOutlined /> }}
      cancelText="取消"
      width={1000}
      style={{ top: "20px" }}
      styles={{
        body: { height: "600px", overflow: "hidden" },
      }}
      {...props}
    >
      <Layout style={{ height: "100%" }}>
        <Sider theme="light" style={{ overflowY: "scroll" }}>
          数据库类型
        </Sider>
        <Content
          style={{ background: "#fff", height: "100%", overflowY: "scroll" }}
        >
          <Form
            form={data}
            layout="horizontal"
            name="basic"
            size="middle"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 18 }}
            initialValues={{
              datasourceType: "2",
              connectionTimeout: 30,
              idleTimeout: 600,
              maxLifetime: 1800,
              maxPoolSize: 30,
              minIdle: 3,
            }}
          >
            <Form.Item name="id" hidden>
              <Input />
            </Form.Item>
            <Form.Item
              name="name"
              label="数据源名称"
              extra="数据源名称必须是唯一的"
              rules={[{ required: true, message: "请输入数据源名称" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="datasourceType"
              label="数据库类型"
              extra="数据源的类型"
              rules={[{ required: true, message: "请选择数据库类型" }]}
            >
              <Select
                options={[
                  { value: "1", label: "MySQL5.5" },
                  { value: "2", label: "MySQL5.7+" },
                  { value: "3", label: "Oracle" },
                  { value: "4", label: "SqlServer" },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="url"
              label="数据源地址"
              extra="数据源连接字符串"
              rules={[{ required: true, message: "请输入数据源地址" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="testQuery"
              label="测试语句"
              extra="测试数据库状态的语句"
              rules={[{ required: true, message: "测试语句" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="username"
              label="用户名"
              extra="数据源用户名"
              rules={[{ required: true, message: "请输入用户名" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="密码">
              <Form.Item
                name="password"
                style={{
                  width: "calc(100% - 96px)",
                  display: "inline-block",
                  marginBottom: "0",
                  marginRight: "6px",
                }}
                rules={[{ required: true, message: "请输入密码" }]}
              >
                <Input.Password
                  placeholder="请输入密码"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
              <Form.Item
                style={{
                  width: "90px",
                  display: "inline-block",
                  marginBottom: "0",
                }}
              >
                <Button
                  type="primary"
                  onClick={() =>
                    data.validateFields().then((values: any) => {
                      testQuery(values);
                    })
                  }
                >
                  测试连接
                </Button>
              </Form.Item>
            </Form.Item>
            <Form.Item name="description" label="描述">
              <TextArea rows={4} />
            </Form.Item>
            {/* 数据源连接池配置 */}
            <Form.Item
              label="连接超时时间"
              extra="等待数据库连接可用的最长时间（秒）"
              name="connectionTimeout"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="闲置超时时间"
              extra="连接池中数据库连接允许的最长闲置时间（秒），设为0使得该连接永远不会被移除"
              name="idleTimeout"
            >
              <Input />
            </Form.Item>
            <Form.Item label="连接存活时间" extra="" name="maxLifetime">
              <Input />
            </Form.Item>
            <Form.Item label="最小闲置连接数量" name="minIdle">
              <Input />
            </Form.Item>
            <Form.Item label="最大连接池数量" name="maxPoolSize">
              <Input />
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    </Modal>
  );
};
export default DataModal;

export type DataModalProps = {
  data?: any;
};
