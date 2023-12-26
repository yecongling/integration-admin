import React from "react";
import {Dropdown} from "antd";
import {EditOutlined, LogoutOutlined, SyncOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

const DocsMenuBars: React.FC = () => {
  const navigate = useNavigate();
  const items = [
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

  ]
  const items2 = [
    {
      key: '4',
      label: '退出登录',
      icon: <LogoutOutlined/>,
      disabled: false,
      onClick: function () {

      }
    }
  ]

  const menuProp = {
    items
  }

  const menuProps2 = {
    items: items2
  }

  return (
    <>
      <div id="docs-menubars">
        <Dropdown menu={menuProp}>
          <span>文件</span>
        </Dropdown>
        <Dropdown menu={menuProps2}>
          <span>编辑</span>
        </Dropdown>
      </div>
    </>
  )
}
export default DocsMenuBars;