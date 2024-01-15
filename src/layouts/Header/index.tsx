import React, {useState} from "react";
import {Avatar, Badge, Button, Drawer, Dropdown, Image, Layout, MenuProps, Modal, Space, Tooltip} from "antd";
import {
  BarsOutlined,
  BellOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  GithubOutlined,
  GroupOutlined,
  LockOutlined,
  LogoutOutlined,
  SearchOutlined,
  SettingOutlined,
  SyncOutlined,
  UserOutlined
} from "@ant-design/icons";
import avatar from "@/assets/images/avatar.png";
// import BreadcrumbNav from "@/components/header/BreadcrumbNav";
import FullScreen from "@/components/header/FullScreen";
import {Link, useNavigate} from "react-router-dom";
import favicon from "@/assets/images/favicon.png";
import Setting from "@/components/header/Setting.tsx";
/*import Setting from "@/component/header/Setting.tsx";*/

const Header: React.FC = () => {
  const [modal, contextHolder] = Modal.useModal();
  const [openGroup, setOpenGroup] = useState<boolean>(false);
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
          title: 'Confirm',
          icon: <ExclamationCircleOutlined/>,
          content: '确认退出登录吗？',
          okText: '确认',
          onOk: function () {
            // 清空token
            // setToken("");
            sessionStorage.removeItem('satoken');
            sessionStorage.removeItem('isLogin');
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
      <Drawer
        open={openGroup}
        title={
          <div className="mgr-01 dis-fl ai-ct jc-ct">
            <Image width={25} src={favicon} preview={false}/>
            <p style={{
              fontWeight: 'bold',
              margin: '0 12px',
              fontSize: '20px',
              color: '#1890ff'
            }}>
              integration的分组
            </p>
          </div>}
        maskClosable
        closeIcon={false}
        placement="left"
        width={280}
        onClose={() => setOpenGroup(false)}
        footer={<Button style={{width: '100%'}} type="text" icon={<GroupOutlined/>}>编辑分组</Button>}
      >
        分组信息
      </Drawer>
      <Layout.Header
        className="ant-layout-header dis-fl jc-sb ai-ct"
        style={{
          padding: '0 16px 0 0',
          height: '50px',
          minHeight: '50px',
          borderBottom: ' 1px solid #e9edf0',
          backgroundColor: '#fff',
        }}>
        <div className="dis-fl js-sb ai-ct toolbox">
          <Tooltip title="分组信息" placement="right">
            <Button type="text"
                    style={{margin: '0 10px 0 20px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                    icon={<BarsOutlined style={{fontSize: '18px'}}/>}
                    onClick={() => {
                      setOpenGroup(true)
                    }}
            />
          </Tooltip>
          <Link to="/home">
            <div className="hd-64 mgr-01 dis-fl ai-ct jc-ct">
              <Image width={25} src={favicon} preview={false}/>
              <p style={{
                fontWeight: 'bold',
                margin: '0 12px',
                fontSize: '20px',
                color: '#1890ff'
              }}>
                integration
              </p>
            </div>
          </Link>
        </div>
        {/*<BreadcrumbNav/>*/}
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