import React from "react";
import {Button, Card, Col, Form, Input, Row, Select, Space, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {PlusOutlined} from "@ant-design/icons";
import * as Icons from "@ant-design/icons";

/**
 * 菜单维护界面
 * @constructor
 */
const Menu: React.FC = () => {

    const [form] = Form.useForm();
    const onFinish = (value: any) => {
        alert(value);
    }

    /**
     * 编辑
     * @param value
     */
    const edit = (value: any) => {
        alert('编辑')
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
        alert("新增菜单");
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
            dataIndex: 'menu_type',
            key: 'menu_type',
            width: '5%',
            align: 'center',
            render: (text) => {
                return text === 1 ? "目录" : "一级菜单"
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
            dataIndex: 'sort_no',
            key: 'sort_no',
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

    // 模拟数据
    const data: menuType[] = [
        {
            key: 1,
            name: '首页',
            menu_type: 1,
            icon: 'HomeOutlined',
            component: '/Home',
            url: '/home',
            sort_no: 2,
        },
        {
            key: 2,
            name: '系统管理',
            menu_type: 1,
            icon: 'SettingOutlined',
            component: '/system',
            url: '/system',
            sort_no: 2,
            children: [
                {
                    key: 3,
                    name: '菜单管理',
                    menu_type: 2,
                    icon: 'MenuOutlined',
                    component: '/system/Menu',
                    url: '/system/menu',
                    sort_no: 3
                },
                {
                    key: 4,
                    name: '角色管理',
                    menu_type: 2,
                    icon: 'UsergroupDeleteOutlined',
                    component: '/system/Role',
                    url: '/system/role',
                    sort_no: 3
                },
                {
                    key: 5,
                    name: '用户管理',
                    menu_type: 2,
                    icon: 'UserOutlined',
                    component: '/system/User',
                    url: '/system/user',
                    sort_no: 3
                }
            ]
        },{
            key: 6,
            name: '系统管理',
            menu_type: 1,
            icon: 'SettingOutlined',
            component: '/system',
            url: '/system',
            sort_no: 2,
            children: [
                {
                    key: 7,
                    name: '菜单管理',
                    menu_type: 2,
                    icon: 'MenuOutlined',
                    component: '/system/Menu',
                    url: '/system/menu',
                    sort_no: 3
                },
                {
                    key: 8,
                    name: '角色管理',
                    menu_type: 2,
                    icon: 'UsergroupDeleteOutlined',
                    component: '/system/Role',
                    url: '/system/role',
                    sort_no: 3
                },
                {
                    key: 9,
                    name: '用户管理',
                    menu_type: 2,
                    icon: 'UserOutlined',
                    component: '/system/User',
                    url: '/system/user',
                    sort_no: 3
                }
            ]
        }
    ];

    return (
        <>
            {/* 查询区域 */}
            <Card>
                <Form form={form} onFinish={onFinish}>
                    <Row gutter={24}>
                        <Col span={4}>
                            <Form.Item label="菜单名称" name="name" initialValue="" style={{marginBottom: 0}}>
                                <Input autoFocus autoComplete="false"/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="菜单类型" name="menu_type" initialValue="" style={{marginBottom: 0}}>
                                <Input autoComplete="false"/>
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
                    bordered
                    size="middle"
                    columns={columns}
                    dataSource={data}
                />
            </Card>
        </>

    )
}

export default Menu;