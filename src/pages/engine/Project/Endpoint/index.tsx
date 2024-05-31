import { DeleteOutlined, ExportOutlined, ImportOutlined, PlusOutlined, SearchOutlined, SyncOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputRef,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Endpoint } from "./Endpoint";
import { ColumnsType, TableRowSelection } from "antd/es/table/interface";
const Index: React.FC = ()=> {
  const [searchForm] = Form.useForm();
  const endpointName = useRef<InputRef>(null);

  // 表格数据
  const [endpointSource, setEndpointSource] = useState<Endpoint[]>([]);
  // 表格中选中的行
  const [selectRow, setSelectRow] = useState<Endpoint[]>([]);


  useEffect(() => {
    // 调用查询接口查询表格数据
  }, []);

  /**
   * 检索
   * @param values 检索条件
   */
  const finishSearch = (values: any) => {
    console.log(values);
  }

  // 定义可多选
  const rowSelection: TableRowSelection<Endpoint> = {
    onChange: (_selectedRowKeys, selectedRows) => {
      setSelectRow(selectedRows);
    }
  }

  // 定义列
  const columns: ColumnsType<Endpoint> = [
    {
      title: 'id',
      dataIndex: 'id',
      hidden: true
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 60,
      align: 'left',
      ellipsis: true
    },
    {
      title: '警告',
      dataIndex: 'warning',
      width: 60,
      align: 'left',
      ellipsis: true
    },
    {
      title: '名称',
      dataIndex: 'name',
      width: 120,
      align: 'left',
      ellipsis: true
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: 80,
      align: 'center',
      ellipsis: true
    },
    {
      title: '模式',
      dataIndex: 'mode',
      width: 80,
      align: 'center',
      ellipsis: true
    },
    {
      title: '所属项目',
      dataIndex: 'projectId',
      width: 160,
      align: 'left',
      ellipsis: true
    },
    {
      title: "描述",
      dataIndex: 'description',
      width: 220,
      align: 'left',
      ellipsis: true
    },
  ]

  return (
    <>
      {/* 查询区域 */}
      <Card styles={{body: {height: '100%'}}} style={{marginBottom: '16px'}}>
        <Form form={searchForm} onFinish={finishSearch} initialValues={{projectType: '-1'}}>
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item label="端点名称" name="name" style={{marginBottom: 0}}>
                <Input ref={endpointName} autoFocus allowClear autoComplete="false"/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="端点类型" name="type" style={{marginBottom: 0}}>
                <Input allowClear autoComplete="false"/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="模式" name="mode" style={{marginBottom: 0}}>
                <Select defaultValue="-1" options={[
                  {value: '-1', label: '请选择模式', disabled: true},
                  {value: '1', label: 'IN'},
                  {value: '2', label: 'IN_OUT'},
                  {value: '3', label: 'OUT'},
                  {value: '4', label: 'OUT_IN'}
                ]}/>
              </Form.Item>
            </Col>
            
            <Col span={6}>
              <Button type="primary" htmlType="submit"><SearchOutlined/>查询</Button>
              <Button htmlType="reset" style={{margin: '0 8px'}}><SyncOutlined/>重置</Button>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card>
        <section style={{marginBottom: '16px'}}>
          <Space wrap>
            <Button type="primary" onClick={() => {}} icon={<PlusOutlined/>}>新建</Button>
            <Button type="primary" onClick={()=>{alert('批量操作')}} icon={<DeleteOutlined style={{color: selectRow.length === 0 ? '#ccc' : 'red'}}/>} disabled={selectRow.length === 0}>批量操作</Button>
            <Button type="default" onClick={() => alert('导入')} icon={<ImportOutlined style={{color: 'orange'}}/>}>导入</Button>
            <Button type="default" onClick={() => alert('导出')} icon={<ExportOutlined style={{color: selectRow.length === 0 ? '#ccc' : 'red'}}/>} disabled={selectRow.length === 0}>导出</Button>
          </Space>
        </section>
        <section>
          <Table
            rowSelection={{...rowSelection, checkStrictly: false}}
            scroll={{x: '100', y: 'calc(100vh - 270px)'}}
            style={{marginTop: '6px'}}
            size="middle"
            pagination={{
              showQuickJumper: true,
              showSizeChanger: true,
              defaultPageSize: 25,
              total: 1,
              showTotal: (total) => `共 ${total} 条`
            }}
            columns={columns}
            dataSource={endpointSource}
          /></section>
      </Card>
    </>
  );
}
export default Index;