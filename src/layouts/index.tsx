import React from "react";
import LeftMenu from "@/layouts/LeftMenu";
import {Layout} from "antd";
import Header from "@/layouts/Header";
import Content from "@/layouts/Content";
import Console from "@/components/console/console.tsx";
/* 页面布局组件 */
const Layouts: React.FC = () => {
  return (
    <>
      {/* 监控台 */}
      <Console/>
      <Layout style={{height: "100%"}}>
        <Header/>
        <Layout style={{backgroundColor: '#fff'}}>
          <LeftMenu/>
          <Content/>
        </Layout>
      </Layout>
    </>
  )
}
export default Layouts;