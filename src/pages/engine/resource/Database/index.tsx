import React from "react";
import {Button, Col, Form, Input, Layout, Popconfirm, Row, Select, Space, Table} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {ColumnsType} from "antd/es/table";
import {permission} from "@/services/system/permission/menuModel.ts";
import {addIcon} from "@/utils/util.tsx";

const Database: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = () => {

  }

  const edit = (value: any) => {
    console.log(value)
  }


  // 定义列
  const columns: ColumnsType<permission> = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      key: 'name',
      width: '140px'
    },
    {
      title: '菜单类型',
      dataIndex: 'menuType',
      key: 'menuType',
      width: '80px',
      align: 'center',
      render: (text) => {
        return text === 0 ? "一级菜单" : (text === 1 ? "子菜单" : "按钮");
      }
    },
    {
      title: '图标',
      dataIndex: 'icon',
      width: '80px',
      key: 'icon',
      align: 'center',
      render: (text) => {
        return addIcon(text);
      }
    },
    {
      title: '组件',
      dataIndex: 'component',
      key: 'component',
      width: '120px',
    },
    {
      title: '路径',
      dataIndex: 'url',
      key: 'url',
      width: '180px',
    },
    {
      title: '排序',
      dataIndex: 'sortNo',
      key: 'sortNo',
      width: '80px',
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'sort_no',
      key: 'operation',
      width: '180px',
      align: 'center',
      render: (_text, record) => (
        <Space size="small">
          <Button type="primary" size="small" onClick={() => edit(record)}>编辑</Button>
          <Popconfirm
            title="删除菜单"
            description="确定删除这条菜单数据吗?"
            onConfirm={() => alert("删除数据")}
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
      <Layout.Header className="layout-header-row">
        <Form form={form} onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={5}>
              <Form.Item label="菜单名称" name="name" initialValue="" style={{marginBottom: 0}}>
                <Input allowClear autoComplete="false"/>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item label="菜单类型" name="menu_type" initialValue="-1" style={{marginBottom: 0}}>
                <Select options={[
                  {value: '-1', label: '全部'},
                  {value: '0', label: '一级菜单'},
                  {value: '1', label: '字菜单'},
                  {value: '2', label: '按钮'},
                ]}/>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item label="显示" name="show" initialValue="-1" style={{marginBottom: 0}}>
                <Select options={[
                  {value: '-1', label: '所有'},
                  {value: '1', label: '显示'},
                  {value: '0', label: '隐藏'}
                ]}/>
              </Form.Item>
            </Col>
            <Col span={9}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button htmlType="reset" style={{margin: '0 8px'}}>重置</Button>
            </Col>
          </Row>
        </Form>
      </Layout.Header>
      <Layout.Content style={{marginTop: '6px'}}>
        <section className="layout-operation-bar">
          <Space>
            <Button type="primary"><PlusOutlined/>新增</Button>
          </Space>
        </section>
        <section className="integration-layout-content">
          <Table
            style={{marginTop: '6px'}}
            className="table"
            size="middle"
            columns={columns}
          />
        </section>
      </Layout.Content>
    </>
  );
}
export default Database;