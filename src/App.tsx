import './App.css'
import React from "react";
import {Router} from "@/router";
import {App as AntdApp} from "antd"
import ZhCN from "antd/es/locale/zh_CN";
import {useSelector} from "react-redux";
import {ConfigProvider} from "antd";

const App: React.FC = () => {
  const {colorPrimary} = useSelector((store: any) => store.global);
  return (
    <ConfigProvider theme={{
      token: {
        colorPrimary: colorPrimary,
      },
      components: {
        Modal: {
          borderRadius: 4,
          borderRadiusLG: 4
        }
      }
    }} locale={ZhCN}>
      <AntdApp style={{height: '100%'}}>
        <Router/>
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
