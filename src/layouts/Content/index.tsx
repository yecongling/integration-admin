import React, {Suspense} from "react";
import {Layout, Spin} from "antd";
import RouterBeforeEach from "@/router/RouterBeforeEach.tsx";
import {useSelector} from "react-redux";
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
        <RouterBeforeEach/>
      </Suspense>
    </Layout.Content>
  )
}

export default Index;