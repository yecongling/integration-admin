import React, {useEffect, useRef, useState} from "react";
import {
  Button,
  Card,
  Col, Dropdown,
  Form,
  Input,
  InputRef, MenuProps,
  message,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import {ColumnsType} from "antd/es/table";
import { DeleteOutlined, LoadingOutlined,
  PlusOutlined,
  SettingOutlined
} from "@ant-design/icons";
import './menu.less';
import {
  deletePermission,getMenus,
} from "@/apis/system/permission/menu.ts";
import {addIcon, handlePermission} from "@/utils/util.tsx";
import {permission} from "@/apis/system/permission/menuModel";
import {TableRowSelection} from "antd/es/table/interface";
import {MenuInfo} from "rc-menu/lib/interface";
import MenuModal from "./MenuModal";

/**
 * 菜单维护界面
 * @constructor
 */
const Menu: React.FC = () => {
  const [form] = Form.useForm();
  const [menuData] = Form.useForm();
  const inputRef = useRef<InputRef>(null);
  const menuName = useRef<InputRef>(null);
  const [open, setOpen] = useState(false);
  
  // 表格数据
  const [tableData, setTableData] = useState<permission[]>([]);
  // 表格加载中
  const [loading, setLoading] = useState(true);
  // 表格中选中的行
  const [selectRow, setSelectRow] = useState<permission[]>([]);

  // const [checkStrictly, setCheckStrictly] = useState<boolean>(false);

  useEffect(() => {
    menuName.current && menuName.current.focus();
    getAllMenus();
  }, []);


  /**
   * 检索菜单
   */
  const onFinish = () => {
    getAllMenus();
  }

  /**
   * 窗口打开关闭操作
   *
   * @param open
   */
  const handleAfterOpen = (open: boolean) => {
    if (open) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
      return;
    }
    if (menuName.current) {
      menuName.current.focus();
    }
  }

  /**
   * 编辑
   * @param value
   */
  const edit = (value: any) => {
    menuData.setFieldsValue(value);
    setOpen(true);
  }

  /**
   * 确定更改可用的回调
   */
  const confirm = async (value: any) => {
    const result = await deletePermission(value.id);
    if (result === 1) {
      message.success("修改成功");
      await getAllMenus();
    }
  }

  /**
   * 新增
   */
  const add = () => {
    menuData.resetFields();
    setOpen(true);
  }

  /**
   * 关闭弹窗
   */
  const onCancel = () => {
    setOpen(false);
  }

  const items: MenuProps['items'] = [
    {
      key: 'defaultPage',
      label: '设为默认首页',
      icon: <SettingOutlined/>,
    },
    {
      key: 'delete',
      label: '删除',
      icon: <DeleteOutlined/>
    }
  ]

  /**
   * 更多选项里的配置
   * @param e
   * @param param
   */
  const onClickMore = (e: MenuInfo, param: permission) => {
    console.log(e)
    console.log(param)
  }

  // 定义列
  const columns: ColumnsType<permission> = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      key: 'name',
      width: 140,
      ellipsis: true
    },
    {
      title: '菜单类型',
      dataIndex: 'menuType',
      key: 'menuType',
      width: 80,
      ellipsis: true,
      align: 'center',
      render: (text) => {
        return text === 0 ? "一级菜单" : (text === 1 ? "子菜单" : (text === 2 ? "子路由" : "按钮"));
      }
    },
    {
      title: '图标',
      dataIndex: 'icon',
      width: 80,
      key: 'icon',
      ellipsis: true,
      align: 'center',
      render: (text) => {
        return addIcon(text);
      }
    },
    {
      title: '组件',
      dataIndex: 'component',
      key: 'component',
      ellipsis: true,
      width: 120,
    },
    {
      title: '路径',
      dataIndex: 'url',
      ellipsis: true,
      key: 'url',
      width: 180,
    },
    {
      title: '排序',
      dataIndex: 'sortNo',
      ellipsis: true,
      key: 'sortNo',
      width: 80,
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'sort_no',
      key: 'operation',
      width: 180,
      fixed: 'right',
      align: 'center',
      render: (_text, record) => (
          <Space size={0}>
            <Button type="link" size="small" onClick={() => edit(record)}>编辑</Button>
            <Popconfirm
                title={record.delFlag === 1 ? "启用菜单" : "停用菜单"}
                description="确定更改这条菜单数据吗?"
                onConfirm={() => confirm(record)}
                okText="确认"
                cancelText="取消"
            >
              <Button type="link" size="small" danger>{record.delFlag === 1 ? "启用" : "停用"}</Button>
            </Popconfirm>
            <Dropdown menu={{items, onClick: (e) => onClickMore(e, record)}}>
              <Button type="link" size="small">更多</Button>
            </Dropdown>
          </Space>
      )
    },
  ];

  /**
   * 获取所有菜单
   */
  const getAllMenus = async () => {
    const formData = form.getFieldsValue();
    const result = await getMenus(formData);
    if (result) {
      const tableData: permission[] = [...result];
      // 处理数据，当children没有时不要这个节点
      handlePermission(tableData);
      setTableData(tableData);
    }
    setLoading(false);
  }

  // 定义可多选
  const rowSelection: TableRowSelection<permission> = {
    onChange: (_selectedRowKeys, selectedRows) => {
      setSelectRow(selectedRows);
    }
  }

  return (
      <>
        {/* 查询区域 */}
        <Card styles={{body: {height: '100%'}}} style={{marginBottom: '16px'}}>
          <Form form={form} onFinish={onFinish}>
            <Row gutter={24}>
              <Col span={5}>
                <Form.Item label="菜单名称" name="name" initialValue="" style={{marginBottom: 0}}>
                  <Input ref={menuName} allowClear autoComplete="false"/>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="菜单类型" name="menu_type" initialValue="-1" style={{marginBottom: 0}}>
                  <Select options={[
                    {value: '-1', label: '全部'},
                    {value: '0', label: '一级菜单'},
                    {value: '1', label: '字菜单'},
                    {value: '2', label: '子路由'},
                    {value: '3', label: '按钮（暂不支持）', disabled: true}
                  ]}/>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="显示" name="hidden" initialValue="-1" style={{marginBottom: 0}}>
                  <Select options={[
                    {value: '-1', label: '所有'},
                    {value: '0', label: '显示'},
                    {value: '1', label: '隐藏'}
                  ]}/>
                </Form.Item>
              </Col>
              <Col span={9}>
                <Button type="primary" htmlType="submit">查询</Button>
                <Button htmlType="reset" style={{margin: '0 8px'}}>重置</Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card>
          <section style={{marginBottom: '16px'}}>
            <Space>
              <Button type="primary" onClick={add}><PlusOutlined/>新增</Button>
              <Button type="primary" disabled={selectRow.length == 0} danger onClick={() => {
              }}><DeleteOutlined/>批量操作</Button>
            </Space>
          </section>
          <section>
            <Table
                loading={{indicator: <LoadingOutlined style={{fontSize: 24}}/>, spinning: loading}}
                rowSelection={{...rowSelection, checkStrictly: false}}
                style={{marginTop: '6px'}}
                className="table"
                size="middle"
                pagination={false}
                scroll={{x: '100%', y: 'calc(100vh - 310px)'}}
                columns={columns}
                dataSource={tableData}
            />
          </section>
        </Card>
        {/* 编辑弹窗 */}
        <MenuModal setOpen={setOpen} menuData={menuData} open={open} onCancel={onCancel} afterOpenChange={handleAfterOpen}/>
      </>
  )
}

export default Menu;