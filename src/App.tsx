import './App.css'
import React from "react";
import {App as AntdApp, ConfigProvider} from "antd"
import ZhCN from "antd/locale/zh_CN";
import {useSelector} from "react-redux";
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';
import {Router} from "@/router";

const App: React.FC = () => {
  dayjs.locale('zh-cn');
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
