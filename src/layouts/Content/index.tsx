import React, {Suspense} from "react";
import {Layout, Spin} from "antd";
import RouterBeforeEach from "@/router/RouterBeforeEach.tsx";
/* 内容区域 */
const Index: React.FC = () => {
  return (
    <Layout.Content className="dis-fl fd-c" style={{overflowY: 'auto', overflowX: 'hidden'}}>
      <Suspense fallback={
        <div className="dis-fl jc-ct ai-ct" style={{height: '100vh'}}>
          <Spin size="large"/>
        </div>
      }>
        <RouterBeforeEach/>
      </Suspense>
    </Layout.Content>
  )
}

export default Index;