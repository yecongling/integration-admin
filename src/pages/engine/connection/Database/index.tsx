import React, {useEffect, useRef, useState} from "react";
import {Button, Card, Col, Form, Input, InputRef, Modal, Popconfirm, Row, Select, Space, Table} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoginOutlined,
  LogoutOutlined,
  PlusOutlined,
  SearchOutlined,
  SyncOutlined
} from "@ant-design/icons";
import {ColumnsType} from "antd/es/table";
import TextArea from "antd/es/input/TextArea";
import {DataType} from "@/pages/engine/connection/Database/DataType.ts";
import {getDatasource} from "@/apis/engine/project/connection/database/datasource";

const Database: React.FC = () => {

  const [form] = Form.useForm();
  const [data] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [dbSource, setDbSource] = useState<DataType[]>([]);
  const [title, setTitle] = useState('新增数据源');
  const inputRef = useRef<InputRef>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const handleAfterOpen = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  useEffect(() => {
    getDbSource({}).then((res) => {
      setDbSource(res);
    });
  }, [])

  /**
   * 表单检索
   * @param value
   */
  const onFinish = (value: any) => {
    getDbSource(value).then((res) => {
      setDbSource(res);
    });
  }

  /**
   * 新增
   */
  const add = () => {
    setTitle('新增数据源');
    setOpen(true);
  }

  /**
   * 行选中改变事件
   * @param newSelectedRowKeys 选中行的key
   */
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  /**
   * 编辑
   *
   * @param value
   */
  const edit = (value: DataType) => {
    setTitle('编辑数据源');
    data.setFieldsValue(value);
    setOpen(true);
  }

  /**
   * 确定删除的回调
   */
  const confirm = async (value: any) => {
    console.log(value);
  }

  /**
   * 导出
   */
  const exportExcel = () => {
    alert("导出");
  }

  /**
   * 导入
   */
  const importExcel = () => {
    alert("导入")
  }

  /**
   * 测试数据库连接
   *
   * @param values
   */
  const testQuery = (values: DataType) => {
    alert("测试连接")
    console.log(values);
  }

  /**
   * 确认
   */
  const handleOk = (values: DataType) => {
    // 保存数据
    console.log(values);
    // 更新表格数据
    setOpen(false);
    const param = form.getFieldsValue();
    getDbSource(param).then((res) => {
      setDbSource(res);
    });
  }

  /**
   * 取消
   */
  const handCancel = () => {
    data.resetFields();
    setOpen(false);
  }

  /**
   * 行选中
   */
  const rowSelection = {
    fixed: true,
    selectedRowKeys,
    onChange: onSelectChange,
  }

  /**
   * 获取数据
   * @param param
   */
  const getDbSource = async (param: any) => {
    return await getDatasource(param);
  }

  // 定义列
  const columns: ColumnsType<DataType> = [
    {
      title: '数据源名称',
      dataIndex: 'name',
      width: '120px',
      align: 'center'
    },
    {
      title: '数据库类型',
      dataIndex: 'datasourceType',
      width: '120px',
      align: 'center',
      render: (text) => {
        switch (text?.datasourceType) {
          case '1':
            return 'MySQL5.5';
          default:
            return 'SqlServer';
        }
      }
    },
    {
      title: '测试SQL',
      dataIndex: 'testQuery',
      width: '180px',
      align: 'center'
    },
    {
      title: '连接地址',
      dataIndex: 'url',
      width: '240px',
      align: 'center'
    },
    {
      title: '用户名',
      dataIndex: 'username',
      width: '80px',
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '120px',
      align: 'center',
      render: (_text, record) => (
        <Space size="small">
          <Button type="primary" size="small" onClick={() => edit(record)}>编辑</Button>
          <Popconfirm
            title="删除数据库资源"
            description="确定删除这条数据吗?"
            onConfirm={() => confirm(record)}
            okText="确认"
            cancelText="取消"
          >
            <Button type="primary" size="small" danger>删除</Button>
          </Popconfirm>
        </Space>
      )
    },
  ];

  return (
    <>
      {/* 查询区域 */}
      <Card styles={{body: {height: '100%'}}} style={{marginBottom: '16px'}}>
        <Form form={form} onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item label="数据源名称" name="name" initialValue="" style={{marginBottom: 0}}>
                <Input autoFocus autoComplete="false"/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="数据库类型" name="databaseType" initialValue="0"
                         style={{marginBottom: 0}}>
                <Select options={[
                  {value: '0', label: '请选择……'},
                  {value: '1', label: 'MySQL5.5'},
                  {value: '2', label: 'MySQL5.7+'},
                  {value: '3', label: 'Oracle'},
                  {value: '4', label: 'SqlServer'},
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
      <Card>
        <section className="layout-operation-bar">
          <Space>
            <Button type="primary" onClick={add}><PlusOutlined/>新增</Button>
            <Button type="primary" onClick={importExcel}><LoginOutlined/>导入</Button>
            <Button type="primary" onClick={exportExcel}><LogoutOutlined/>导出</Button>
          </Space>
        </section>
        <section className="integration-layout-content">
          <Table
            style={{marginTop: '6px'}}
            scroll={{x: '100', y: 'calc(100vh - 270px)'}}
            size="middle"
            pagination={{
              showQuickJumper: true,
              showSizeChanger: true,
              defaultPageSize: 25,
              total: 1,
              showTotal: (total) => `共 ${total} 条`
            }}
            columns={columns}
            dataSource={dbSource}
            rowSelection={rowSelection}
            rowKey={record => record.id}
          />
        </section>
      </Card>
      {/* 编辑弹窗 */}
      <Modal open={open}
             centered
             maskClosable={false}
             title={title}
             okText="确认"
             okButtonProps={{icon: <CheckCircleOutlined/>}}
             cancelButtonProps={{icon: <CloseCircleOutlined/>}}
             cancelText="取消"
             onOk={() => {
               data.validateFields().then((values) => {
                 data.resetFields();
                 handleOk(values);
               });
             }}
             style={{top: '20px'}}
             onCancel={handCancel}
             afterOpenChange={handleAfterOpen}
             width={1000}
             styles={{body: {padding: '10px 40px', height: '600px', overflowY: 'auto'}}}
      >
        <Form
          form={data}
          layout="horizontal"
          name="basic"
          size="middle"
          labelCol={{span: 4}}
          initialValues={{
            datasourceType: '2',
            connectionTimeout: 30,
            idleTimeout: 600,
            maxLifetime: 1800,
            maxPoolSize: 30,
            minIdle: 3
          }}
        >
          <Form.Item name="id" hidden>
            <Input/>
          </Form.Item>
          <Form.Item name="name" label="数据源名称" extra="数据源名称必须是唯一的"
                     rules={[{required: true, message: '请输入数据源名称'}]}>
            <Input ref={inputRef}/>
          </Form.Item>
          <Form.Item name="datasourceType" label="数据库类型" extra="数据源的类型"
                     rules={[{required: true, message: '请选择数据库类型'}]}>
            <Select options={[
              {value: '1', label: 'MySQL5.5'},
              {value: '2', label: 'MySQL5.7+'},
              {value: '3', label: 'Oracle'},
              {value: '4', label: 'SqlServer'},
            ]}/>
          </Form.Item>
          <Form.Item name="url" label="数据源地址" extra="数据源连接字符串"
                     rules={[{required: true, message: '请输入数据源地址'}]}>
            <Input/>
          </Form.Item>
          <Form.Item name="testQuery" label="测试语句" extra="测试数据库状态的语句"
                     rules={[{required: true, message: '测试语句'}]}>
            <Input/>
          </Form.Item>
          <Form.Item name="username" label="用户名" extra="数据源用户名"
                     rules={[{required: true, message: '请输入用户名'}]}>
            <Input/>
          </Form.Item>
          <Form.Item label="密码">
            <Form.Item name="password" style={{
              width: 'calc(100% - 96px)',
              display: 'inline-block',
              marginBottom: '0',
              marginRight: '6px'
            }}
                       rules={[{required: true, message: '请输入密码'}]}>
              <Input.Password placeholder="请输入密码"
                              iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}/>
            </Form.Item>
            <Form.Item style={{width: '90px', display: 'inline-block', marginBottom: '0'}}>
              <Button type="primary" onClick={() => data.validateFields().then((values) => {
                testQuery(values);
              })}>测试连接</Button>
            </Form.Item>
          </Form.Item>
          <Form.Item name="description" label="描述">
            <TextArea rows={4}/>
          </Form.Item>
          {/* 数据源连接池配置 */}
          <Form.Item label="连接超时时间" extra="等待数据库连接可用的最长时间（秒）" name="connectionTimeout">
            <Input/>
          </Form.Item>
          <Form.Item label="闲置超时时间"
                     extra="连接池中数据库连接允许的最长闲置时间（秒），设为0使得该连接永远不会被移除"
                     name="idleTimeout">
            <Input/>
          </Form.Item>
          <Form.Item label="连接存活时间" extra="" name="maxLifetime">
            <Input/>
          </Form.Item>
          <Form.Item label="最小闲置连接数量" name="minIdle">
            <Input/>
          </Form.Item>
          <Form.Item label="最大连接池数量" name="maxPoolSize">
            <Input/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default Database;