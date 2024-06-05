import { Card, Col, Row, Input } from "antd";
import React from "react"

const {Search} = Input;
const EndpointType: React.FC = () => {

    /**
     * 检索功能
     * @param params 检索参数
     */
    const onSearch = (params: any) => {
        console.log(params)
    }
    return (
        <Row gutter={8} style={{height: '100%'}}>
            {/* 左边表格布局 */}
            <Col span={6}>
                <Card style={{height: '100%'}} styles={{ body: { height: '100%' } }}>
                    <Search autoFocus placeholder="请输入端点类型名或支持模式进行检索" onSearch={onSearch} enterButton />
                    下面是表格
                </Card>
            </Col>
            {/* 右边表单布局 */}
            <Col span={18}>
                <Card style={{height: '100%'}} styles={{ body: { height: '100%' } }}>
                    右边单元格部分
                </Card>
            </Col>
        </Row>
    )
}
export default EndpointType;