import { Form, Modal } from 'antd';
import React from 'react';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
} from "@ant-design/icons";

/**
 * 用户信息操作弹窗
 */
const UserModal: React.FC = (props: any) => {

    const { open, formData } = props;
    return (
        <Modal
            destroyOnClose
            centered
            maskClosable={false}
            open={open}
            title="编辑菜单数据"
            okText="确认"
            okButtonProps={{ icon: <CheckCircleOutlined /> }}
            cancelButtonProps={{ icon: <CloseCircleOutlined /> }}
            cancelText="取消"
            style={{ top: '20px' }}
            width={800}
            styles={{ body: { padding: '10px 40px' } }}
        >
            <Form
                form={formData}
                layout="horizontal"
                name="basic"
                size="middle"
                labelCol={{ span: 5 }}
            >

            </Form>
        </Modal>
    )
}
export default UserModal;