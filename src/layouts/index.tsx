import {ConfigProvider, Layout} from 'antd';
import React from "react";
import Header from "@/layouts/Header";
import Content from "@/layouts/Content";
import LeftMenu from "@/layouts/LeftMenu";
import {useLocation} from "umi";
import Login from "@/pages/user/Login";
import {useModel} from "@@/exports";
import ZhCN from "antd/es/locale/zh_CN";

const Layouts: React.FC = () => {
  const {initialState} = useModel("@@initialState");
  const location = useLocation();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: initialState?.setting.colorPrimary,
        },
      }}
      locale={ZhCN}
    >
      {location.pathname === '/login' ? <Login/> : <Layout style={{height: '100%'}}>
        {/* 左边菜单 */}
        <LeftMenu/>
        <Layout>
          {/* 顶部 */}
          <Header/>
          {/*<div className="tagsView-container">
                        <TagList/>
                    </div>*/}
          <Content/>
        </Layout>
      </Layout>}

    </ConfigProvider>

  );
}

export default Layouts;
