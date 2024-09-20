import { Button, Col, Row, Space } from "antd";
import React from "react";
import { useEndpointTypeContext } from "./EndpointTypeState";
import { CheckCircleOutlined, DeleteOutlined, EditOutlined, PlusOutlined, SaveOutlined, StopOutlined } from "@ant-design/icons";

/**
 * 操作
 */
const EndpointTypeOperation: React.FC = () => {
    const { state } = useEndpointTypeContext();
    return (
        <>
            <Row justify="start" style={{ marginBottom: '8px' }}>
                <Col>
                    <Space>
                        <Button type="primary" icon={<PlusOutlined />}>新增</Button>
                        <Button icon={<SaveOutlined />}>保存</Button>
                        <Button type="default" icon={<EditOutlined />}>修改</Button>
                        <Button type="default" icon={<DeleteOutlined />} danger>删除</Button>
                        <Button type="default" danger icon={state.selectedRow?.status === 1 ? <StopOutlined /> : <CheckCircleOutlined />}>{state.selectedRow?.status === 1 ? "禁用" : "启用"}</Button>
                    </Space>
                </Col>
            </Row>
        </>

    )
}
export default EndpointTypeOperation;