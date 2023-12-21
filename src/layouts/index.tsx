import React from "react";
import LeftMenu from "@/layouts/LeftMenu";
import {Layout} from "antd";
import Header from "@/layouts/Header";
import Content from "@/layouts/Content";
/* 页面布局组件 */
const Layouts: React.FC = () => {
  return (
    <Layout style={{height: "100%"}}>
      <Header/>
      <Layout style={{backgroundColor: '#fff'}}>
        <LeftMenu/>
        <Content/>
      </Layout>
    </Layout>
  )
}
export default Layouts;