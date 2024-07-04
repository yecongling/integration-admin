import React, {useState} from "react";
import {Avatar, Badge, Dropdown, Layout, MenuProps, Modal, Space, Tooltip} from "antd";
import {
  BellOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  GithubOutlined,
  LockOutlined,
  LogoutOutlined,
  SearchOutlined,
  SettingOutlined,
  SyncOutlined,
  UserOutlined
} from "@ant-design/icons";
import avatar from "@/assets/images/avatar.png";
import BreadcrumbNav from "@/components/header/BreadcrumbNav";
import FullScreen from "@/components/header/FullScreen";
import {useNavigate} from "react-router-dom";
import Setting from "@/components/header/Setting";
// import FloatBtn from "@/components/header/FloatBtn.tsx";

const Header: React.FC = () => {
  const [modal, contextHolder] = Modal.useModal();
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  const navigate = useNavigate();
  /**
   * 跳转到github
   */
  const routeGitHub = () => {
    window.open('https://github.com/yecongling/integration-admin', '_blank');
    // window.open('https://www.baidu.com', '_blank');
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: '个人中心',
      icon: <UserOutlined/>,
      disabled: false,
      onClick: () => {
        navigate('system/personal')
      }
    },
    {
      key: '2',
      label: '密码修改',
      icon: <EditOutlined/>,
      onClick: () => {
        alert('进行密码修改')
      }
    },
    {
      key: '3',
      label: '刷新缓存',
      icon: <SyncOutlined/>,
      onClick: () => {
        alert('刷新缓存操作')
      }
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
            localStorage.removeItem('token');
            localStorage.removeItem('isLogin');
            // 退出到登录页面
            navigate("/login");
          },
          cancelText: '取消',
        });
      }
    },
  ]

  return (
    <>
      <Layout.Header
        className="ant-layout-header dis-fl jc-sb"
        style={{
          padding: '0 16px 0 0',
          height: '50px',
          minHeight: '50px',
          borderBottom: ' 1px solid #e9edf0',
          backgroundColor: '#fff',
        }}>
        <div className="dis-fl js-sb ai-ct"><BreadcrumbNav/></div>
        <div className="dis-fl js-sb ai-ct toolbox">
          <Space size="large">
            <Tooltip placement="bottom" title="搜索">
              <SearchOutlined style={{cursor: 'pointer', fontSize: '18px'}} onClick={() => {
                alert('显示搜索框')
              }}/>
            </Tooltip>
            <Tooltip placement="bottom" title="github">
              <GithubOutlined style={{cursor: 'pointer', fontSize: '18px'}} onClick={routeGitHub}/>
            </Tooltip>
            <Tooltip placement="bottom" title="锁屏">
              <LockOutlined style={{cursor: 'pointer', fontSize: '18px'}} onClick={() => {
                alert('进行锁屏操作')
              }}/>
            </Tooltip>
            <Tooltip placement="bottom" title="通知">
              <Badge count={5}>
                <BellOutlined style={{cursor: 'pointer', fontSize: '18px'}} onClick={() => {
                  alert('显示通知面板')
                }}/>
              </Badge>
            </Tooltip>
            <Tooltip placement="bottom" title="系统设置">
              <SettingOutlined style={{cursor: 'pointer', fontSize: '18px'}} onClick={() => setOpenSetting(true)}/>
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
      {/*<FloatBtn/>*/}
      <Setting open={openSetting} setOpen={setOpenSetting}/>
      {contextHolder}
    </>
  )
}
export default Header;