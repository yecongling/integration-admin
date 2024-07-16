import React, {memo} from "react";
import LeftMenu from "@/layouts/LeftMenu";
import {Layout} from "antd";
import Header from "@/layouts/Header";
import Content from "@/layouts/Content";
import Console from "@/components/console/console.tsx";
/* 页面布局组件 加memo是左边菜单切换的时候会触发该组件的重新渲染 */
const Layouts: React.FC = memo(() => {
  return (
    <>
      {/* 监控台 */}
      <Console/>
      <Layout style={{height: "100%"}}>
        <LeftMenu/>
        <Layout style={{backgroundColor: '#fff'}}>
          <Header/>
          <Content/>
        </Layout>
      </Layout>
    </>
  )
})
export default Layouts;