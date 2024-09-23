import React, { useState } from "react";
import {
  Avatar,
  Badge,
  Dropdown,
  Input,
  Layout,
  MenuProps,
  Modal,
  Space,
  Tooltip,
} from "antd";
import {
  BellOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  GithubOutlined,
  LockOutlined,
  LogoutOutlined,
  MailOutlined,
  SearchOutlined,
  SettingOutlined,
  SyncOutlined,
  UserOutlined,
} from "@ant-design/icons";
import avatar from "@/assets/images/avatar.png";
import BreadcrumbNav from "@/components/header/BreadcrumbNav";
import FullScreen from "@/components/header/FullScreen";
import { useNavigate } from "react-router-dom";
import Setting from "@/components/header/Setting";
import { observer } from "mobx-react-lite";
import MessageBox from "./component/MessageBox";
import { logout } from "@/services/login/loginApi";

const Header: React.FC = observer(() => {
  const [modal, contextHolder] = Modal.useModal();
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  const navigate = useNavigate();
  /**
   * 跳转到github
   */
  const routeGitHub = () => {
    window.open("https://github.com/yecongling/integration-admin", "_blank");
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "个人中心",
      icon: <UserOutlined />,
      disabled: false,
      onClick: () => {
        navigate("system/personal");
      },
    },
    {
      key: "2",
      label: "密码修改",
      icon: <EditOutlined />,
      onClick: () => {
        alert("进行密码修改");
      },
    },
    {
      key: "3",
      label: "刷新缓存",
      icon: <SyncOutlined />,
      onClick: () => {
        alert("刷新缓存操作");
      },
    },
    {
      key: "4",
      label: "退出登录",
      icon: <LogoutOutlined />,
      disabled: false,
      onClick: function () {
        modal.confirm({
          title: "退出登录",
          icon: <ExclamationCircleOutlined />,
          content: "确认退出登录吗？",
          okText: "确认",
          onOk: function () {
            const token = sessionStorage.getItem("token");
            
            // 清除后端的信息
            logout(token as string);
            // 清空token
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("roleId");
            sessionStorage.removeItem("isLogin");
            // 退出到登录页面
            navigate("/login");
          },
          cancelText: "取消",
        });
      },
    },
  ];

  return (
    <>
      <Layout.Header
        className="ant-layout-header dis-fl jc-sb"
        style={{
          padding: "0 16px 0 0",
          height: "50px",
          minHeight: "50px",
          borderBottom: " 1px solid #e9edf0",
          backgroundColor: "#fff",
        }}
      >
        <div className="dis-fl js-sb ai-ct" style={{ marginLeft: "10px" }}>
          {/* 面包屑 */}
          <BreadcrumbNav />
        </div>
        <div className="dis-fl js-sb ai-ct toolbox">
          <Space size="large">
            <Input
              variant="filled"
              placeholder="输入内容查询"
              suffix={
                <SearchOutlined
                  style={{ cursor: "pointer", fontSize: "18px" }}
                />
              }
            />
            <Tooltip placement="bottom" title="github">
              <GithubOutlined
                style={{ cursor: "pointer", fontSize: "18px" }}
                onClick={routeGitHub}
              />
            </Tooltip>
            <Tooltip placement="bottom" title="锁屏">
              <LockOutlined
                style={{ cursor: "pointer", fontSize: "18px" }}
                onClick={() => {
                  alert("进行锁屏操作");
                }}
              />
            </Tooltip>
            {/* 邮件 */}
            <Badge count={5}>
              <MailOutlined style={{ cursor: "pointer", fontSize: "18px" }} />
            </Badge>
            <Dropdown placement="bottomRight" dropdownRender={() => <MessageBox />}>
              <Badge count={5}>
                <BellOutlined style={{ cursor: "pointer", fontSize: "18px" }} />
              </Badge>
            </Dropdown>
            <Tooltip placement="bottomRight" title="系统设置">
              <SettingOutlined
                style={{ cursor: "pointer", fontSize: "18px" }}
                onClick={() => setOpenSetting(true)}
              />
            </Tooltip>
            <FullScreen />
            <Dropdown menu={{ items }} placement="bottom">
              <div
                className="login-user"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  height: 50,
                  transition: "all 0.3s",
                }}
              >
                <Avatar size="default" src={avatar} />
                <span style={{ margin: "0 0 0 6px" }}>叶丛林</span>
              </div>
            </Dropdown>
          </Space>
        </div>
      </Layout.Header>
      {/*<FloatBtn/>*/}
      <Setting open={openSetting} setOpen={setOpenSetting} />
      {contextHolder}
    </>
  );
});
export default Header;
