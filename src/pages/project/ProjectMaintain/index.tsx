import React, {useRef, useState} from "react";
import {Button, Card, Col, Form, Input, Modal, Row, Select, Space, Switch, Table} from "antd";
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CompressOutlined,
  FullscreenOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  SyncOutlined
} from "@ant-design/icons";
import {ColumnsType} from "antd/es/table";
import {Project} from "./Project";
import "./index.less";

const ProjectMaintain: React.FC = () => {
  const [searchForm] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [projectType, setProjectType] = useState(false);
  const [editInfo, setEditInfo] = useState({title: '集成', opr: '创建新的', projectType: '1'});
  const [isEdit, setIsEdit] = useState(false);
  const [projectData] = Form.useForm();
  const projectName = useRef(null);
  const inputRef = useRef(null);
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
    setProjectType(true);
  }

  /**
   * 改变窗口
   * @param type
   */
  const changeModal = (type: string) => {
    switch (type) {
      // 接口项目
      case "1":
        setEditInfo((prevState) => ({...prevState, title: '接口', opr: '创建新的', projectType: '1'}));
        setOpen(true);
        setProjectType(false);
        projectData.resetFields();
        break;
      // 集成项目
      case "2":
        setEditInfo((prevState) => ({...prevState, title: '集成', opr: '创建新的', projectType: '2'}));
        setOpen(true);
        setProjectType(false);
        projectData.resetFields();
        break;
      case "3":
        setOpen(false);
        setProjectType(true);
        break
      default:
        break;
    }
    setIsEdit(false);
  }


  /**
   * 编辑项目
   */
  const editProject = (value: Project) => {
    projectData.setFieldsValue(value);
    setIsEdit(true);
    setEditInfo((prevState) => ({...prevState, title: '接口', opr: '编辑'}));
    setOpen(true);
  }

  /**
   * 窗口打开关闭
   * @param open
   */
  const handleAfterOpen = (open: boolean) => {
    if (open) {
      if (inputRef.current) {
        // @ts-ignore
        inputRef.current.focus();
      }
      return;
    }
    if (projectName.current) {
      //@ts-ignore
      projectName.current.focus();
    }
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
        return text === '1' ? <Switch defaultChecked/> : <Switch/>;
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
      width: '4%',
      align: 'left',
      key: 'level',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.level - b.level,
    },
    {
      title: "描述",
      dataIndex: 'description',
      width: '16%',
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
          <a onClick={() => editProject(record)}>编辑</a>
          <a type="link">复制</a>
          <a type="link">设计</a>
          <a type="link">转换</a>
        </Space>;
      }
    },
  ];

  const data: Project[] = [
    {
      id: '1234123',
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
      id: '23423',
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
                <Input ref={projectName} autoFocus allowClear autoComplete="false"/>
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

      {/* 选择项目类型 */}
      <Modal open={projectType}
             centered
             maskClosable={false}
             title="选择项目类型"
             width={600}
             footer={[
               <Button key="cancel" type="default" onClick={() => {
                 setProjectType(false)
               }}>取消</Button>
             ]}
      >
        <Row align="middle">
          <Col span={12} style={{textAlign: 'center', padding: '16px 6px'}} className="projectType"
               onClick={() => changeModal("2")}>
            <CompressOutlined style={{fontSize: '64px', color: '#5b5858'}}/>
            <h3>集成项目</h3>
            <span style={{color: '#989292', fontSize: '12px'}}>系统间消息集成，保证传输</span>
            <ul>
              <li>记录消息内容以及处理流程</li>
              <li>保证消息传输以及消息顺序</li>
              <li>支持消息重新处理</li>
              <li>终端和路由可单独开关</li>
              <li>终端可以在不同项目中复用</li>
            </ul>
          </Col>
          <Col span={12} style={{textAlign: 'center', padding: '16px 6px'}} className="projectType"
               onClick={() => changeModal("1")}>
            <FullscreenOutlined style={{fontSize: '64px', color: '#5b5858'}}/>
            <h3>接口项目</h3>
            <span style={{color: '#989292', fontSize: '12px'}}>高性能请求应答（request-response）模式</span>
            <ul>
              <li>高性能路由处理</li>
              <li>消息内容以及处理流程记录可选择性开关</li>
              <li>同步消息处理、支持事务</li>
              <li>终端及路由以项目味单位统一开关</li>
              <li>终端不可和其他项目共享</li>
            </ul>
          </Col>
        </Row>

      </Modal>
      {/* 编辑弹窗 */}
      <Modal open={open}
             centered
             maskClosable={false}
             title={<> {!isEdit && <Button size="middle" style={{marginRight: '12px'}} icon={<ArrowLeftOutlined/>}
                                           onClick={() => changeModal("3")}></Button>}
               <span className="title">{editInfo.opr}{editInfo.title}项目</span></>}
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
          form={projectData}
          layout="horizontal"
          name="basic"
          size="middle"
          labelCol={{span: 4}}
          initialValues={{
            level: '0',
            log: '1'
          }}
        >
          <Form.Item name="projectName" label="项目名称" rules={[{required: true, message: '请输入项目名称'}]}>
            <Input ref={inputRef} placeholder="项目名称"/>
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea rows={4} placeholder="描述"/>
          </Form.Item>
          {editInfo.projectType === '1' ?
            <Form.Item name="log" label="消息日志记录">
              <Select options={[
                {value: '1', label: '打开'},
                {value: '2', label: '关闭'},
                {value: '3', label: '仅在发生错误是记录'}
              ]}/>
            </Form.Item> : ''}
          <Form.Item name="level" label="优先级" rules={[{required: true, message: '请输入项目名称'}]}>
            <Select placeholder="项目名称" options={[
              {value: '0', label: '0'},
              {value: '1', label: '1'},
              {value: '2', label: '2'},
              {value: '3', label: '3'},
              {value: '4', label: '4'},
              {value: '5', label: '5'},
            ]}/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
export default ProjectMaintain;