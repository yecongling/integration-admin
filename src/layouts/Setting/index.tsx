import React, {useState} from "react";
import {Button, Divider, Drawer, Space, Switch} from "antd";
import {CloseOutlined, SettingOutlined} from "@ant-design/icons";
import {useModel} from "@@/exports";


/* 系统配置界面 */
const Setting: React.FC = () => {
  const {initialState,refresh, setInitialState} = useModel("@@initialState");
  const [open, changeOpen] = useState(false);
  const [right, setRight] = useState(0);
  const changeDrawer = () => {
    changeOpen(!open);
    if (!open) {
      setRight(330);
    } else {
      setRight(0);
    }
  }

  return (
    <>
      <Button type="primary" size="small" onClick={changeDrawer}
              style={{
                width: '42px',
                height: '42px',
                zIndex: '2000',
                top: '40%',
                position: 'fixed',
                transition: 'all 0.3s',
                right: `${right}` + 'px'
              }}>
        {open ? <CloseOutlined style={{fontSize: '18px'}}/> : <SettingOutlined style={{fontSize: '18px'}}/>}
      </Button>
      <Drawer title="主题配置" placement="right" open={open} closable={false} width={330}>
        <Divider><strong>主题模式</strong></Divider>
        <Space direction="vertical" size="middle" style={{display: 'flex'}}>
          <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked onChange={(checked)=> {
            if (initialState?.setting) {
              initialState.setting.navTheme = checked ? 'light' : 'dark';
            }
            setInitialState(initialState);
            refresh();
          }}/>
          <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked onChange={(checked)=> {
            if (initialState?.setting) {
              initialState.setting.colorPrimary = checked ? '#1890ff' : '#00b96b';
            }
            setInitialState(initialState);
            refresh();
          }}/>
        </Space>
      </Drawer>
    </>
  )
}

export default Setting;