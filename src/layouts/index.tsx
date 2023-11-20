import React from "react";
import LeftMenu from "@/layouts/LeftMenu";
import {ConfigProvider, Layout} from "antd";
import Header from "@/layouts/Header";
import Content from "@/layouts/Content";
import ZhCN from "antd/es/locale/zh_CN";
import {useSelector} from "react-redux";
/* 页面布局组件 */
const Layouts: React.FC = () => {
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
      <Layout style={{height: "100%"}}>
        <Header/>
        <Layout style={{backgroundColor: '#fff'}}>
          <LeftMenu/>
          <Content/>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}
export default Layouts;