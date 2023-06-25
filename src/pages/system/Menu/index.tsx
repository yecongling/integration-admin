import React, {useCallback, useEffect, useRef, useState} from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space,
  Switch,
  Table, TreeSelect
} from "antd";
import {ColumnsType} from "antd/es/table";
import * as Icons from "@ant-design/icons";
import {CheckCircleOutlined, CloseCircleOutlined, PlusOutlined, SettingOutlined} from "@ant-design/icons";
import './menu.less';
import {permission} from "@/services/system/model/menuModel";
import {addPermission, getAllPermission, validateFields} from "@/services/system/permission/permission";

/**
 * 菜单维护界面
 * @constructor
 */
const Menu: React.FC = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [showParent, setShow] = useState(false);
  const [menuData] = Form.useForm();
  const inputRef = useRef(null);
  const menuName = useRef(null);
  // 上级菜单
  const [value, setValue] = useState<string>();
  // 表格分页信息
  const [pageInfo, setPageInfo] = useState({page: 1, size: 10, total: 0});
  // 表格数据
  const [tableData, setTableData] = useState([]);
  const onChange = (newValue: string) => {
    setValue(newValue);
  };
  useEffect(() => {
    // @ts-ignore
    menuName.current && menuName.current.focus();
    pageChange(pageInfo.page, pageInfo.size);
  }, [])

  const menuType = [
    {label: '一级菜单', value: 1},
    {label: '子菜单', value: 2},
    {label: '按钮/权限', value: 3},
  ];
  const onFinish = (value: any) => {

  }

  const handleAfterOpen = (open: boolean) => {
    if (open) {
      if (inputRef.current) {
        // @ts-ignore
        inputRef.current.focus();
      }
      return;
    }
    if (menuName.current) {
      //@ts-ignore
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
      const res = await validateFields(values);
      if (res.success) {
        // 提交表单
      } else {
        form.setFields([
          {
            name: res.fieldName,
            errors: [res.msg],
          },
        ]);
      }
    } catch (err) {
      console.error(err);
    }
  };


  /**
   * 菜单类型变换
   * @param e
   */
  const changeMenuType = (e: RadioChangeEvent) => {
    if (e.target.value === 1) {
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
    setOpen(true);
  }

  /**
   * 删除
   * @param value
   */
  const del = (value: any) => {
    alert('删除')
  }

  /**
   * 新增
   */
  const add = () => {
    setOpen(true);
  }

  /**
   * 关闭弹窗
   */
  const onCancel = () => {
    setOpen(false);
  }

  const handleOk = async (values: permission) => {
    const result = await addPermission(values);

    debugger
  }

  interface menuType {
    key: React.ReactNode;
    name: string;
    menu_type: number;
    icon: string;
    component: string;
    url: string;
    sort_no: number;
    children?: menuType[];
  }

  // 动态渲染 Icon 图标
  const customIcons: { [key: string]: any } = Icons;
  const addIcon = (name: string) => {
    return React.createElement(customIcons[name]);
  };
  // 定义列
  const columns: ColumnsType<menuType> = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      key: 'name',
      width: '12%'
    },
    {
      title: '菜单类型',
      dataIndex: 'menuType',
      key: 'menuType',
      width: '5%',
      align: 'center',
      render: (text) => {
        return text === 0 ? "一级菜单" : (text === 1 ? "子菜单" : "按钮");
      }
    },
    {
      title: '图标',
      dataIndex: 'icon',
      width: '5%',
      key: 'icon',
      align: 'center',
      render: (text, record) => {
        return addIcon(text);
      }
    },
    {
      title: '组件',
      dataIndex: 'component',
      key: 'component',
      width: '12%',
    },
    {
      title: '路径',
      dataIndex: 'url',
      key: 'url',
      width: '12%',
    },
    {
      title: '排序',
      dataIndex: 'sortNo',
      key: 'sortNo',
      width: '5%',
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'sort_no',
      key: 'operation',
      width: '10%',
      align: 'center',
      render: (text, record) => (
        <Space size="small">
          <Button type="primary" size="small" onClick={() => edit(record)}>编辑</Button>
          <Button type="primary" size="small" danger onClick={() => del(record)}>删除</Button>
        </Space>
      )
    },
  ];

  /**
   * 换页
   */
  const pageChange = useCallback(
    (page: number, size: number) => {
      pageInfo.page = page;
      pageInfo.size = size;
      setPageInfo(pageInfo);
      getAllMenus();
    }, []
  )

  const getAllMenus = async () => {
    let formData = form.getFieldsValue();
    // let params = {pageInfo, formData};
    let params = Object.assign({}, pageInfo, formData);
    let result = await getAllPermission(params);
    // @ts-ignore
    if (result) {
      // @ts-ignore
      let tableData:[] = [...result.data];
      setTableData(tableData);
    }
  }

  const treeData = [
    {
      title: '系统管理',
      value: '0-0',
      children: [
        {
          title: '模块管理',
          value: '0-0-1',
        },
        {
          title: '项目管理',
          value: '0-0-2',
        },
      ],
    },
    {
      title: '监控中心',
      value: '0-1',
    },
  ];

  return (
    <>
      {/* 查询区域 */}
      <Card>
        <Form form={form} onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={4}>
              <Form.Item label="菜单名称" name="name" initialValue="" style={{marginBottom: 0}}>
                <Input ref={menuName} allowClear autoComplete="false"/>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="菜单类型" name="menu_type" initialValue="" style={{marginBottom: 0}}>
                <Input autoComplete="false" allowClear/>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="显示" name="show" initialValue="-1" style={{marginBottom: 0}}>
                <Select options={[
                  {value: '-1', label: '所有'},
                  {value: '1', label: '显示'},
                  {value: '0', label: '隐藏'}
                ]}/>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button htmlType="reset" style={{margin: '0 8px'}}>重置</Button>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card style={{marginTop: '6px'}}>
        <Button type="primary" onClick={add}><PlusOutlined/>新增</Button>
        <Table
          style={{marginTop: '6px'}}
          className="table"
          scroll={{x: 'max-content', y: 'calc(100vh - 400px)'}}
          bordered
          pagination={{
            showSizeChanger: true, pageSizeOptions: ['2', '5', '10'],
            defaultPageSize: pageInfo.size, showTotal: () => {
              return `共${pageInfo.total}条数据`
            },
            onChange: pageChange,
            showQuickJumper: true,
            current: pageInfo.page, total: pageInfo.total
          }}
          size="middle"
          columns={columns}
          dataSource={tableData}
        />
      </Card>
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
                 handleOk(values);
               });
             }}
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
          <Form.Item name="menu_type" label="菜单类型">
            <Radio.Group onChange={changeMenuType}>
              <Radio value={1}>一级菜单</Radio>
              <Radio value={2}>子菜单</Radio>
              <Radio value={3}>按钮</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="name" label="菜单名称" rules={[{required: true, message: '请输入菜单名称！'}]}>
            <Input ref={inputRef} allowClear placeholder="菜单名称"/>
          </Form.Item>
          {showParent &&
              <Form.Item name="parent_id" label="上级菜单" rules={[{required: true, message: '请选择上级菜单！'}]}>
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
          <Form.Item name="component" label="前端组件" rules={[{required: true, message: '请输入前端组件！'}]}>
            <Input allowClear placeholder="请输入前端组件"/>
          </Form.Item>
          <Form.Item name="icon" label="菜单图标">
            <Input allowClear addonAfter={<SettingOutlined/>}/>
          </Form.Item>
          <Form.Item name="sort" label="序号">
            <InputNumber/>
          </Form.Item>
          <Form.Item name="is_route" valuePropName="checked" label="是否路由菜单">
            <Switch checkedChildren="是" unCheckedChildren="否"/>
          </Form.Item>
          <Form.Item name="hidden" valuePropName="checked" label="隐藏路由">
            <Switch checkedChildren="是" unCheckedChildren="否"/>
          </Form.Item>
          <Form.Item name="internal_or_external" valuePropName="checked" label="打开方式">
            <Switch checkedChildren="内部" unCheckedChildren="外部"/>
          </Form.Item>
        </Form>
      </Modal>
    </>

  )
}

export default Menu;