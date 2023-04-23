import React, {Suspense} from "react";
import {Layout, Spin} from "antd";
import {Outlet} from "umi";
/* 内容区域 */
const Index: React.FC = ()=> {
    return (
        <Layout.Content className="dis-fl fd-c" style={{padding: '10px', overflowY: 'auto', overflowX: 'hidden'}}>
            <Suspense fallback={
                <div className="dis-fl jc-ct ai-ct" style={{ height: '100vh' }}>
                    <Spin size="large" />
                </div>
            }>
                <Outlet></Outlet>
            </Suspense>
        </Layout.Content>
    )
}

export default Index;