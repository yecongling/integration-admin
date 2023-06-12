import React, {useState} from "react";
import {Avatar, Badge, Dropdown, Layout, MenuProps, Modal, Space, Tooltip} from "antd";
import avatar from "@/assets/images/avatar.png";
import {
  BellOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  GithubOutlined,
  LockOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  SyncOutlined,
  UserOutlined
} from "@ant-design/icons";
import {useNavigate} from "umi";
import Setting from "@/layouts/Setting";
import FullScreen from "@/component/header/FullScreen";
import BreadcrumbNav from "@/component/header/BreadcrumbNav";
import {useModel} from "umi";
const Header: React.FC = () => {
  const {initialState,refresh, setInitialState} = useModel("@@initialState");
  const [isCollapse, setCollapse] = useState(initialState?.setting.isCollapse);
  const [modal, contextHolder] = Modal.useModal();
  const navigate = useNavigate()
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: '个人中心',
      icon: <UserOutlined/>,
      disabled: false
    },
    {
      key: '2',
      label: '密码修改',
      icon: <EditOutlined/>
    },
    {
      key: '3',
      label: '刷新缓存',
      icon: <SyncOutlined/>
    },
    {
      key: '4',
      label: '退出登录',
      icon: <LogoutOutlined/>,
      disabled: false,
      onClick: function () {
        modal.confirm({
          title: '退出登录',
          icon: <ExclamationCircleOutlined/>,
          content: '确认退出登录吗？',
          okText: '确认',
          onOk: function () {
            // 清空token
            // setToken("");
            // 退出到登录页面
            navigate("/login");
          },
          cancelText: '取消',
        });
      }
    },
  ]

  /**
   * 跳转到github
   */
  const routeGitHub = () => {
    window.open('https://github.com/yecongling/integration-admin', '_blank');
  }

  return (
    <>
      <Layout.Header
        className="ant-layout-header dis-fl jc-sb ai-ct"
        style={{
          padding: '0 16px 0 0',
          height: '48px',
          borderBottom: ' 1px solid #f0f1f2',
          backgroundColor: '#fff'
        }}>
      <span
        style={{
          cursor: 'pointer',
          fontSize: '16px',
          marginLeft: '6px'
        }}
        onClick={() => {
          setCollapse(!isCollapse);
          if (initialState?.setting) {
            initialState.setting.isCollapse = !isCollapse;
          }
          setInitialState(initialState);
          refresh();
        }}
        className="btnbor"
      >
                    <div style={{marginLeft: '6px', padding: '10px 0'}}>
                        {React.createElement(isCollapse ? MenuUnfoldOutlined : MenuFoldOutlined)}
                    </div>
                </span>
        <BreadcrumbNav/>
        <div className="dis-fl js-sb ai-ct">
          <Space size="large">
            <Tooltip placement="bottom" title="搜索">
              <SearchOutlined style={{cursor: 'pointer', fontSize: '18px'}}/>
            </Tooltip>
            <Tooltip placement="bottom" title="github">
              <GithubOutlined style={{cursor: 'pointer', fontSize: '18px'}} onClick={routeGitHub}/>
            </Tooltip>
            <Tooltip placement="bottom" title="锁屏">
              <LockOutlined style={{cursor: 'pointer', fontSize: '18px'}}/>
            </Tooltip>
            <Tooltip placement="bottom" title="通知">
              <Badge count={5}>
                <BellOutlined style={{cursor: 'pointer', fontSize: '18px'}}/>
              </Badge>
            </Tooltip>
            <FullScreen/>
            <Dropdown menu={{items}} placement="bottom">
              <div className="login-user" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                height: 50,
                transition: 'all 0.3s'
              }}>
                <Avatar size="default" src={avatar}/>
                <span style={{margin: '0 0 0 6px'}}>叶丛林</span>
              </div>
            </Dropdown>
          </Space>
        </div>
      </Layout.Header>
      {/* 系统设置 */}
      <Setting/>
      {contextHolder}
    </>
  )
}
export default Header;