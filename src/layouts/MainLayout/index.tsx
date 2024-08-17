import { Layout } from "antd";
import React from "react";
import LeftMenu from "./LeftMenu";
import Header from "./Header";
import Content from "./Content";
import Console from "@/components/Console";

/**
 * 页面主要布局
 * @returns 组件内容
 */
const MainLayout: React.FC = () => {
  return (
    <>
      {/* SQL监控台 */}
      <Console />
      <Layout style={{ height: "100%" }}>
        <LeftMenu />
        <Layout>
          <Header />
          <Content />
        </Layout>
      </Layout>
    </>
  );
};
export default MainLayout;
