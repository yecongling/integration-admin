import {
  DeleteOutlined,
  ExportOutlined,
  HomeOutlined,
  ImportOutlined,
  PlusOutlined,
  SearchOutlined,
  SyncOutlined
} from "@ant-design/icons";
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
  Table, Tooltip,
} from "antd";
import React, {useEffect, useRef, useState} from "react";
import {Endpoint} from "./Endpoint";
import {ColumnsType, TableRowSelection} from "antd/es/table/interface";
import { getEndpoints } from "@/apis/engine/project/endpoint/endpoint";
import EndpointModal from "./EndpointModal";

const Index: React.FC = () => {
  // 检索表单
  const [searchForm] = Form.useForm();
  // 弹窗需要的表单数据
  const [endpointData] = Form.useForm();
  const endpointName = useRef<InputRef>(null);

  // 窗口打开关闭
  const [open, setOpen] = useState<boolean>(false);
  // 表格数据
  const [endpointSource, setEndpointSource] = useState<Endpoint[]>([]);
  // 表格中选中的行
  const [selectRow, setSelectRow] = useState<Endpoint[]>([]);


  useEffect(() => {
    // 调用查询接口查询表格数据
    onSearch(searchForm.getFieldsValue()).then((result) => {
      setEndpointSource(result);
    })
  }, []);

  /**
   * 检索
   * @param values 检索条件
   */
  const onSearch = async (values: any) => {
    return await getEndpoints(values);
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

  /**
   * 新增
   */
  const onAdd = ()=> {
    setOpen(true);
  }

  return (
      <>
        {/* 查询区域 */}
        <Card styles={{body: {height: '100%'}}} style={{marginBottom: '16px'}}>
          <Form form={searchForm} onFinish={onSearch} initialValues={{projectType: '-1', mode: '-1'}}>
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
                  <Select options={[
                    {value: '-1', label: '请选择模式', disabled: true},
                    {value: 'IN', label: 'IN'},
                    {value: 'IN_OUT', label: 'IN_OUT'},
                    {value: 'OUT', label: 'OUT'},
                    {value: 'OUT_IN', label: 'OUT_IN'}
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
            <Row>
              <Col span={22}>
                <Space wrap>
                  <Button type="primary" onClick={onAdd} icon={<PlusOutlined/>}>新增</Button>
                  <Button type="primary" onClick={() => {
                    alert('批量操作')
                  }} icon={<DeleteOutlined style={{color: selectRow.length === 0 ? '#ccc' : 'red'}}/>}
                          disabled={selectRow.length === 0}>批量操作</Button>
                  <Button type="default" onClick={() => alert('导入')}
                          icon={<ImportOutlined style={{color: 'orange'}}/>}>导入</Button>
                  <Button type="default" onClick={() => alert('导出')}
                          icon={<ExportOutlined style={{color: selectRow.length === 0 ? '#ccc' : 'red'}}/>}
                          disabled={selectRow.length === 0}>导出</Button>
                </Space>
              </Col>
              <Col span={2} style={{textAlign: 'right'}}>
                <Tooltip title="回收站" color="blue" key="blue">
                  <Button type="primary" shape="circle" icon={<HomeOutlined/>} onClick={() => {alert('打开回收站')}}/>
                </Tooltip>
              </Col>
            </Row>
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
        {/* 编辑弹窗 */}
        <EndpointModal open={open} setOpen={setOpen} endpointData={endpointData}/>
      </>
  );
}
export default Index;