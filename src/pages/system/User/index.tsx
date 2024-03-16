import React, {useEffect, useRef, useState} from "react";
import {Button, Card, Col, Form, Input, InputRef, Row, Select, Space, Table} from "antd";
import {UserModel} from "@/services/system/user/userModel.ts";
import {getAllUser} from "@/services/system/user/user.ts";
import {ColumnsType} from "antd/es/table";
import {PlusOutlined, SearchOutlined, SyncOutlined} from "@ant-design/icons";

/**
 * 用户管理模块
 * @constructor
 */
const User: React.FC = () => {
  const [form] = Form.useForm();
  const focusInput = useRef<InputRef>(null);
  const [tableData, setTableData] = useState<UserModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // 初始时加载用户数据
  useEffect(() => {
    onSearch(form.getFieldsValue()).then((result) => {
      setTableData(result);
      setLoading(false);
    });
  }, [form]);

  /**
   * 检索
   * @param value
   */
  const finishSearch = (value: any) => {
    onSearch(value).then((result) => {
      setTableData(result);
      setLoading(false);
    });
  }

  /**
   * 检索，用于首次加载或者后续检索
   * @param {any} value
   */
  const onSearch = async (value: any) => {
    return await getAllUser(value);
  }

  /**
   * 定义表格列
   */
  const columns: ColumnsType<UserModel> = []

  return (
    <>
      {/* 查询区域 */}
      <Card styles={{body: {height: '100%'}}} style={{marginBottom: '16px'}}>
        <Form form={form} onFinish={finishSearch}>
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item label="用户名" name="username" style={{marginBottom: 0}}>
                <Input ref={focusInput} autoFocus allowClear autoComplete="false"/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="性别" name="sex" style={{marginBottom: 0}}>
                <Select options={[
                  {value: '1', label: '男'},
                  {value: '2', label: '女'},
                  {value: '3', label: '未说明的性别'},
                ]}/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="状态" name="status" style={{marginBottom: 0}}>
                <Select options={[
                  {value: '1', label: '冻结'},
                  {value: '2', label: '正常'}
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
      {/* 功能按钮区和展示表格 */}
      <Card>
        <section style={{marginBottom: '16px'}}>
          <Space wrap>
            <Button type="primary" onClick={() => {
              alert('新增用户')
            }} icon={<PlusOutlined/>}>新增</Button>
          </Space>
        </section>
        <section>
          <Table
            loading={loading}
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
            dataSource={tableData}
          />
        </section>
      </Card>
    </>
  )
}
export default User;