import { Modal, ModalProps } from "antd";
import React from "react";

/**
 * 端点回收站
 * @returns 内容
 */
const EndpointRecycle: React.FC<ModalProps> = (props) => {

    return (
        <Modal title="端点回收站" {...props}>
            端点回收站
        </Modal>
    )
}
export default EndpointRecycle