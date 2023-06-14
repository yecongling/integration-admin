import React, {useState} from "react";
import {Button, Card, Col, Form, Input, InputNumber, Modal, Radio, Row, Select, Space, Switch, Table} from "antd";
import {
  QuestionCircleOutlined,
  SearchOutlined,
  SyncOutlined,
  FullscreenOutlined,
  CheckCircleOutlined, CloseCircleOutlined, SettingOutlined
} from "@ant-design/icons";
import {ColumnsType} from "antd/es/table";
import {Project} from "./Project";

const ProjectMaintain: React.FC = () => {
  const [searchForm] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [menuData] = Form.useForm();
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
  const addProject = () => {
    setOpen(true);
  }

  const handleAfterOpen = (open: boolean) => {

  }

  /**
   * 关闭弹窗
   */
  const onCancel = () => {
    setOpen(false);
  }

  const columns: ColumnsType<Project> = [
    {
      title: "运行状态",
      dataIndex: 'status',
      width: '5%',
      align: 'center',
      key: 'status',
      render: function (text, record, index) {
        return text === '1' ? <Switch checked/> : <Switch/>;
      }
    },
    {
      title: "警告",
      dataIndex: 'warning',
      width: '5%',
      align: 'center',
      key: 'warning',
      render: function (text, record, index) {
        return <QuestionCircleOutlined style={{color: text ? 'orange' : 'gray'}}/>;
      }
    },
    {
      title: "项目名称",
      dataIndex: 'projectName',
      width: '15%',
      align: 'left',
      key: 'projectName',
      sorter: true
    },
    {
      title: "优先级",
      dataIndex: 'level',
      width: '5%',
      align: 'left',
      key: 'level',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.level - b.level,
    },
    {
      title: "描述",
      dataIndex: 'description',
      width: '15%',
      align: 'left',
      key: 'description'
    },
    {
      title: "类型",
      dataIndex: 'type',
      width: '5%',
      align: 'center',
      key: 'type',
      render: function (text, record, index) {
        return <FullscreenOutlined/>;
      }
    },
    {
      title: "视图",
      dataIndex: 'chart',
      width: '5%',
      align: 'center',
      key: 'chart',
      render: function (text, record, index) {
        return <FullscreenOutlined/>;
      }
    },
    {
      title: "操作",
      dataIndex: 'opr',
      width: '10%',
      align: 'center',
      render: function (text, record, index) {
        return <Space size={8}>
          <a>编辑</a>
          <a type="link">复制</a>
          <a type="link">设计</a>
          <a type="link">转换</a>
        </Space>;
      }
    },
  ];

  const data: Project[] = [
    {
      key: '1234123',
      status: '1',
      warning: true,
      projectName: '测试项目',
      level: 5,
      description: '测试项目',
      type: 1,
      chart: 2
    },
    {
      key: '23423',
      status: '2',
      warning: false,
      projectName: 'HIS服务',
      level: 2,
      description: 'HIS服务',
      type: 2,
      chart: 1
    }
  ];

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
          scroll={{x: 1500, y: 300}}
          bordered
          size="middle"
          columns={columns}
          dataSource={data}
        />
      </Card>
      {/* 编辑弹窗 */}
      <Modal open={open}
             centered
             maskClosable={false}
             title="编辑项目"
             okText="确认"
             okButtonProps={{icon: <CheckCircleOutlined/>}}
             cancelButtonProps={{icon: <CloseCircleOutlined/>}}
             cancelText="取消"
             style={{top: '20px'}}
             width={800}
             onCancel={onCancel}
             afterOpenChange={handleAfterOpen}
             bodyStyle={{padding: '10px 40px'}}
      >
        <Form
          form={menuData}
          layout="horizontal"
          name="basic"
          size="middle"
          labelCol={{span: 5}}
          initialValues={{
            menu_type: 1,
            is_route: true,
            internal_or_external: true,
            sort: 1
          }}
        >
          <Form.Item name="projectName" label="项目名称" rules={[{required: true, message: '请输入项目名称'}]}>
            <Input placeholder="项目名称"/>
          </Form.Item>

        </Form>
      </Modal>
    </>
  );
}
export default ProjectMaintain;