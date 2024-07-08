import React, {useRef} from 'react';
import {Button, Card, Col, Form, Input, InputRef, Row, Select, Space, Table} from "antd";
import {DeleteOutlined, PlusOutlined, SearchOutlined, SyncOutlined} from "@ant-design/icons";

const Role: React.FC = () => {
  const [form] = Form.useForm();
  const focusInput = useRef<InputRef>(null);

  /**
   * 检索
   * @param value
   */
  const finishSearch = (value: any) => {

  };
  return (
    <>
      {/* 查询区域 */}
      <Card
        styles={{body: {height: "100%"}}}
        style={{marginBottom: "16px"}}
      >
        <Form form={form} onFinish={finishSearch}>
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item
                label="角色名称"
                name="roleName"
                style={{marginBottom: 0}}
              >
                <Input
                  ref={focusInput}
                  autoFocus
                  allowClear
                  autoComplete="false"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="状态" name="status" style={{marginBottom: 0}}>
                <Select
                  placeholder="请选择"
                  options={[
                    {value: "1", label: "正常"},
                    {value: "0", label: "禁用"},
                  ]}
                />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Button type="primary" htmlType="submit">
                <SearchOutlined/>
                查询
              </Button>
              <Button htmlType="reset" style={{margin: "0 8px"}}>
                <SyncOutlined/>
                重置
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
      {/* 数据展示区域 */}
      <Card>
        <section style={{marginBottom: "16px"}}>
          <Space wrap>
            <Button type="primary" icon={<PlusOutlined/>}>
              新增
            </Button>
            <Button
              type="primary"
              disabled
              danger
              onClick={() => {
              }}
            >
              <DeleteOutlined/>
              批量操作
            </Button>
          </Space>
        </section>
        <section>
          <Table
            scroll={{x: "100", y: "calc(100vh - 270px)"}}
            style={{marginTop: "6px"}}
            size="middle"
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
    </>
  )
}
export default Role;