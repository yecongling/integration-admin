import {Layout} from 'antd';
import React from "react";
import Header from "@/layouts/Header";
import Content from "@/layouts/Content";
import LeftMenu from "@/layouts/LeftMenu";
import {useLocation} from "umi";
import Login from "@/pages/user/Login";
const Layouts: React.FC = () => {
  const location = useLocation();
  if (location.pathname === '/login') {
    return <Login/>;
  }
  return (
    <Layout style={{height: '100%'}}>
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
    </Layout>
  );
}

export default Layouts;
