import React from "react";
import {Button, Card, Col, Form, Input, Row, Select, Space, Table} from "antd";
import {SearchOutlined, SyncOutlined} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { Project } from "./Project";
const ProjectMaintain: React.FC = ()=> {
  const [searchForm] = Form.useForm();

  /**
   * 检索
   *
   * @param value
   */
  const onSearch = (value: any) => {

  }

  /**
   * 新增项目
   */
  const addProject = ()=> {

  }

  const columns: ColumnsType<Project> =[
    {
      title: "项目名称"
    }
  ];

  const data: Project[] = [];

  return (
    <>
    {/* 查询区域 */}
      <Card>
        <Form form={searchForm} onFinish={onSearch} initialValues={{type: '-1'}}>
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item label="项目名称" name="name" style={{marginBottom: 0}}>
                <Input autoFocus autoComplete="false"/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="项目类型" name="type" style={{marginBottom: 0}}>
                <Select options={[
                  {value: '-1', label: '请选择……'},
                  {value: '0', label: '集成项目'},
                  {value: '1', label: '接口项目'}
                ]}/>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Button type="primary" htmlType="submit"><SearchOutlined/>查询</Button>
              <Button htmlType="reset" style={{margin: '0 8px'}}><SyncOutlined/>重置</Button>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card style={{marginTop: '6px'}}>
        <Space>
          <Button type="primary" onClick={addProject}>新增项目</Button>
        </Space>
        <Table
          style={{marginTop: '6px'}}
          scroll={{ x: 1500, y: 300 }}
          bordered
          size="middle"
          columns={columns}
          dataSource={data}
        />
      </Card>
    </>
  );
}
export default ProjectMaintain;