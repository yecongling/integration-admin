import React, {useEffect, useRef, useState} from "react";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  InputRef,
  Layout,
  message,
  Modal,
  Popconfirm,
  Popover,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space,
  Switch,
  Table,
  TreeSelect
} from "antd";
import {ColumnsType} from "antd/es/table";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
  SettingOutlined
} from "@ant-design/icons";
import './menu.less';
import {
  addPermission,
  deletePermission,
  getAllPermission,
  getDirectoryPermission,
  updatePermission,
  validateFields
} from "@/services/system/permission/permission";
import {addIcon, handlePermission} from "@/utils/util.tsx";
import {Directory, permission, permissionResult} from "@/services/system/permission/menuModel";
import IconPicker from "@/components/menu/icon/IconPicker.tsx";

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
  const [showParent, setShow] = useState(true);
  // 上级菜单
  const [value, setValue] = useState<string>();
  // 表格数据
  const [tableData, setTableData] = useState<permission[]>([]);
  // 目录数据
  const [treeData, setTreeData] = useState<Directory[]>([]);
  // 表格加载中
  const [loading, setLoading] = useState(false);
  const onChange = (newValue: string) => {
    setValue(newValue);
  };
  useEffect(() => {
    menuName.current && menuName.current.focus();
    getAllMenus();
  }, []);

  useEffect(() => {
    if (open) {
      getDirectory();
    }
  }, [open]);

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
   * 字段校验
   *
   * @param values
   */
  const validate = async (values: permission) => {
    try {
      const res = validateFields();
      if (res.success) {
        // 提交表单
        let result: permissionResult;
        if (values["id"]) {
          result = await updatePermission(values);
        } else {
          result = await addPermission(values);
        }
        if (result.code == 200) {
          message.success("保存成功");
          // 刷新
          getAllMenus();
          setOpen(false);
        }
      } else {
        form.setFields([
          {
            name: res.fieldName,
            errors: [res.message],
          },
        ]);
      }
    } catch (err) {
      return;
    }
  };


  /**
   * 菜单类型变换
   * @param e
   */
  const changeMenuType = (e: RadioChangeEvent) => {
    if (e.target.value === 0) {
      setShow(false);
      return;
    }
    setShow(true);
  }

  /**
   * 编辑
   * @param value
   */
  const edit = (value: any) => {
    menuData.setFieldsValue(value);
    if (value['menuType'] !== 0) {
      setShow(true);
    } else {
      setShow(false);
    }
    setOpen(true);
  }

  /**
   * 确定删除的回调
   */
  const confirm = async (value: any) => {
    const result = await deletePermission(value.id);
    if (result === 1) {
      message.success("删除成功");
      await getAllMenus();
    }
  }

  /**
   * 新增
   */
  const add = () => {
    menuData.resetFields();
    // 默认上级菜单显示（选中字菜单）
    setShow(true);
    setOpen(true);
  }

  /**
   * 关闭弹窗
   */
  const onCancel = () => {
    setOpen(false);
  }

  /**
   * 获取目录
   */
  const getDirectory = async () => {
    const result = await getDirectoryPermission();
    if (result) {
      const treeData: Directory[] = [...result.directory];
      setTreeData(treeData);
    }
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
        return text === 0 ? "一级菜单" : (text === 1 ? "子菜单" : "按钮");
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
        <Space size="small">
          <Button type="primary" size="small" onClick={() => edit(record)}>编辑</Button>
          <Popconfirm
            title="删除菜单"
            description="确定删除这条菜单数据吗?"
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

  const getAllMenus = async () => {
    setLoading(true);
    const formData = form.getFieldsValue();
    const result = await getAllPermission(formData);
    if (result) {
      const tableData: permission[] = [...result];
      // 处理数据，当children没有时不要这个节点
      handlePermission(tableData);
      setTableData(tableData);
    }
    setLoading(false);
  }

  return (
    <>
      {/* 查询区域 */}
      <Layout.Header className="layout-header-row">
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
                  {value: '2', label: '按钮'},
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
      </Layout.Header>
      <Layout.Content style={{marginTop: '6px'}}>
        <section className="layout-operation-bar">
          <Space>
            <Button type="primary" onClick={add}><PlusOutlined/>新增</Button>
          </Space>
        </section>
        <section className="integration-layout-content">
          <Table
            loading={{indicator: <LoadingOutlined style={{fontSize: 24}}/>, spinning: loading}}
            style={{marginTop: '6px'}}
            className="table"
            size="middle"
            scroll={{x: '100%', y: 'calc(100vh - 270px)'}}
            columns={columns}
            dataSource={tableData}
          />
        </section>
      </Layout.Content>
      {/* 编辑弹窗 */}
      <Modal open={open}
             centered
             maskClosable={false}
             title="编辑菜单数据"
             okText="确认"
             okButtonProps={{icon: <CheckCircleOutlined/>}}
             cancelButtonProps={{icon: <CloseCircleOutlined/>}}
             cancelText="取消"
             style={{top: '20px'}}
             width={800}
             onOk={() => {
               menuData.validateFields().then((values) => {
                 menuData.resetFields();
                 validate(values);
               });
             }}
             onCancel={onCancel}
             afterOpenChange={handleAfterOpen}
             styles={{body: {padding: '10px 40px'}}}
      >
        <Form
          form={menuData}
          layout="horizontal"
          name="basic"
          size="middle"
          labelCol={{span: 5}}
          initialValues={{
            menuType: 1,
            route: true,
            internalOrExternal: true,
            sortNo: 1
          }}
        >
          <Form.Item name="id" label="菜单ID" hidden>
            <Input placeholder="菜单ID"/>
          </Form.Item>
          <Form.Item name="menuType" label="菜单类型">
            <Radio.Group onChange={changeMenuType}>
              <Radio value={0}>一级菜单</Radio>
              <Radio value={1}>子菜单</Radio>
              <Radio value={2}>按钮</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="name" label="菜单名称" rules={[{required: true, message: '请输入菜单名称！'}]}>
            <Input ref={inputRef} allowClear placeholder="菜单名称"/>
          </Form.Item>
          {showParent &&
            <Form.Item name="parentId" label="上级菜单" rules={[{required: true, message: '请选择上级菜单！'}]}>
              <TreeSelect
                style={{width: '100%'}}
                value={value}
                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                treeData={treeData}
                placeholder="请选择"
                treeDefaultExpandAll
                onChange={onChange}
              />
            </Form.Item>}
          <Form.Item name="url" label="菜单路径" rules={[{required: true, message: '请输入菜单路径！'}]}>
            <Input allowClear placeholder="菜单路径"/>
          </Form.Item>
          <Form.Item name="component" label="前端组件">
            <Input allowClear placeholder="请输入前端组件"/>
          </Form.Item>
          <Form.Item name="icon" label="菜单图标">
            <Input allowClear
                   addonAfter={<Popover placement="bottomRight" trigger="click" arrow={false}
                                        content={<IconPicker/>}><SettingOutlined/></Popover>}/>
          </Form.Item>
          <Form.Item name="sortNo" label="序号">
            <InputNumber/>
          </Form.Item>
          <Form.Item name="route" valuePropName="checked" label="是否路由菜单">
            <Switch checkedChildren="是" unCheckedChildren="否"/>
          </Form.Item>
          <Form.Item name="hidden" valuePropName="checked" label="隐藏路由">
            <Switch checkedChildren="是" unCheckedChildren="否"/>
          </Form.Item>
          <Form.Item name="internalOrExternal" valuePropName="checked" label="打开方式">
            <Switch checkedChildren="内部" unCheckedChildren="外部"/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Menu;