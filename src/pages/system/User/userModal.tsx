import { Form, Modal, ModalProps } from 'antd';
import React from 'react';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
} from "@ant-design/icons";
import { UserModel } from '@/apis/system/user/userModel';

/**
 * 用户信息操作弹窗
 */
const UserModal: React.FC<ModalProps & UserModel> = (props: ModalProps & UserModel) => {

    const { open, form, onCancel} = props;

    return (
        <Modal
            destroyOnClose
            centered
            maskClosable={false}
            open={open}
            title="编辑用户数据"
            okText="确认"
            okButtonProps={{ icon: <CheckCircleOutlined /> }}
            cancelButtonProps={{ icon: <CloseCircleOutlined /> }}
            cancelText="取消"
            style={{ top: '20px' }}
            width={800}
            styles={{ body: { padding: '10px 40px' } }}
            onCancel={onCancel}
        >
            <Form
                form={form}
                layout="horizontal"
                name="basic"
                size="middle"
                labelCol={{ span: 5 }}
            >
                <div>用户数据</div>
            </Form>
        </Modal>
    )
}
export default UserModal;