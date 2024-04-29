import React, {Suspense} from "react";
import {Layout, Spin} from "antd";
import {useSelector} from "react-redux";
import {Outlet} from "react-router-dom";
/* 内容区域 */
const Index: React.FC = () => {
  const {theme} = useSelector((store: any) => store.global);

  return (
    <Layout.Content className="dis-fl fd-c"
                    style={{
                      overflowY: 'auto',
                      backgroundColor: theme === 'dark' ? '#f2f5f7' : '#fff',
                      overflowX: 'hidden',
                      padding: '6px'
                    }}>
      <Suspense fallback={
        <div className="dis-fl jc-ct ai-ct" style={{height: '100vh'}}>
          <Spin size="large"/>
        </div>
      }>
        <Outlet/>
      </Suspense>
    </Layout.Content>
  )
}

export default Index;