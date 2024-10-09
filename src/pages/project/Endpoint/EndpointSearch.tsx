import React, { memo, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
} from "antd";
import { SearchOutlined, SyncOutlined } from "@ant-design/icons";
import { getProjects } from "@/services/project/design/designApi";

/**
 * 端点的检索
 */
const EndpointSearch: React.FC<EndpointSearchProps> = memo((props) => {
  const { queryEndpoints, form } = props;

  const [projects, setProjects] = useState<any[]>([]);

  // 初次加载获取数据 项目数据
  useEffect(() => {
    getProjects().then((projects) => {
      setProjects(
        projects.map((item) => ({
          label: item.projectName,
          value: item.id,
        }))
      );
    });
  }, []);

  return (
    <>
      <section style={{ marginBottom: "8px" }}>
        <Card styles={{ body: { height: "100%" } }}>
          <Form form={form} onFinish={queryEndpoints}>
            <Row gutter={24}>
              <Col span={6}>
                <Form.Item
                  label="端点名称"
                  name="name"
                  style={{ marginBottom: 0 }}
                >
                  <Input allowClear autoComplete="false" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="模式" name="mode" style={{ marginBottom: 0 }}>
                  <Select
                    allowClear
                    placeholder="请选择模式"
                    options={[
                      { value: "IN", label: "IN" },
                      { value: "IN_OUT", label: "IN_OUT" },
                      { value: "OUT", label: "OUT" },
                      { value: "OUT_IN", label: "OUT_IN" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="所属项目"
                  name="projectId"
                  style={{ marginBottom: 0 }}
                >
                  <Select
                    allowClear
                    placeholder="请选择所属项目"
                    notFoundContent="暂无项目数据"
                    // 这里是去查询项目表的数据
                    options={projects}
                  />
                </Form.Item>
              </Col>

              <Col span={6} style={{ textAlign: "end" }}>
                <Button type="primary" htmlType="submit">
                  <SearchOutlined />
                  查询
                </Button>
                <Button htmlType="reset" style={{ margin: "0 8px" }}>
                  <SyncOutlined />
                  重置
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </section>
    </>
  );
});
export default EndpointSearch;

// 属性
export interface EndpointSearchProps {
  queryEndpoints: (values: any) => void;
  form: FormInstance;
}
